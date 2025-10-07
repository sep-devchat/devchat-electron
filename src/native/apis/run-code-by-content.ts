import docker from "../docker";
import { NativeAPIHandler } from "../types";

async function pullIfMissing(ref: string) {
	const images = await docker.listImages({ filters: { reference: [ref] } });
	if (images.length === 0) {
		await new Promise<void>((resolve, reject) => {
			docker.pull(ref, (err: any, stream: NodeJS.ReadableStream) => {
				if (err) return reject(err);
				docker.modem.followProgress(stream, (err) =>
					err ? reject(err) : resolve(),
				);
			});
		});
	}
}

const runCodeByContent: NativeAPIHandler = async (e, content: string) => {
	const image = "node:22";
	await pullIfMissing(image);

	// Run the command directly as the container's Cmd
	const container = await docker.createContainer({
		Image: image,
		Cmd: ["node", "-e", content],
		AttachStdout: true,
		AttachStderr: true,
		Tty: true,
	});

	await container.start();

	// Wait until it exits, then fetch logs
	await container.wait();
	const logStream = await container.logs({ stdout: true, stderr: true });

	await container.remove({ force: true });

	return logStream.toString();
};

export default runCodeByContent;
