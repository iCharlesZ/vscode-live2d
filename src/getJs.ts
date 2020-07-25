export default function (config: any, extName: string, version: string): string {
	let model: string = config.model;

	return `
	/*ext-${extName}-start*/
	/*ext.${extName}.ver.${version}*/
	function addElement(elementName, src) {
		var tempDom = document.createElement(elementName);
		tempDom.src = src;
		tempDom.href = src;
		tempDom.rel = 'stylesheet';
		document.body.appendChild(tempDom);
		return new Promise(resolve => {
			tempDom.onload = res => {
				setTimeout(resolve, 0, res);
			};
		});
	}
	var tempDiv = document.createElement('div');
	tempDiv.innerHTML = '<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" width="300" height="300" class="live2d"></canvas></div>';
	document.body.appendChild(tempDiv.children[0]);
	
	addElement('link', './live2d/waifu.css');
	addElement('script', './live2d/jquery.min.js')
	.then(() => addElement('script', './live2d/live2d.js'))
	.then(() => addElement('script', './live2d/message.js'))
	.then(() => {
		loadlive2d(
			'live2d', 
			'./models/${model}/index.json'
			);
		});
	/*ext-${extName}-end*/
	`;
}