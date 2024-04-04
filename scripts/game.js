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
//    - generate game-grid
//    - once game initiates, 4 rows of galagal show at top of grid (STRETCH - 4 different levels of galagal mean different points scored: bottom, mid, top and boss)
//    - galagal move left to right then down a level then right to left then down a level then left to right
//    - galgal should not be able to move out of the grid.
//    - player should be able to move left or right and use the space bar to shoot shockwaves at galagal [STRETCH - PLAYER PUNCHING sound effect]
//    - if players shockwave hits galagal the galagal should be removed from the game and score should be added [STRETCH - TKO sound effect]
//    - galgals shoot randomly down [STRETCH - SHOOTING sound effect]
//    - if a shot fired by galgal hits player; deduct a life from player. 
//    - if player shoots a galgal and it is the final galagal left on grid then GAME OVER and relevant score should appear on screen [FINAL SCORE sound effect]
//    - if players lives drop below 1 then the player has lost the game - there should be a game over screen that appears [STRETCH - GAME OVER sound effect]


//? Elements
// Things I need to target;
//  - generate game-grid
const grid = document.querySelector('#game-grid')
//  - start button on start page (stretch goal), have added 
const startBtn = document.querySelector('#start')
//  - cells
// const cells = document.querySelectorAll('.grid-cell')
//  - scoreEl
const scoreEl = document.querySelector('#score')
//  - levelEl
const levelEl = document.querySelector('#level')
//  - livesEl
const livesEl = document.querySelector('#lives')
//  - reset button
const resetBtn = document.querySelector('#reset')


//? Variables
// Single source of truth;
//  - livesVar
let livesVar = 3
//  - scoreVar
let scoreVar = 0
//  - levelVar
let levelVar = 1
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
let crntGalPos = startGalBoss

//? On page load

// what happends when game is reset
//  - lives reset to 3
//  - score resets to 0
//  - level resets to 1

//? Execution

function createGrid() {
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
createGrid()


function handleKeyUp(evt) {
  // remove player from current position
  cells[crntPlayPos].classList.remove('player')
  if (evt.key === 'ArrowLeft' && crntPlayPos % cols !== 0) {
    crntPlayPos--
  } else if (evt.key === 'ArrowRight' && crntPlayPos % cols !== cols - 1) {
    crntPlayPos++
  } else if (evt.key === ' ') {
    // create a punch when space bar is hit
    // cells[crntPlayPos].classList.add('punch')
    console.log(punch)
  } else {
    console.log('INVALID  KEY')
  }
  // add player to new position
  cells[crntPlayPos].classList.add('player')
}



function startGame() {
  setInterval(() => {
    addEnemies()
    enemyMovement()

  }, 1500)
}

function addEnemies() {
  console.log('addEnemies')
  // get start index of each enemy
  // find cell with that index
  // add a galagal class to that cell
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

function enemyMovement() {
  console.log('enemyMovement')
  // find the cells with the class of galagal
  
  // move one index to the right
  // unless the array has reached the end of the columns 
  // then go down one layer
  // then go left
  // unless the array has reached beginnning of columns
  //then move down 1 
}

startGame()

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
//    OR
//    - player has defeated all galagals - YOU WIN and show score

//? Events
// user driven - player key events
//  - start button initiates game 
//  - assign keyboard to player moves
// spcae button firing 
document.addEventListener('keyup', handleKeyUp)

