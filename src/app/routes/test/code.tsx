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

export const Route = createFileRoute("/test/code")({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectedFilePath, setSelectedFilePath] = useState<string>("");
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
					undefined,
					monaco.Uri.file(filePaths[0]),
				);
				editorRef.current.setModel(newModel);
			}
		}
	};

	return (
		<div className="h-screen flex flex-col">
			<div className="p-3 flex flex-row gap-x-2 border-b">
				<Button onClick={handleSelectFile} variant="outline">
					Select File
				</Button>
				<Button
					onClick={async () => {
						if (editorRef.current && editorRef.current.getValue()) {
							setIsRunning(true);
							const res = await window.nativeAPI.runCodeByContent(
								editorRef.current.getValue(),
							);
							setResult(res);
							setIsRunning(false);
						}
					}}
					disabled={isRunning}
				>
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
