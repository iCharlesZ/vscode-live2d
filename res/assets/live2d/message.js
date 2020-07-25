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
})();
