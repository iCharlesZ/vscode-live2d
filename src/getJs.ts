export default function (config: any, extName: string, version: string): string {
	let model: string = config.model;
	let modelUrl: string = config.modelUrl;
	let live2dLink = customizeModel(modelUrl, model);

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
			'${live2dLink}'
			);
		});
	/*ext-${extName}-end*/
	`;
}

function customizeModel(modelUrl: string, model: string) {
	if (modelUrl) {
		return modelUrl;
	} else {
		switch (model) {
			case 'shizuku':
				return './models/shizuku/index.json';
			case 'shizuku-pajama':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/ShizukuTalk/shizuku-pajama/index.json';
			case 'bilibili-22':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/bilibili-live/22/index.json';
			case 'bilibili-33':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/bilibili-live/33/index.json';
			case 'Pio':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Pio/index.json';
			case 'Tia':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/Potion-Maker/Tia/index.json';
			case 'noir':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/HyperdimensionNeptunia/noir_classic/index.json';
			case 'nepnep':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/HyperdimensionNeptunia/nepnep/index.json';
			case 'nepmaid':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/HyperdimensionNeptunia/nepmaid/index.json';
			case 'nepgear':
				return 'https://cdn.jsdelivr.net/gh/fghrsh/live2d_api/model/HyperdimensionNeptunia/nepgear/index.json';
			default:
				return '';
		}
	}
}