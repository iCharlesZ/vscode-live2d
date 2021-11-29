import * as path from 'path';
import * as fs from 'fs';
import getOriginalHtml from './originalHtml';

const base = process.cwd();
// 文件路径
const filePath = path.join(base, 'resources', 'app', 'out', 'vs', 'code', 'electron-browser', 'workbench', 'workbench.js');
const extName = "vscode-live2d";


//执行清理
main();

//清理内容
function main() {
    try {
        let content = getContent();
        const base = path.dirname(require.main.filename);
        content = clearCssContent(content);
        saveContent(content);
        removeFiles(path.join(base, 'vs', 'code', 'electron-browser', 'workbench', 'live2d'));
        removeFiles(path.join(base, 'vs', 'code', 'electron-browser', 'workbench', 'models'));

        // 还原HTML
        let originalHtml = getOriginalHtml().replace(/\s*$/, '');
        const htmlPath = path.join(path.dirname(require.main.filename), 'vs', 'code', 'electron-browser', 'workbench', 'workbench.html');
        fs.writeFileSync(htmlPath, originalHtml, 'utf-8');

        return true;
    }
    catch (ex) {
        return false;
    }
}


/**
 * 获取文件内容
 * @var mixed
 */
function getContent(): string {
    return fs.readFileSync(filePath, 'utf-8');
}


/**
* 清理已经添加的代码
* 
* @private
* @param {string} content 
* @returns {string} 
*/
function clearCssContent(content: string): string {
    var re = new RegExp("\\/\\*ext-" + extName + "-start\\*\\/[\\s\\S]*?\\/\\*ext-" + extName + "-end\\*" + "\\/", "g");
    content = content.replace(re, '');
    content = content.replace(/\s*$/, '');
    return content;
}


/**
* 设置文件内容
* 
* @private
* @param {string} content 
*/
function saveContent(content: string): void {
    fs.writeFileSync(filePath, content, 'utf-8');
}


/**
* 删除文件内容
* 
* @private
* @param {string} path 
*/
function removeFiles(path: string) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                removeFiles(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}