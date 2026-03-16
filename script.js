// references
var inputBox = document.getElementById("inputBox");
var hintMsg = document.getElementById("hint");
var attemptsMsg = document.getElementById("attempts");
var btn = document.getElementById("btn");

//  game setting variables
var maxNumber = 20;
var maxAttempts = 5;  // 0 or negative numbers won't work
// game code variables
var playAgain;
var attempts;
var randomNumber;
var validInput;
var userGuess;

// starting state
gameReset();

// when submit button is clicked
btn.addEventListener("click",function() {
  if (!playAgain) {
    startGame();
  } else {
    gameReset();
  }
});

function gameReset() {
  playAgain = false;
  attempts = maxAttempts;
  inputBox.value = "";
  randomNumber = Math.floor(Math.random() * maxNumber) + 1;
  hintMsg.style.color = "black";
  hintMsg.textContent = "Enter a number between 1 to " + maxNumber;
  attemptsMsg.textContent = "...";
  inputBox.disabled = false;
  btn.textContent = "Submit";
}

function startGame() {
  checkIfValidInput();
  if (validInput) {
    attempts--;
    if (attempts > 0) {
      compareInput();
    } else {
      if (userGuess == randomNumber) {
        winSituation();
      } else {
        loseSituation();
      }
    }
  }
}

function checkIfValidInput() {
  validInput = false;
  userGuess = Number(inputBox.value);
  if (Number.isNaN(userGuess)) {
    inputBox.value = "";
    hintMsg.textContent = "Please Enter a valid number";
    attemptsMsg.textContent = attempts + " attempts left.";
  } else {
    if (userGuess >= 1 && userGuess <= maxNumber) {
      validInput = true;
    } else {
      inputBox.value = "";
      hintMsg.textContent = "Please Enter your number from range 1 to " + maxNumber + " only";
      attemptsMsg.textContent = attempts + " attempts left.";
    }
  }
}

function compareInput() {
  if (userGuess < randomNumber) {
    inputBox.value = "";
    hintMsg.textContent = "Too Low.";
    attemptsMsg.textContent = attempts + " attempts left.";
  } else if (userGuess > randomNumber) {
    inputBox.value = "";
    hintMsg.textContent = "Too High.";
    attemptsMsg.textContent = attempts + " attempts left.";
  } else {
    winSituation();
  }
}

function winSituation() {
  hintMsg.style.color = "green";
  hintMsg.textContent = "Correct. You Found it.";
  attemptsMsg.textContent = "...";
  inputBox.disabled = true;
  btn.textContent = "Play Again";
  playAgain = true;
}
function loseSituation() {
  hintMsg.style.color = "red";
  hintMsg.textContent = "Oops you Failed to Guess the Number.";
  attemptsMsg.textContent = "The correct number was " + randomNumber;
  inputBox.disabled = true;
  btn.textContent = "Play Again";
  playAgain = true;
}