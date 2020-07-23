const vscode = require("vscode");

function showInfo(content) {
    return vscode.window.showInformationMessage(content);
}
exports.showInfo = showInfo;

function showInfoRestart(content) {
    return vscode.window.showInformationMessage(content, { title: 'Reload vscode' })
        .then(function (item) {
            if (!item) return;
            vscode.commands.executeCommand('workbench.action.reloadWindow');
        });
}
exports.showInfoRestart = showInfoRestart;