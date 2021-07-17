let won = 0;
const player1 = {
  currentScore: 0,
  totalScore: 0,
  isActive: true,
};

const player2 = {
  currentScore: 0,
  totalScore: 0,
  isActive: false,
};
const currentScores = document.querySelectorAll('.current-score');
const totalScores = document.querySelectorAll('.total-score');
const rollDiceButtons = document.querySelectorAll('.roll-dice');
const holdScoreButtons = document.querySelectorAll('.hold');
const newGameButtons = document.querySelectorAll('.new-game');
const player1Section = document.querySelector('.player-1');
const player2Section = document.querySelector('.player-2');
const dots = document.querySelectorAll('.dot');
const one = document.querySelectorAll('.one');
const two = document.querySelectorAll('.two');
const three = document.querySelectorAll('.three');
const four = document.querySelectorAll('.four');
const five = document.querySelectorAll('.five');
const six = document.querySelectorAll('.six');
let diceValue;
const switchPlayers = function () {
  if (!won) {
    if (player1.isActive) {
      player1.isActive = false;
      player2.isActive = true;
      player1.currentScore = 0;
      currentScores[0].textContent = 0;
      totalScores[0].textContent = player1.totalScore;
      player2Section.classList.add('active-turn');
      player1Section.classList.remove('active-turn');
    } else {
      player2.isActive = false;
      player1.isActive = true;
      player2.currentScore = 0;
      currentScores[1].textContent = 0;
      totalScores[1].textContent = player2.totalScore;
      player1Section.classList.add('active-turn');
      player2Section.classList.remove('active-turn');
    }
  }
};

const showNumberOnDice = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].style.opacity = '1';
  }
};

const clearDice = function () {
  for (let i = 0; i < dots.length; i++) {
    dots[i].style.opacity = '0';
  }
};
const diceRoll = function () {
  if (!won) {
    diceValue = Math.trunc(Math.random() * 6) + 1;
    clearDice();
    switch (diceValue) {
      case 1:
        showNumberOnDice(one);
        break;
      case 2:
        showNumberOnDice(two);
        break;
      case 3:
        showNumberOnDice(three);
        break;
      case 4:
        showNumberOnDice(four);
        break;
      case 5:
        showNumberOnDice(five);
        break;
      case 6:
        showNumberOnDice(six);
        break;
    }
    if (player1.isActive && diceValue !== 1) {
      player1.currentScore += diceValue;
      currentScores[0].textContent = player1.currentScore;
    } else if (player2.isActive && diceValue !== 1) {
      player2.currentScore += diceValue;
      currentScores[1].textContent = player2.currentScore;
    } else if (diceValue === 1) {
      switchPlayers();
    }
  }
};

const holdScore = function () {
  if (!won) {
    if (player1.isActive) {
      player1.totalScore += player1.currentScore;
      if (player1.totalScore >= 100) {
        won = 1;
        totalScores[0].textContent = player1.totalScore;
        currentScores[0].textContent = 0;
        player1Section.classList.add('winner');
      }
    } else {
      player2.totalScore += player2.currentScore;
      if (player2.totalScore >= 100) {
        won = 1;
        totalScores[1].textContent = player2.totalScore;
        currentScores[1].textContent = 0;
        player2Section.classList.add('winner');
      }
    }
    if (won != 1) switchPlayers();
  }
};

const resetGame = function () {
  player1.currentScore = 0;
  player2.currentScore = 0;
  player1.totalScore = 0;
  player2.totalScore = 0;
  player1.isActive = true;
  player2.isActive = false;
  player1Section.classList.add('active-turn');
  player2Section.classList.remove('active-turn');
  player1Section.classList.remove('winner');
  player2Section.classList.remove('winner');
  clearDice();
  showNumberOnDice(six);
  won = 0;
  for (let i = 0; i < 2; i++) {
    currentScores[i].textContent = 0;
    totalScores[i].textContent = 0;
  }
};

for (let i = 0; i < rollDiceButtons.length; i++) {
  rollDiceButtons[i].addEventListener('click', diceRoll);
}

for (let i = 0; i < holdScoreButtons.length; i++) {
  holdScoreButtons[i].addEventListener('click', holdScore);
}

for (let i = 0; i < newGameButtons.length; i++) {
  newGameButtons[i].addEventListener('click', resetGame);
}
