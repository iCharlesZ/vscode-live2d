import * as vscode from 'vscode';
import { Main } from './Main';

export function activate(context: vscode.ExtensionContext) {
    // let disposable = vscode.commands.registerCommand('vscode-live2d.helloWorld', () => {
    //     vscode.window.showInformationMessage('Hello live2d!');
    // });
    // context.subscriptions.push(disposable);
    context.subscriptions.push(Main.watch());
}

export function deactivate() { }