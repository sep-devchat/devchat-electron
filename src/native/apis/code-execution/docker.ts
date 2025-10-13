import Dockerode from "dockerode";
import fs from "fs";
import path from "path";
import { app } from "electron";

export class Docker {
	private static instance: Docker;
	static getInstance() {
		if (!this.instance) this.instance = new Docker();
		return this.instance;
	}

	readonly dockerode: Dockerode;
	readonly codeExecutionDir = path.join(app.getAppPath(), "code-execution-tmp");
	readonly containerWorkingDir = "/app";
	private constructor() {
		this.dockerode = new Dockerode();
	}

	imageNameToContainerName(image: string) {
		return image.replace(/[:/]/g, "-");
	}

	getExecDir(runId: string) {
		return `${this.codeExecutionDir}/${runId}`;
	}

	async pullImageIfNotExists(image: string) {
		console.log("Checking for image:", image);
		const images = await this.dockerode.listImages({
			filters: { reference: [image] },
		});
		console.log("Found images:", images.length);

		if (images.length === 0) {
			console.log("Pulling image:", image);
			const stream = await this.dockerode.pull(`docker.io/${image}`);
			for await (const chunk of stream) {
				process.stdout.write(chunk);
			}
			console.log("Pulled image:", image);
		}
	}

	async createExecContainer(image: string, runId?: string) {
		await this.pullImageIfNotExists(image);

		console.log("Creating container for image:", image);
		const container = await this.dockerode.createContainer({
			Image: image,
			AttachStdout: true,
			AttachStderr: true,
			Tty: true,
			WorkingDir: this.containerWorkingDir,
			HostConfig: runId
				? {
						Binds: [`${this.getExecDir(runId)}:${this.containerWorkingDir}`],
					}
				: undefined,
		});
		console.log("Created container for image:", image);

		return container;
	}

	async cleanupContainer(container: Dockerode.Container, runId?: string) {
		console.log("Stopping container...");
		try {
			await container.stop();
		} catch (err) {
			console.error("Error stopping container:", err);
			console.log(err);
			return;
		}

		console.log("Removing container...");
		try {
			await container.remove();
			console.log("Removed container.");
		} catch (err) {
			console.error("Error removing container:", err);
			console.log(err);
			return;
		}

		if (runId) {
			const execDir = this.getExecDir(runId);
			console.log("Removing exec dir:", execDir);
			try {
				fs.rmSync(execDir, { recursive: true, force: true });
				console.log("Removed exec dir.");
			} catch (err) {
				console.error("Error removing exec dir:", err);
				console.log(err);
				return;
			}
		}
	}
}
