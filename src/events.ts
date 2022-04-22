import * as vscode from "vscode";
import { DecorationTracker } from "./DecorationTracker";

export function initEventListeners() {
  onExceedCharLimit(); // gjekal;gkjel;ajgkel;akjgkel;ajgel;ajglek;ajglek;ajgl
}

function onExceedCharLimit() {
  const decorationTracker = new DecorationTracker();
  const setTextYellowConfig: vscode.DecorationRenderOptions = { color: "#FFFF00" };

  vscode.workspace.onDidChangeTextDocument(
    (e: vscode.TextDocumentChangeEvent) => {
      console.log(e.contentChanges)
      const { activeTextEditor: editor } = vscode.window;

      if (!editor) return;

      const { line: lineCount, character: charCount } =
        editor.selection.active;

      const lastCharPos = new vscode.Position(lineCount, charCount);
      const lineText = editor.document.lineAt(lastCharPos).text;
      const lastCharText = lineText[charCount];

      const lastCharTextRange: vscode.Range = new vscode.Range(
        lastCharPos,
        new vscode.Position(lineCount, charCount + 1),
      );

      if(!lastCharText) return;

      if (lineText.length <= 80) {
        const dType = decorationTracker.extractAndRemoveDecoration(lineCount, setTextYellowConfig);
        if (dType) editor.setDecorations(dType, []);
      } else {
        // Need to extend current Range each time
        decorationTracker.addDecoration(lineCount, lastCharTextRange, setTextYellowConfig);

        const [range, dType] = decorationTracker.getDecoration(lineCount, setTextYellowConfig);
        editor.setDecorations(dType, range);
      }

      // editor.edit((editBuilder: vscode.TextEditorEdit) => {
      //   return editBuilder.replace(lastCharPos, "b");
      // })
    }
  );
}