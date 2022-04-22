import * as vscode from "vscode";

export async function sayHi() {
  const answer = await vscode.window.showInformationMessage(
    "Hi, how are you feeling?",
    "good",
    "bad"
  );

  if (answer) vscode.window.showInformationMessage(`You answered: ${answer}`);
}

export function getDate() {
  vscode.window.showInformationMessage(new Date().getDate().toString());
}

export function getWarning() {
  vscode.window.showWarningMessage("I am a warning message.");
}