const vscode = require("vscode");

const vsHelp = {
    showInfo(content) {
        return vscode.window.showInformationMessage(content);
    }
}

export default vsHelp;