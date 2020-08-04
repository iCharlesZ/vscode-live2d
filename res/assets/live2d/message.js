!(function () {
  let userAction = false;
  let userActionTimer = null;
  let messageTimer = null;
  let priority = 0;
  let messageArray = [
    "你又来看我啦~",
    "嗨～快来逗我玩吧！",
    "拿小拳拳锤你胸口！"
  ];
  let mouseoverMsg = [
    "干嘛呢你，快把手拿开～～",
    "鼠…鼠标放错地方了！",
    "你要干嘛呀？",
    "喵喵喵？",
    "怕怕(ノ≧∇≦)ノ",
    "非礼呀！救命！",
    "这样的话，只能使用武力了！",
    "我要生气了哦",
    "不要动手动脚的！",
    "真…真的是不知羞耻！",
    "Hentai！"
  ];
  let clickMsg = [
    "是…是不小心碰到了吧…",
    "萝莉控是什么呀？",
    "你看到我的小熊了吗？",
    "再摸的话我可要报警了！⌇●﹏●⌇",
    "110 吗，这里有个变态一直在摸我(ó﹏ò｡)",
    "不要摸我了，我会告诉老婆来打你的！",
    "干嘛动我呀！小心我咬你！",
    "别摸我，有什么好摸的！"
  ];

  window.addEventListener("mousemove", () => userAction = true);
  window.addEventListener("keydown", () => userAction = true);
  setInterval(() => {
    if (userAction) {
      userAction = false;
      clearInterval(userActionTimer);
      userActionTimer = null;
    } else if (!userActionTimer) {
      userActionTimer = setInterval(sayRandom, 30 * 1000);
    }
  }, 1000);

  function randomMsg(arr) {
    if (Array.isArray(arr)) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return arr;
  }

  function showMessage(msg, durationTime, num) {
    if (!msg || priority > num) { return; }
    if (messageTimer) {
      clearTimeout(messageTimer);
      messageTimer = null;
    }
    priority = num;
    let tips = document.querySelector("#waifu-tips");
    let text = randomMsg(msg);
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
      priority = 0;
      tips.classList.remove("waifu-tips-active");
    }, durationTime);
  }

  function sayRandom() {
    fetch('https://v1.hitokoto.cn/')
      .then(res => res.json())
      .then(res => {
        showMessage(res.hitokoto, 6000, 2);
      });
  }

  showMessage(randomMsg(messageArray), 6000, 3);

  document.querySelector("#live2d").addEventListener("mouseover", () => {
    showMessage(mouseoverMsg, 2000, 1);
  });

  document.querySelector("#live2d").addEventListener("click", () => {
    showMessage(clickMsg, 2000, 1);
  });

})();
