const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let divSelector_ = null;

function round() {
  // + FIXME: надо бы убрать "target" прежде чем искать новый 

  if (divSelector_ != null) {
    $(divSelector_).removeClass("target"); //+
    $(divSelector_).text('');
  }

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits+1)

  // + TODO: помечать target текущим номером

  // + FIXME: тут надо определять при первом клике firstHitTime

  if (firstHitTime === 0) {
    firstHitTime = getTimestamp()
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  $("#slots").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // + FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {

    divSelector_ = $(event.target)

    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);

  $("#button-reload").click(function() {
    location.reload();
  });

  console.log('скрипт заружен')
}

$(document).ready(init);
