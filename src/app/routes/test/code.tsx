import { Button } from "@/app/components/ui/button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/app/components/ui/resizable";
import { Spinner } from "@/app/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/app/components/ui/select";
import { runCode } from "@/app/lib/services/code";
import { ProgrammingLanguageEnum } from "@/shared";

const runCodeEnvOptions = [
	{ label: "Local (Docker required)", value: "local" },
	{ label: "Remote", value: "remote" },
];

export const Route = createFileRoute("/test/code")({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedFilePath, setSelectedFilePath] = useState<string>("");
	const [selectedEnv, setSelectedEnv] = useState<string>(
		runCodeEnvOptions[0].value,
	);
	const [result, setResult] = useState<string>("");
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const monaco = useMonaco();
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const handleSelectFile = async () => {
		const filePaths = await window.nativeAPI.selectFileOrFolder(false);
		if (filePaths.length > 0) {
			setSelectedFilePath(filePaths[0]);
			if (!monaco || !editorRef.current) return;
			const model = monaco.editor.getModel(monaco.Uri.file(filePaths[0]));
			if (model) {
				editorRef.current.setModel(model);
			} else {
				const text = await window.nativeAPI.readFileContent(filePaths[0]);
				const newModel = monaco.editor.createModel(
					text,
					"javascript",
					monaco.Uri.file(filePaths[0]),
				);
				editorRef.current.setModel(newModel);
			}
		}
	};

	const handleRunCodeLocal = async () => {
		if (editorRef.current && editorRef.current.getValue()) {
			setIsRunning(true);
			try {
				const res = await window.nativeAPI.runCodeByContent(
					editorRef.current.getValue(),
				);
				setResult(res);
			} catch (err) {
				console.error(err);
				setResult(`Error: ${err.message ? err.message : "Unknown error"}`);
			}
			setIsRunning(false);
		}
	};

	const handleRunCodeRemote = async () => {
		if (editorRef.current && editorRef.current.getValue()) {
			setIsRunning(true);
			try {
				const res = await runCode({
					code: editorRef.current.getValue(),
					language: ProgrammingLanguageEnum.JAVASCRIPT,
				});
				setResult(res.output);
			} catch (err) {
				console.error(err);
				setResult(`Error: ${err.message ? err.message : "Unknown error"}`);
			}
			setIsRunning(false);
		}
	};

	const handleRunCode = async () => {
		if (selectedEnv === "local") {
			await handleRunCodeLocal();
		} else {
			await handleRunCodeRemote();
		}
	};

	return (
		<div className="h-screen flex flex-col">
			<div className="p-3 flex flex-row gap-x-2 border-b">
				<Button onClick={handleSelectFile} variant="outline">
					Select File
				</Button>
				<Select value={selectedEnv} onValueChange={setSelectedEnv}>
					<SelectTrigger>
						<SelectValue placeholder="Select Environment" />
					</SelectTrigger>
					<SelectContent>
						{runCodeEnvOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button onClick={handleRunCode} disabled={isRunning}>
					Run Code (Javascript) {isRunning && <Spinner />}
				</Button>
			</div>
			<ResizablePanelGroup direction="horizontal" className="flex-1">
				<ResizablePanel defaultSize={50}>
					<Editor
						options={{
							scrollBeyondLastLine: false,
						}}
						width="100%"
						height="100%"
						onMount={(editor) => (editorRef.current = editor)}
						language="javascript"
					/>
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel>
					<pre className="h-full p-2 bg-accent rounded overflow-auto">
						{result}
					</pre>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
