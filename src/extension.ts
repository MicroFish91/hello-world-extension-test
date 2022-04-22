import * as vscode from "vscode";
import { getDate, getWarning, sayHi } from "./commands";
import { initEventListeners } from "./events";
import { initHovers } from "./hovers";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "helloworld" is now active!');

  context.subscriptions.concat([
    vscode.commands.registerCommand("helloworld.sayHi", sayHi),
    vscode.commands.registerCommand("helloworld.getDate", getDate),
    vscode.commands.registerCommand("helloworld.getWarning", getWarning),
  ]);

  initHovers();
  initEventListeners();
}

export function deactivate() {}
