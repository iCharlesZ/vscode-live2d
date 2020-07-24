export default function(config:any,extName:string,version:string):string{
	let opacity:number = config.opacity;
	let width:number = config.width
	let height:number = config.height
	let hOffset:number = config.hOffset
	let vOffsett:number = config.vOffsett
	let model:string = config.model;

	return `
	/*ext-${extName}-start*/
	/*ext.${extName}.ver.${version}*/
	var jsDom = document.createElement('script');
	jsDom.src = './js/L2Dwidget.min.js';
	document.body.appendChild(jsDom);
	setTimeout(() => {
		L2Dwidget.init({
		  "model": {
			jsonPath: './models/${model}/${model}.model.json',
		  },
		  "display": {
		  "position": "right",
		  "width": ${width},
		  "height": ${height},
		  "hOffset": ${hOffset},
		  "vOffset": ${vOffsett}
		  },
		  "mobile": {
		  "show": true,
		  "scale": 0.5
		  },
		  "react": {
		  "opacityDefault": ${opacity},
		  "opacityOnHover": ${opacity}
		  }
		  });
		}, 500)
	/*ext-${extName}-end*/
	`;
}