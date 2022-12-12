// || M E D I A:
const cardsArray = [
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "apple",
    img: "images/apple.png",
  },
  {
    name: "banana",
    img: "images/banana.png",
  },
  {
    name: "kiwi",
    img: "images/kiwi.png",
  },
  {
    name: "pineapple",
    img: "images/pineapple.png",
  },
  {
    name: "strawberry",
    img: "images/strawberry.png",
  },
  {
    name: "watermelon",
    img: "images/watermelon.png",
  },
  {
    name: "fries",
    img: "images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "images/cheeseburger.png",
  },
  {
    name: "hotdog",
    img: "images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "images/milkshake.png",
  },
  {
    name: "pizza",
    img: "images/pizza.png",
  },
  {
    name: "apple",
    img: "images/apple.png",
  },
  {
    name: "banana",
    img: "images/banana.png",
  },
  {
    name: "kiwi",
    img: "images/kiwi.png",
  },
  {
    name: "pineapple",
    img: "images/pineapple.png",
  },
  {
    name: "strawberry",
    img: "images/strawberry.png",
  },
  {
    name: "watermelon",
    img: "images/watermelon.png",
  },
];

//this is how we can create "RANDOMLY SORT" the array each time!
cardsArray.sort(() => 0.5 - Math.random());

const div = document.getElementById("grid");
const score = document.getElementById("scoring");
const result = document.getElementById("h3-text");
const startPlaying = document.getElementById("start");
const timeInput = document.getElementById("timeSet");
const setTimeBtn = document.getElementById("submitBtn");
const leftTime = document.getElementById("leftTime");
const leftTimeh3 = document.getElementById("leftTimeh3");
const timeContainer = document.getElementById("timeContainer");
const timeSetSection = document.getElementById("timeSetSection");
let selectedCardName = [];
let selectedCardId = [];
let scoring = 0;
let time = 0;
let timeInterval;
let gameOver = false;
let gameStart = false;
let answer;

function flipCard(e) {
  if (gameStart && !gameOver) {
    e.target.src = cardsArray[e.target.id].img;
    selectedCardId.push(e.target.id);
    selectedCardName.push(cardsArray[e.target.id].name);
    if (selectedCardName.length === 2) {
      setTimeout(matchCards, 500);
    }
  } else if (!gameStart && !gameOver) {
    alert("Please, first start the Game");
  } else if (gameOver) {
    alert("The Game is Over.\nPlease, hit 'play again' button!");
  }
}

function matchCards() {
  const cards = document.querySelector("#grid").querySelectorAll("img");

  if (selectedCardName[0] === selectedCardName[1]) {
    alert("You have found a match");
    cards[selectedCardId[0]].src = "images/white.png";
    cards[selectedCardId[1]].src = "images/white.png";
    cards[selectedCardId[0]].removeEventListener("click", flipCard);
    cards[selectedCardId[1]].removeEventListener("click", flipCard);
    scoring++;
    showScore();
  } else if (selectedCardName[0] !== selectedCardName[1]) {
    cards[selectedCardId[0]].src = "images/foregroundImage.png";
    cards[selectedCardId[1]].src = "images/foregroundImage.png";
  }

  selectedCardName = [];
  selectedCardId = [];
}

// || C O N T R O L L E R:
createBoard();

startPlaying.addEventListener("click", () => {
  if (time === 0 && !gameOver && !gameStart) {
    answer = confirm("Do you want to set Time Frame?");
    if (answer) {
      alert("Please, set Time Frame before starting the game!");
    } else if (!answer) {
      gameStart = true;
      leftTimeh3.innerHTML = "Playing without Time Frame";
      timeContainer.style.justifyContent = "center";
      timeSetSection.style.display = "none";
      startPlaying.textContent = "Start over";
    }
  } else if (time > 0 && !gameOver && !gameStart) {
    timeInterval = setInterval(countTime, 1000);
    gameStart = true;
    startPlaying.textContent = "Start over";
  } else if (!gameStart && gameOver) {
    location.reload();
  } else if (gameStart && !gameOver) {
    location.reload();
  }
});

setTimeBtn.addEventListener("click", () => {
  if (!gameOver && !gameStart) {
    let value = Number(timeInput.value);
    time = value;
    leftTime.textContent = time;
    timeInput.value = "";
  } else if (!gameOver && gameStart) {
    alert(
      "You can not set Time Frame during the Game\nYou have already started the Game!"
    );
  } else if (gameOver && !gameStart) {
    alert(
      "The Game is over!\nPlease, first hit 'play again' button and then 'set time'!"
    );
  }
});

// || V I E W:
function createBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("img");
    card.src = "images/foregroundImage.png";
    card.setAttribute("id", i);
    card.addEventListener("click", flipCard);
    div.appendChild(card);
  }
}

function countTime() {
  if (time > 0) {
    time -= 1;
    leftTime.textContent = time;
    if (time === 0) {
      showLose();
    }
  }
}

function showScore() {
  if (scoring < cardsArray.length / 2) {
    score.textContent = scoring;
  } else if (scoring === cardsArray.length / 2) {
    result.innerHTML = "Congratulations!\nYou found everything!";
    result.style.color = "green";
    startPlaying.textContent = "Play again";
    gameStart = false;
    gameOver = true;
    time = 0;
    leftTime.textContent = 0;
  }
}

function showLose() {
  result.innerHTML = "Game Over! You are out of Time.";
  result.style.color = "red";
  startPlaying.textContent = "Play again";
  clearInterval(timeInterval);
  gameStart = false;
  gameOver = true;
}
