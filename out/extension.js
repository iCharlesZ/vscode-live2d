const vscode = require("vscode");
const Main = require("./Main");
function createRegisterCommand(context) {
    //@ts-ignore
    return function (name, fn) {
        context.subscriptions.push(vscode.commands.registerCommand(name, fn));
    };
}
exports.createRegisterCommand = createRegisterCommand;
function activate(context) {
    let createCommand = createRegisterCommand(context);
    Main.default.init();
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(eventNames => {
        // 配置发生改变
        Main.default.init();
        return vscode.window.showInformationMessage('看板娘设置已更新，请重新加载', { title: "重新加载" })
            .then(function (item) {
                if (!item) return;
                vscode.commands.executeCommand('workbench.action.reloadWindow');
            });
    }));
}
exports.activate = activate;
