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
// Things I need to target;
//  - generate game-grid
const grid = document.querySelector('#game-grid')
//  - start button on start page (stretch goal), have added 
const startBtn = document.querySelector('#start')
//  - cells
const GridCells = document.querySelectorAll('.grid-cell')
//  - scoreEl
const scoreEl = document.querySelector('#score')
//  - levelEl
const levelEl = document.querySelector('#level')
//  - livesEl
const livesEl = document.querySelector('#lives')
//  - reset button
const resetBtn = document.querySelector('#reset')
// background image of html


//? Variables
// Single source of truth;
//  - livesVar
let livesVar = 3
//  - scoreVar
let scoreVar = 0
//  - levelVar
let levelVar = 1
//  - interval for galaga movement
let galInt = 1500
// - GalMovement 
let galLeftRight = true
//  - current galagal position - array of divs with a class of galagal

//  - current shock position
let crtShkPos = 0
// Generate Game Board
const cols = 10
const rows = 10
const cellCount = cols * rows

//  - starting position of player
const startPlayPos = 90
let crntPlayPos = startPlayPos
const cells = []

//  - array of starting  position of galagals
let startGalBoss = [2, 3]
let startGalTop = [10, 11, 12, 13, 14, 15]
let startGalMid = [20, 21, 22, 23, 24, 25]
let startGalBtm = [31, 32, 33, 34]
// const crntGalPos = startGalBoss.concat(startGalTop, startGalMid, startGalBtm)


//? On page load

// what happends when game is reset
//  - lives reset to 3
//  - score resets to 0
//  - level resets to 1

//? Execution

// function startGame() {
  //   createGame()
  // }
  
  // function createGame() {
    //   createStartGrid()
    //   movePlayer()
//   addGalaga()
// }

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
    if (idx === startPlayPos) {
      cell.classList.add('player')
    }
    // add to the UI
    grid.append(cell)
    // add the cell to the cells array
    cells.push(cell)
  }
}
createStartGrid()


function movePlayer(evt) {
  // remove player from current position
  cells[crntPlayPos].classList.remove('player')
  if (evt.key === 'ArrowLeft' && crntPlayPos % cols !== 0) {
    crntPlayPos--
  } else if (evt.key === 'ArrowRight' && crntPlayPos % cols !== cols - 1) {
    crntPlayPos++
  } else if (evt.key === ' ') {
    punch()
    // create a punch when space bar is hit
    // cells[crntPlayPos].classList.add('punch')
    console.log(punch)
  } else {
    console.log('INVALID  KEY')
  }
  // add player to new position
  cells[crntPlayPos].classList.add('player')
}

function punch() {
  // when space bar is clicked
  //add the class .punch to the cell that is - 10 from current player position
  // continues to minus 10 every #th of a second 
  // until in finds a cell with an array in it
  // if that cell has a class of galbtm top boss or mid then remove both classes.
  
  
}


function startGalagaMovement() {
  removeGalaga()
  moveGalaga()
  addGalaga()
  
}
startGalagaMovement()

function addGalaga() {
  // get start index of each enemy
  // find cell with that index
  // add a galaga class to that cell
  startGalBtm.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-bottom')
  })
  startGalMid.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-mid')
  })
  startGalTop.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-top')
  })
  startGalBoss.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-boss')
  })
}
let crntGalPos = startGalBoss.concat(startGalTop, startGalMid, startGalBtm)


// addEnemies()
function moveGalaga() {
  galInt = setInterval(() => {
    console.log(crntGalPos)
    // removeGalaga()
    // enemys to not go out of end columns
    let rightCol = crntGalPos.filter(enemy => enemy % cols === cols - 1)
    // enemys to not go out of beginning of cols
    let leftCol = crntGalPos.filter(enemy => enemy % cols === 0)

    if (galLeftRight) {
      if (rightCol.length < 1) {
        crntGalPos = crntGalPos.map(enemy => enemy += 1)
      } else {
        crntGalPos = crntGalPos.map(enemy => enemy + cols + 1)
        galLeftRight = false
        let btmRow = crntGalPos.filter(enemy => enemy > (cellCount - (1 * cols)))
        if (btmRow.length > 0) {
          endGame()
          return
        }
      }
    }
    if (!galLeftRight) {
      if (leftCol.length < 1) {
        crntGalPos = crntGalPos.map(enemy => enemy = enemy - 1)
      } else {
        crntGalPos = crntGalPos.map(enemy => enemy + cols)
        GalLeftRight = true
        let btmRow = crntGalPos.filter(enemy => enemy >= (cellCount - (1 * cols)))
        if (btmRow.length > 0) {
          endGame()
          return
        }
      }
    }
    // addGalaga()
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
  startGalBtm.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-bottom')
  })
  startGalMid.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-mid')
  })
  startGalTop.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-top')
  })
  startGalBoss.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-boss')
  })
}

function playerDefeated() {
  console.log('player defeated')
}
// if (gridCell.matches('.galaga-boss .galaga-top .galaga-mid .galaga-btm')) {
// }

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
//     if ()
//   }

//   )
// }


// Functions
// 4 rows of galagal show at top of grid which starts when start button is clicked

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
function endGame() {
  clearTimeout(galInt)
}
//    OR
//    - player has defeated all galagals - YOU WIN and show score

//? Events
// user driven - player key events
//  - start button initiates game 
//  - assign keyboard to player moves
// spcae button firing 
document.addEventListener('keyup', movePlayer)


