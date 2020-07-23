const vscode = require("vscode");
const Main = require("./Main");
function createRegisterCommand(context) {
    return function (name, fn) {
        context.subscriptions.push(vscode.commands.registerCommand(name, fn));
    };
}
exports.createRegisterCommand = createRegisterCommand;
function activate(context) {
    let createCommand = createRegisterCommand(context);
    Main.default.init();
    createCommand('vscode-live2d.enabled', () => {
        vscode.workspace.getConfiguration('vscode-live2d').update('enabled', true);
    });
    createCommand('vscode-live2d.unenabled', () => {
        vscode.workspace.getConfiguration('vscode-live2d').update('enabled', false);
    });
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(eventNames => {
        Main.default.init();
    }));
}
exports.activate = activate;

function deactivate() { }

module.exports = {
    activate,
    deactivate
}