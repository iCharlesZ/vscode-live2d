import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import FileType from './FileType';
import vsHelp from './vsHelp';
import getNewContent from './getJs';

export class Dom {
    //当前用户配置
    private config: any;
    //配置名称
    private configName: string;
    //要修改的文件路径
    private filePath: string;
    //插件版本号
    private version: string;
    //插件名称
    private extName: string;


    //初始化参数
    public constructor(
        configName: string,
        filePath: string,
        version: string,
        extName: string,
    ) {
        this.configName = configName;
        this.filePath = filePath;
        this.version = version;
        this.extName = extName;

        this.config = vscode.workspace.getConfiguration(this.configName);
        let firstload = this.checkFirstload();  // 是否初次加载插件
        let fileType = this.getFileType(); // 文件目前状态

        // 如果是第一次加载插件，或者旧版本
        if (firstload || fileType === FileType.isOld || fileType === FileType.empty) {
            const base = path.dirname(require.main.filename);
            copy(path.join(__dirname, '../res/assets/'), path.join(base, 'vs', 'code', 'electron-browser', 'workbench'));
            this.install(true);
        }
    }

    /**
     * 安装插件，hack
     * 
     * @private
     * @param {boolean} [refresh] 需要更新
     * @returns {void} 
     */
    public install(refresh?: boolean): void {

        let lastConfig = this.config;  // 之前的配置
        let config = vscode.workspace.getConfiguration(this.configName); // 当前用户配置


        // 1.如果配置文件改变到时候，当前插件配置没有改变，则返回
        if (!refresh && JSON.stringify(lastConfig) === JSON.stringify(config)) {
            return;
        }

        // 之后操作有两种：1.初次加载  2.配置文件改变 

        // 2.两次配置均为，未启动插件
        if (!lastConfig.enabled && !config.enabled) {
            return;
        }

        // 3.保存当前配置
        this.config = config; // 更新配置

        // 4.如果关闭插件
        if (!config.enabled) {
            this.uninstall();
            vsHelp.showInfoRestart(this.extName + '已关闭插件，请重新启动！');
            return;
        }

        // 5.hack 样式

        // 自定义的样式内容
        let content = getNewContent(config, this.extName, this.version).replace(/\s*$/, ''); // 去除末尾空白

        // 添加代码到文件中，并尝试删除原来已经添加的
        let newContent = this.getContent();
        newContent = this.clearJSContent(newContent);
        newContent += content;

        this.saveContent(newContent);
        vsHelp.showInfoRestart(this.extName + ' 已更新配置，请重新启动！');

    }


	/**
	 * 获取文件内容
	 * @var mixed
	 */
    private getContent(): string {
        return fs.readFileSync(this.filePath, 'utf-8');
    }

    /**
     * 设置文件内容
     * 
     * @private
     * @param {string} content 
     */
    private saveContent(content: string): void {
        fs.writeFileSync(this.filePath, content, 'utf-8');
    }

    /**
     * 清理已经添加的代码
     * 
     * @private
     * @param {string} content 
     * @returns {string} 
     */
    private clearJSContent(content: string): string {
        var re = new RegExp("\\/\\*ext-" + this.extName + "-start\\*\\/[\\s\\S]*?\\/\\*ext-" + this.extName + "-end\\*" + "\\/", "g");
        content = content.replace(re, '');
        content = content.replace(/\s*$/, '');
        return content;
    }

    /**
     * 卸载
     * 
     * @private
     */
    private uninstall(): boolean {
        try {
            let content = this.getContent();
            content = this.clearJSContent(content);
            this.saveContent(content);
            return true;
        }
        catch (ex) {
            return false;
        }
    }

    /**
     * 检测是否初次加载，并在初次加载的时候提示用户
     * 
     * @private
     * @returns {boolean} 是否初次加载
     */
    private checkFirstload(): boolean {
        const configPath = path.join(__dirname, '../res/config.json');
        let info: { firstload: boolean } = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

        if (info.firstload) {
            // 提示
            vsHelp.showInfo('插件： ' + this.extName + '已启动! ');
            // 标识插件已启动过
            info.firstload = false;
            fs.writeFileSync(configPath, JSON.stringify(info, null, '    '), 'utf-8');

            return true;
        }

        return false;
    }

    /**
     * 获取文件状态
     * 
     * @private
     * @returns {FileType} 
     */
    private getFileType(): FileType {
        let jsContent = this.getContent();

        // 未 hack 过
        let ifUnInstall: boolean = !~jsContent.indexOf(`ext.${this.extName}.ver`);

        if (ifUnInstall) {
            return FileType.empty;
        }

        // hack 过的旧版本
        let ifVerOld: boolean = !~jsContent.indexOf(`/*ext.${this.extName}.ver.${this.version}*/`);

        if (ifVerOld) {
            return FileType.isOld;
        }

        // hack 过的新版本
        return FileType.isNew;
    }

}

function copy(src: string, dst: string) {
    let paths = fs.readdirSync(src); //同步读取当前目录
    paths.forEach(function (path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) {
            //stats  该对象 包含文件属性
            if (err) { throw err; }
            if (stats.isFile()) {
                //如果是个文件则拷贝
                let readable = fs.createReadStream(_src); //创建读取流
                let writable = fs.createWriteStream(_dst); //创建写入流
                readable.pipe(writable);
            }
            else if (stats.isDirectory()) {
                //是目录则 递归
                checkDirectory(_src, _dst, copy);
            }
        });
    });
}

function checkDirectory(src: string, dst: string, callback: Function) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        }
        else {
            callback(src, dst);
        }
    });
}