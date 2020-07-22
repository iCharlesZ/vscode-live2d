const vscode = require("vscode");
const Tools = require("./tools");
// const vsHelp = require("./vsHelp");
const path = require("path");
const fs = require("fs");
// @ts-ignore
const PACKAGE = require('../package.json');
function getConfig() {
    return vscode.workspace.getConfiguration(PACKAGE.displayName);
}
exports.getConfig = getConfig;
class Main {
    constructor() {
        this.version = PACKAGE.version;
        this.name = PACKAGE.displayName;
        this.jsfilePath = path.join(Tools.getBasePath(), 'workbench.js');
        this.install = () => {
            if (this.isInstall)
                return;
            Tools.copy(path.join(__dirname, '../assets/'), Tools.getBasePath());
            this.insertJS();
        };
        this.uninstall = () => {
            this.clearJS();
        };
        this.init = () => {
            this.uninstall();
            let config = getConfig();
            if (config.get('enabled')) {
                this.install();
            }
        };
        this.insertJS = () => {
            if (this.isInstall)
                return;
            var jsString = fs
                .readFileSync(path.join(__dirname, '../resources/insertJS.js'))
                .toString();
            var insertStr = `
        /*ext-${this.name}-start*/
        ${jsString}
        /*ext-${this.name}-end*/
        `;
            fs.writeFileSync(this.jsfilePath, fs.readFileSync(this.jsfilePath).toString() + insertStr, 'utf-8');
        };
        this.clearJS = () => {
            if (!this.isInstall)
                return;
            var re = new RegExp(`\\/\\*ext-${this.name}-start\\*\\/[\\s\\S]*?\\/\\*ext-${this.name}-end\\*\\/`, 'g');
            let content = fs.readFileSync(this.jsfilePath).toString();
            content = content.replace(re, '').replace(/\s*$/, '');
            fs.writeFileSync(this.jsfilePath, content, 'utf-8');
        };
    }
    // 是否初始化
    get isInstall() {
        var str = fs.readFileSync(this.jsfilePath);
        return str.indexOf(`/*ext-${this.name}-start*/`) !== -1;
    }
}
exports.default = new Main();
