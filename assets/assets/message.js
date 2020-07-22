!(function() {
  function randomOneFromArr(arr) {
    if (Array.isArray(arr)) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return arr;
  }
  class Message {
    constructor() {
      this.messageTimer = null;
    }
    say(msg, durationTime = 5000) {
      let temp = $('<div class="waifu-tip-item"></div>');
      temp.text(randomOneFromArr(msg));
      $('.waifu-tips').append(temp);
      setTimeout(() => {
        temp.remove();
      }, durationTime);
    }
  }
  var message = new Message();
  function seyRandom() {
    fetch('https://v1.hitokoto.cn/')
      .then(res => res.json())
      .then(res => {
        message.say(res.hitokoto);
      });
  }
  seyRandom();
  setInterval(seyRandom, 60 * 1000);

  $(document).on('copy', function() {
    setTimeout(() => {
      const text = require('electron').clipboard.readText();
      fetch(`https://fanyi.baidu.com/transapi?query=${text}`)
        .then(res => res.json())
        .then(res => {
          message.say(`${text}的翻译内容是: ${res.data[0].dst}`);
        });
    });
  });
  // 工具栏交互事件
  $('.waifu-tool .fui-chat').click(seyRandom);
  $('.waifu-tool .fui-photo').click(function() {
    Live2D.captureName = '看板娘^-^!';
    Live2D.captureFrame = true;
  });
  $('.waifu-tool .fui-user').click(function() {
    let num = models[0].models.length;
    loadlive2d(
      'live2d',
      models[0].models[Math.floor(Math.random() * num)].link
    );
  });
  $('.waifu-tool .fui-home').click(function() {
    $('.waifu').slideToggle();
    setTimeout(() => {
      $('.waifu').slideToggle();
    }, 1000 * 60 * 5);
  });
})();
