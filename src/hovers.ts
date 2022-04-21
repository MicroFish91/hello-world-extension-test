import * as fs from "fs";
import * as vscode from "vscode";

export function initHovers() {
  addFsHover();
  addCharCountHover();
}

function addFsHover() {
  vscode.languages.registerHoverProvider("typescript", {
    provideHover(doc: vscode.TextDocument) {
      const { size } = fs.statSync(doc.uri.fsPath);

      return new vscode.Hover(
        `Current file size in bytes is ${size}.`
      );
    },
  });
}

function addCharCountHover() {
  vscode.languages.registerHoverProvider("typescript", {
    provideHover(doc: vscode.TextDocument, pos: vscode.Position) {
      const lineText = doc.lineAt(pos.line).text;

      return new vscode.Hover(
        `Char count for this line is: ${lineText.length}.`
      );
    },
  });
}