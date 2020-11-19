!(function () {
  let userAction = false;
  let userActionTimer = null;
  let messageTimer = null;
  let priority = 0;
  let messageArray = [
    "You came to see me again~",
    "Hi~ Come and play with me！"
  ];
  let mouseoverMsg = [
    "What are you doing, take your hand away~~",
    "Mouse... The mouse is misplaced!",
    "What are you doing?",
    "Meow meow meow?",
    "Eh (ノ≧∇≦)ノ",
    "Indecent! Help!",
    "In this case, force can only be used!",
    "Oh, I'm getting angry",
    "Don't do anything!",
    "Really... Really shameless!",
    "Hentai！"
  ];
  let clickMsg = [
    "Yes... I bumped into it accidentally...",
    "What do you want, lolicon?",
    "Did you see my little bear?",
    "I will call the police if you touch me again!⌇●﹏●⌇",
    "911, there is a pervert who has been touching me(ó﹏ò｡)",
    "Stop touching me, I will tell my wife to hit you!",
    "Why do you move me! Be careful I bit you!",
    "Don't touch me, there's nothing to touch!"
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
    fetch('https://got-quotes.herokuapp.com/quotes/')
      .then(res => res.json())
      .then(res => {
        showMessage(res.quote + " ——" + res.character, 6000, 2);
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
