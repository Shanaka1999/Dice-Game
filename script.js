
const dice = document.querySelectorAll(".die");

const player1 = document.querySelector('.player-1'); 
const player2 = document.querySelector('.player-2');

const rollBtn = document.querySelector(".roll-btn");
const resetBtn = document.querySelector(".reset-btn");

const total_1 = document.querySelector('.player-1 p'); 
const total_2 = document.querySelector('.player-2 p');

const winMsg1 = document.querySelector('.win-msg-1')
const winMsg2 = document.querySelector('.win-msg-2')


const game = {
  player1: {
    turn: false,
    score: 0,
  },
  player2: {
    turn: false,
    score: 0,
  },
};

function getRandomDieValue() {
  return Math.floor(Math.random() * 6) + 1;
}


function getNumber(num) {
    if(num < 10) {
        return `00${num}`;
    } else if (num < 100) {
        return `0${num}`;
    } else {
        return `${num}`
    }
}

rollBtn.addEventListener("click", () => {
  const Val1 = getRandomDieValue();
  const Val2 = getRandomDieValue();

  const player = game.player1.turn ? "player1" : "player2";
  console.log(player);

  // set random die images
  dice.forEach((die, index) => {
    if (index === 0) {
      const src = `./images/dice-${Val1}.png`;
      die.src = src;
    } else {
      const src = `./images/dice-${Val2}.png`;
      die.src = src;
    }
  });

  if (Val1 === Val2 && Val1 === 1) {
    game[player].score = 0;
  } else {
    game[player].score = game[player].score + Val1 + Val2;
  }


  if(player === 'player1') {
    total_1.innerText = getNumber(game.player1.score)
    player1.style.border = "2px solid transparent";

  } else {
    total_2.innerText = getNumber(game.player2.score)
    player2.style.border = "2px solid transparent";
  }


  console.log(
    `Player 1 score = ${game.player1.score}, Player 2 score = ${game.player2.score}`
  );

  if(game[player].score >= 100) {
    console.log(`${player} won the game with ${game[player].score} score.`)
    rollBtn.disabled = true
    resetBtn.disabled = false
    if(player === 'player1') {
        winMsg1.style.opacity =  "1";
    } else {
        winMsg2.style.opacity =  "1";
    }
  }

  if (Val1 === Val2 && Val1 !== 1) {
    game[player].turn = true;
    game[player === "player1" ? "player2" : "player1"].turn = false;
  } else {
    game[player].turn = false;
    game[player === "player1" ? "player2" : "player1"].turn = true;
  }

  if(game.player1.turn) {
    player1.style.border = "2px solid red";
  } else {
    player2.style.border = "2px solid red"
  }


});


resetBtn.addEventListener('click', () => {
    total_1.innerText = "000"
    total_2.innerText = "000"
    game.player1.score = 0
    game.player1.turn = true
    game.player2.score = 0
    game.player2.turn = false
    rollBtn.disabled = false
    resetBtn.disabled = true
    winMsg1.style.opacity =  "0";
    winMsg2.style.opacity =  "0";


    dice.forEach((die, index) => {
        if (index === 0) {
          const src = `./images/play.png`;
          die.src = src;
        } else {
          const src = `./images/diceF.png`;
          die.src = src;
        }
      });
})

game.player1.turn = true;