// ? High-Level Pseudocode.
// 1. Start page which has;
//    - the title of the game <H1>
//    - the how-to-play <ul> and <li>
//    - start button which when clicked starts the game and hides the Start Page
// 2. Main game page which shows;
//    - the title of the game <H1> still showing
//    - above the game has your current score, level and how many lives you are on (should show 0 for level and score and 3 lives at beginning)
//    - the grid that the game is played on - should see your player at bottom (as a stretch - select player would show over this then hide once player is selected)
//    - Reset button just below grid
// 3. Game play;
//    - generate game-grid - Player should appear on page load
//    - once game initiates, 4 rows of galagal show at top of grid (STRETCH - 4 different levels of galagal mean different points scored: bottom, mid, top and boss)
//    - galagal move left to right then down a level then right to left then down a level then left to right
//    - galgal should not be able to move out of the grid.
//    - player should be able to move left or right and use the space bar to shoot shockwaves at galagal [STRETCH - PLAYER PUNCHING sound effect]
//    - if players shockwave hits galagal the galagal should be removed from the game and score should be added [STRETCH - TKO sound effect]
//    - galgals shoot randomly down [STRETCH - SHOOTING sound effect]
//    - if a shot fired by galgal hits player; deduct a life from player. 
//    - if player shoots a galgal and it is the final galagal left on grid then GAME OVER and relevant score should appear on screen [FINAL SCORE sound effect]
//    - if players lives drop below 1 then the player has lost the game - there should be a game over screen that appears [STRETCH - GAME OVER sound effect]
//? styling

//? Elements
const grid = document.querySelector('#game-grid')
const startBtn = document.querySelector('#start')
const GridCells = document.querySelectorAll('.grid-cell')
const scoreEl = document.querySelector('#score')
const levelEl = document.querySelector('#level')
const livesEl = document.querySelector('#lives')
const resetBtn = document.querySelector('#reset')

//? Variables

let livesVar = 3
let scoreVar = 0
let levelVar = 1

const cols = 10
const rows = 10
const cellCount = cols * rows
const ceiling = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// galaga
let galInt = 1500
let galLeftRight = true
let galaga = [2, 3,
  10, 11, 12, 13, 14, 15,
  20, 21, 22, 23, 24, 25,
  31, 32, 33, 34]

// player
let player = 94
let crntPlayPos = player
const cells = []

const intervals = []

let punchPos


//? On page load


//? Execution


// ?Functions

function createStartGrid() {
  // Generate grid cells
  for (let idx = 0; idx < cellCount; idx++) {
    const cell = document.createElement('div')
    cell.innerText = idx
    cell.dataset.index = idx
    cell.classList.add('grid-cell')
    // set height and width of cell
    cell.style.width = `${100 / cols}%`
    cell.style.height = `${100 / rows}%`
    // put player in starting cell
    if (idx === player) {
      cell.classList.add('player')
    }
    // add to the UI
    grid.append(cell)
    // add the cell to the cells array
    cells.push(cell)
  }
}

function startGame() {
  createStartGrid()
  // what happends when game is reset
  //  - lives reset to 3
  //  - score resets to 0
  //  - level resets to 1
}
startGame()

function startGalagaMovement() {
  addGalaga()
  moveGalaga()
  removeGalaga()
}
startGalagaMovement()

function movePlayer(evt) {
  // remove player from current position
  cells[player].classList.remove('player')
  if (evt.key === 'ArrowLeft' && player % cols !== 0) {
    player--
  } else if (evt.key === 'ArrowRight' && player % cols !== cols - 1) {
    player++
  } else if (evt.key === ' ') {
    punchPos = player - cols
    punchArrayCrnt.push([punchPos])
    playerPunch()
    punched += 1
    // sound effect in here
  } else {
    console.log('INVALID  KEY')
  }
  // add player to new position
  cells[player].classList.add('player')
}

let punchArrayCrnt = []
let punched = 0
let newPunch = player - cols

function playerPunch() {
  const punchArray = punchArrayCrnt[punched]
  const punchInt = setInterval(() => {
    cells[punchArray[0]].classList.remove('punch')
    newPunch = punchArray[0] - cols
    cells[newPunch].classList.add('punch')
    punchArray.pop()
    punchArray.push(newPunch)
    for (let i = 0; i < galaga.length; i++) {
      if (punchArray.includes(galaga[i])) {
        console.log('KO')
        clearInterval(punchInt)
        cells[newPunch].classList.remove('galaga-bottom', 'punch')
        galaga.splice(i, 1)
        // add function to score
        scoreVar += 100
        document.querySelector('#score'.innerHTML = score)
        if (galaga.length === 0) {
          endGameWon()
        }
      }
    }
  }, 100)
  intervals.push(punchInt)
  setTimeout(() => {
    clearInterval(punchInt)
    setTimeout(() => {
      ceiling.forEach((i) => {
        if (cells[i].className === 'punch') {
          cells[i].classList.remove('punch')
        }
      })
    }, 30)
  }, 925)

}

// function addPunch() {
// }

// function removePunch() {
//   cells[punchPos].classList.remove('punch')
// }

// continues to minus 10 every #th of a second 
// until in finds a cell with an array in it
// if that cell has a class of galbtm top boss or mid then remove both classes
// create a punch when space bar is hit
// cells[crntPlayPos].classList.add('punch')


function addGalaga() {
  galaga.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-bottom')
  })
}

function moveGalaga() {
  galInt = setInterval(() => {
    removeGalaga()
    // enemys to not go out of end columns
    let rightCol = galaga.filter(enemy => enemy % cols === cols - 1)
    // enemys to not go out of beginning of cols
    let leftCol = galaga.filter(enemy => enemy % cols === 0)
    if (galLeftRight) {
      if (rightCol.length < 1) {
        galaga = galaga.map(enemy => enemy += 1)
      } else {
        galaga = galaga.map(enemy => enemy + cols + 1)
        galLeftRight = false
        let btmRow = galaga.filter(enemy => enemy > (cellCount - (2 * cols)))
        if (btmRow.length > 0) {
          endGameLost()
          // return
        }
      }
    }
    if (!galLeftRight) {
      if (leftCol.length < 1) {
        galaga = galaga.map(enemy => enemy = enemy - 1)
      } else {
        galaga = galaga.map(enemy => enemy + cols)
        galLeftRight = true
        let btmRow = galaga.filter(enemy => enemy >= (cellCount - (2 * cols)))
        if (btmRow.length > 0) {
          endGameLost()
          //return
        }
      }
    }
    addGalaga()
    // console.log(startGalPos)
  }, 1500)
}
// startGalBtm % cols !== cols - 1
// .some method?
// move enemys to the right
// })
// if (startGalBtm === startGalBtm % cols !== cols - 2) {
//   startGalBtm = startGalBtm.map(enemy => enemy += 1)
// } else {
// startGalMid = startGalMid.map(enemy => enemy += 1)
// startGalTop = startGalTop.map(enemy => enemy += 1)
// startGalBoss = startGalBoss.map(enemy => enemy += 1)

// if (evt.key === 'ArrowLeft' && crntPlayPos % cols !== 0) {
//   crntPlayPos--

function removeGalaga() {
  galaga.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-bottom')
  })

}

function playerDefeated() {
  console.log('player defeated')
}

// find the cells with the class of galaga
// move one index to the right
// unless the array has reached the end of the columns 
// then go down one layer
// then go left
// unless the array has reached beginnning of columns
// then move down 1 

// startGame()
// if (levelVar === 1) {
//   startGalBoss.forEach(galagals => cells[galagals].classList.add('galagal-boss'))
// }

//put 4 different rows of galaga in different starting cells
//    - once game initiates, 4 rows of galagal show at top of grid (STRETCH - 4 different levels of galagal mean different points scored: bottom, mid, top and boss)
//    - galagal move left to right then down a level then right to left then down a level then left to right
//    - galgal should not be able to move out of the grid.



//  - assign wave of galagal to top rows of grid (start in middle)

//  - setInterval - galagal move from start position, cell by cell, to right of grid (should move every 2 seconds)
//    - then all rows move down a level 
//    - then move from right to left of grid
//    - down a level 

//  - galagal should be shooting at random intervals as they are moving down the board;
//    - if a cell containing the class .player1 is hit, this should removed a life

//  - player can move left to right and use space bar to send shockwave upwards through the cells; 
//    - if a cell containing a galagal class is hit, this should remove the galagal from the board AND;
//    - it will add + 50 to player score

//  - this loops until either;
//    - galagal reach bottom of page - YOU LOSE page
function endGameLost() {
  clearTimeout(galInt)
  console.log('you lost!')
}
//    OR
//    - player has defeated all galagals - YOU WIN and show score
function endGameWon() {
  console.log('you win!')
}


//? Events
// user driven - player key events
//  - start button initiates game 
//  - assign keyboard to player moves
// spcae button firing 
document.addEventListener('keyup', movePlayer)