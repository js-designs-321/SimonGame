var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function startOver() {
  started = false;
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("h1").text("Game over, Press any key to restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  if(level === 5){
    $("h1").text("You Won !!");
    setTimeout(function(){
      startOver();
    },2000);
    return;
  }
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
})

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if (started === false) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
});
