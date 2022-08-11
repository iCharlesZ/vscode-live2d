
import * as vscode from 'vscode';
import * as path from 'path';
import version from './version';
import { Dom } from './Dom';

export class Main {
	public static watch(): vscode.Disposable {
		const base = path.dirname(require.main.filename);
		const filePath = path.join(base, 'vs', 'code', 'electron-sandbox', 'workbench', 'workbench.js');
		const extName = "vscode-live2d";
		let DomApi = new Dom(extName, filePath, version, extName);
		return vscode.workspace.onDidChangeConfiguration(() => DomApi.install());
	}
}