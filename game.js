`use strict`;

const buttonColours = [`red`, `blue`, `green`, `yellow`];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keydown(start);
$(`.btn`).click(play);

function start() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

function play() {
  let userChosenColour = $(this).attr(`id`);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentColour) {
  if (userClickedPattern[currentColour] === gamePattern[currentColour]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound(`wrong`);
    $(`body`).addClass(`game-over`);
    $(`#level-title`).text(`Game Over, Press Any Key to Restart`);
    setTimeout(function () {
      $(`body`).removeClass(`game-over`);
    }, 200);
    startOver();
  }
}

//new level
function nextSequence() {
  userClickedPattern = [];
  level++;
  $(`#level-title`).text(`Level ${level}`);
  let randomNumber = Math.trunc(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//press sound and animation
function playSound(name) {
  new Audio(`sounds/${name}.mp3`).play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass(`pressed`);
  setTimeout(function () {
    $(`#${currentColour}`).removeClass(`pressed`);
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
