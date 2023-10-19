// STORE ALL VARIABLES HERE
const width = 10;
const playerGrid = document.querySelector("#playerBoard");
const computerGrid = document.querySelector("#computerBoard");
let computerBlocksArr = [];
let playerBlocksArr = [];
const startButton = document.querySelector("#startButton");
// let randomBoolean = Math.random() < 0.5;
// let horizontal = randomBoolean;

// CREATE GRID FOR PLAYER BOARD
function createMiniBlocksPlayer(grid) {
  for (let i = 0; i < width * width; i++) {
    const miniBlock = document.createElement("div");
    miniBlock.id = "p" + i;
    miniBlock.classList.add("mini-block");
    grid.append(miniBlock);
  }
}
createMiniBlocksPlayer(playerGrid);

// CREATE GRID FOR COMPUTER BOARD
function createMiniBlocksComputer(grid) {
  for (let i = 0; i < width * width; i++) {
    const miniBlock = document.createElement("div");
    miniBlock.id = "c" + i;
    miniBlock.classList.add("mini-block");
    grid.append(miniBlock);
  }
}
createMiniBlocksComputer(computerGrid);

// USE CLASSES TO CREATE SHIPS
class shipCategory {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}
const carrier = new shipCategory("carrier", 5);
const battleship = new shipCategory("battleship", 4);
const cruiser = new shipCategory("cruiser", 3);
const submarine = new shipCategory("submarine", 3);
const destroyer = new shipCategory("destroyer", 2);

const newShips = [carrier, battleship, cruiser, submarine, destroyer];
// console.log(newShips);

// AUTOMATICALLY AND RANDOMLY ALLOCATE SHIPS TO COMPUTER BOARD
function allocateShipPieces(ship) {
  const allMiniBlocks = document.querySelectorAll("#computerBoard div");
  let randomStartIndex = Math.floor(Math.random() * width * width);

  let validStartIndex = randomStartIndex;

  if (randomStartIndex <= width * width - ship.length) {
    validStartIndex = randomStartIndex;
  } else {
    validStartIndex = width * width - ship.length;
  }

  let shipsArr = [];
  for (let i = 0; i < ship.length; i++) {
    shipsArr.push(allMiniBlocks[validStartIndex + i]);
  }

  let noOverlap;
  for (let i = randomStartIndex; i < randomStartIndex + ship.length; i++) {
    let boardIndex = "#c" + i;
    if (document.querySelector(boardIndex).classList.contains("taken")) {
      noOverlap = false;
    } else {
      noOverlap = true;
    }
  }
  //   let valid;
  //   if (
  //     shipsArr.every((_ship, index) => {
  //       shipsArr[0].id % width !== width - (shipsArr.length - (index + 1));
  //     })
  //   ) {
  //     valid = true;
  //   } else {
  //     valid = false;
  //   }

  // const notTaken = shipsArr.every((index) => {
  //   !index.classList.contains("taken");
  // });

  if (noOverlap) {
    shipsArr.forEach((item) => {
      item.classList.add("taken", ship.name);
    });
  } else {
    allocateShipPieces(ship);
  }
  //   shipsArr.forEach((smth) => {
  //     smth.classList.add(ship.name);
  //     smth.classList.add("taken");
  //   });
}
newShips.forEach((newship) => {
  allocateShipPieces(newship);
});

// FUNCTION START GAME
function startGame() {
  const allComputerMiniBlocks = document.querySelectorAll(
    "#computerBoard .mini-block"
  );
  allComputerMiniBlocks.forEach((item) => {
    //Q: How does this work? I thought forEach is for array?
    item.addEventListener("click", handleClick);
  });
}

function handleClick(e) {
  if (e.target.classList.contains("taken")) {
    e.target.classList.add("hit");
  } else {
    e.target.classList.add("miss");
  }
}

startButton.addEventListener("click", startGame);

// OTHER LOGICS:
/* 
- Hide the computer's ships
- Settle the issue of the ships splitting into the new row
- Time or maximum number of clicks
- A console on the HTML that reads messages. This will take awhile. 
- 
*/
