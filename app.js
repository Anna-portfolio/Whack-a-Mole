const squares = document.querySelectorAll(".square");
var timeLeft = document.getElementById("time-left");
var score = document.getElementById("score");
var smash = document.querySelector(".smash");

const homeBox = document.querySelector(".home-box");
const gameBox = document.querySelector(".game-box");
const resultBox = document.querySelector(".result-box");

const totalMoleHit = document.querySelector(".total-moles-hit");

let result = 0;
let counter = 10;


function startGame(){
  homeBox.classList.add("hide");
  gameBox.classList.remove("hide");


  function randomSquare(squares){
    var index = Math.floor(Math.random() * squares.length);
    var getSquare = squares[index];
    hitTheMole = getSquare.id;
    return getSquare;
  }
  
  function showMole() {
    var showTime = Math.random() * (1000 - 200) + 200;
    var showSquare = randomSquare(squares);
    showSquare.classList.add("mole");

    setTimeout(() => {
      showSquare.classList.remove("mole");
      showMole();
    }, showTime);

    function hitSound(){
      var sound1 = new Audio("sounds/hitsound1.mp3");
      var sound2 = new Audio("sounds/hitsound2.mp3");
      var sound3 = new Audio("sounds/hitsound3.mp3");
      var sound4 = new Audio("sounds/hitsound4.mp3");

      var soundsArray = [sound1, sound2, sound3, sound4];
      var randomSound = soundsArray[Math.floor(Math.random() * soundsArray.length)]; 
      randomSound.play();
    }

    document.addEventListener("mousemove", function(e){
      smash.style.left = (e.clientX - 100) + "px";
      smash.style.top = (e.clientY - 100) + "px";
    })

    function showSmash() {
      smash.classList.add("smash-active");
  
      setTimeout(() => {
        smash.classList.remove("smash-active");
      }, 150);
    }


    function removeHitMole(){
      squares.forEach(position => {
        position.classList.remove("mole");
      })
    }

      squares.forEach(index => index.addEventListener("click", () => {
        if(index.id === hitTheMole){
          result++;
          hitSound();
          showSmash();
          removeHitMole();
          score.textContent = result;
          hitTheMole = null;
        }
      })
    )
  };

  window.onload = showMole();

  timerId = setInterval(timer, 1000);

  function timer() {
    counter--;
    timeLeft.innerHTML = counter;
    if(counter === 0) {
      resultBoard();
    };
  };
}

function resultBoard() {
  gameBox.classList.add("hide");
  resultBox.classList.remove("hide");
  totalMoleHit.innerHTML = "Your score: " + result;
}

function resetGame(){
  result = 0;
  score.innerHTML = 0;
  counter = 10;
  timeLeft.innerHTML = counter;
}

function tryAgain() {
  resultBox.classList.add("hide");
  gameBox.classList.remove("hide");
  resetGame();
  squares.classList.remove("mole");
  startGame();
}

function goHome() {
  window.location.reload();
  sound.autoplay();
}