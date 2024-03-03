// ==UserScript==
// @name         AKiller
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @author       You
// @match        aether.margonem.pl/
// @grant        none
// ==/UserScript==

((Engine) => {
  const SocietyData = {
    RELATION: {
      NONE: 1,
      FRIEND: 2,
      ENEMY: 3,
      CLAN: 4,
      CLAN_ALLY: 5,
      CLAN_ENEMY: 6,
      FRACTION_ALLY: 7,
      FRACTION_ENEMY: 8,
    },
  };

  function algorytm() {
    var targets = [];
    if (Engine.map.d.pvp == 2 && document.getElementById("trigger").checked) {
      var minLvl = document.getElementById("minLvl").value;
      var maxLvl = document.getElementById("maxLvl").value;
      var backX = document.getElementById("backX").value;
      var backY = document.getElementById("backY").value;

      if (minLvl == "") {
        minLvl = 0;
      }
      if (maxLvl == "") {
        maxLvl = 400;
      }

      var eee = Engine.others.getDrawableList().filter((obj) => {
        return obj.d;
      });
      var others = eee.filter((obj) => {
        return (
          (obj.d.relation == SocietyData.RELATION.ENEMY ||
            obj.d.relation == SocietyData.RELATION.CLAN_ENEMY ||
            obj.d.relation == SocietyData.RELATION.NONE) &&
          obj.d.lvl > minLvl &&
          obj.d.lvl < maxLvl
        );
      });
      for (var i in others) {
        var emo = others[i].getOnSelfEmoList();
        if (emo == undefined) {
          targets.push({
            id: others[i].d.id,
            x: others[i].d.x,
            y: others[i].d.y,
            distance:
              Math.abs(Engine.hero.d.x - others[i].d.x) +
              Math.abs(Engine.hero.d.y - others[i].d.y),
          });
        } else if (emo.name != "battle" && emo.name != "pvpprotected") {
          targets.push({
            id: others[i].d.id,
            x: others[i].d.x,
            y: others[i].d.y,
            distance:
              Math.abs(Engine.hero.d.x - others[i].d.x) +
              Math.abs(Engine.hero.d.y - others[i].d.y),
          });
        }
      }
      if (targets != "") {
        targets = targets.sort((a, b) => (a.distance > b.distance ? 1 : -1));
        if (targets[0].distance > 2) {
          if (document.getElementById("follow").checked) {
            Engine.hero.autoGoTo({ x: targets[0].x, y: targets[0].y });
          }
        } else {
          window._g("fight&a=attack&id=" + targets[0].id);
        }
      } else if (
        document.getElementById("backChecker").checked &&
        backX != Engine.hero.d.x &&
        backX != "" &&
        backY != Engine.hero.d.y &&
        backY != ""
      ) {
        Engine.hero.autoGoTo({ x: eval(backX), y: eval(backY) });
      }
    }
    setTimeout(algorytm, 50);
  }

  function css() {
    if (!localStorage.getItem(`heal775`)) {
      let ihfyasfj = {
        x: 200,
        y: 140,
      };
      localStorage.setItem(`heal775`, JSON.stringify(ihfyasfj));
    }
    const heale = JSON.parse(localStorage.getItem(`heal775`));

    const $container2 = $('<div id="container2"></div>');
    const $trigger = $('<input type="checkbox" id="trigger">ON/OFF</br>');
    const $follow = $('<input type="checkbox" id="follow">Follow</br>');
    const $minLvl = $(
      '<input type="text" class="input" id="minLvl" autocomplete="off" placeholder="Min lvl"></br>'
    );
    const $maxLvl = $(
      '<input type="text" class="input" id="maxLvl" autocomplete="off" placeholder="Max lvl"></br>'
    );
    const $backChecker = $('<input type="checkbox" id="backChecker">');
    const $backX = $(
      '<input type="number" class="backInput" id="backX" placeholder="X">'
    );
    const $backY = $(
      '<input type="number" class="backInput" id="backY" placeholder="Y"></br>'
    );
    const $backButton = $('<button id="backButton"></button>');
    $("body").append($container2);
    $("#container2").append(
      $trigger,
      $follow,
      $minLvl,
      $maxLvl,
      $backChecker,
      $backX,
      $backY,
      $backButton
    );

    $("#container2").css({
      position: "absolute",
      "text-align": "center",
      width: "auto",
      height: "auto",
      background: "#808080",
      top: `${heale.y}px`,
      left: `${heale.x}px`,
      "border-radius": "3px",
      border: "1px solid black",
      "z-index": "999",
    });
    $("#backButton").css({
      "margin-top": "5px",
      height: "18px",
      width: "45px",
    });
    $(".input").css({
      width: "50px",
    });
    $(".backInput").css({
      "margin-top": "6px",
      height: "15px",
      width: "19px",
    });

    $(container2).draggable({
      stop: () => {
        let ihfyasfj = {
          x: parseInt(container2.style.left),
          y: parseInt(container2.style.top),
        };
        localStorage.setItem(`heal775`, JSON.stringify(ihfyasfj));
      },
    });

    $("#backButton").on("click", function () {
      document.getElementById("backX").value = Engine.hero.d.x;
      document.getElementById("backY").value = Engine.hero.d.y;
    });
  }

  window.onload = css();
  window.onload = algorytm();
})(window.Engine);
