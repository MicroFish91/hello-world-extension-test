import * as vscode from "vscode";
import { LineDecorationManager } from "./DecorationManager";

export function initEventListeners() {
  onExceedCharLimit();
}

function onExceedCharLimit() {
  const decorationTracker = new LineDecorationManager();
  const setTextYellowConfig: vscode.DecorationRenderOptions = { color: "#FFFF00" };

  vscode.workspace.onDidChangeTextDocument(
    (e: vscode.TextDocumentChangeEvent) => {
      const { activeTextEditor: editor } = vscode.window;

      if (!editor) return;

      const { line: lineCount, character: charCount } =
        editor.selection.active;

      const lastCharPos = new vscode.Position(lineCount, charCount);
      const lineText = editor.document.lineAt(lastCharPos).text;
      const lastCharText = lineText[charCount];

      if(!lastCharText) return;

      if (lineText.length <= 80) {
        const dType = decorationTracker.extractAndRemoveDecoration(lineCount, setTextYellowConfig);
        if (dType) editor.setDecorations(dType, []);
      } else {
        decorationTracker.addLineDecoration(lineCount, charCount, setTextYellowConfig);
        const lineDecoration = decorationTracker.getLineDecoration(lineCount, setTextYellowConfig);
        editor.setDecorations(lineDecoration!.getDecoration(), lineDecoration!.getRange());
      }

      // editor.edit((editBuilder: vscode.TextEditorEdit) => {
      //   return editBuilder.replace(lastCharPos, "b");
      // })
    }
  );
  }