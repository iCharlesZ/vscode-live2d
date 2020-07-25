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

addElement('link', './assets/waifu.css');
addElement('script', './assets/jquery.min.js')
  .then(() => addElement('script', './assets/live2d.js'))
  .then(() => addElement('script', './assets/model.js'))
  .then(() => addElement('script', './assets/message.js'))
  .then(() => addElement('script', './assets/modelConfig.js'))
  .then(() => {
    loadlive2d(
      'live2d', 
      'models/shizuku/index.json'
    );
  });