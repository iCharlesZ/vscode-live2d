export default function () {
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' https: data: blob: vscode-remote-resource:; media-src 'none'; frame-src 'self' vscode-webview: https://*.vscode-webview-test.com; object-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https:; font-src 'self' https: vscode-remote-resource:;"/>
    </head>
    <body aria-label="">
    </body>
    <script src="../../../../bootstrap.js"></script>
    <script src="../../../../vs/loader.js"></script>
    <script src="../../../../bootstrap-window.js"></script>
    <script src="workbench.js"></script>
</html>`;
}