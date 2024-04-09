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
// const gridCells = document.querySelectorAll('.grid-cell')
// const levelEl = document.querySelector('#level')
const body = document.body
const gameContainer = document.querySelector('#game-container')
const startBtn = document.querySelector('#start-button')
const startWindow = document.querySelector('#start')
const livesEl = document.querySelector('#lives')
const scoreEl = document.querySelector('#score')
const loser = document.querySelector('#loser')
const winner = document.querySelector('#winner')

//? Variables
let livesVar = 3
let scoreVar = 0
// let levelVar = 1

const cols = 10
const rows = 10
const cellCount = cols * rows
const ceiling = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

let galLeftRight = true
let galaga = [2, 3,
  10, 11, 12, 13, 14, 15,
  20, 21, 22, 23, 24, 25,
  31, 32, 33, 34]
let startGalaga = [2, 3,
  10, 11, 12, 13, 14, 15,
  20, 21, 22, 23, 24, 25,
  31, 32, 33, 34]
let player = 94
let cells = []
const intervals = []
let punchPos
// let gamePlay = false


//? sound effects
const playerHit = new Audio()
playerHit.src = 'assets/bomb-hit-player.mp3'
playerHit.volume = 0.5
const galagaHit = new Audio()
galagaHit.src = 'assets/player-hit-galaga.mp3'
galagaHit.volume = 0.5
const playerWon = new Audio()
playerWon.src = 'assets/you-win-tekken.mp3'
playerWon.volume = 0.5
const playerLose = new Audio()
playerLose.src = 'assets/ko-endGameLose.mp3'
playerLose.volume = 0.5
const punchRelease = new Audio()
punchRelease.src = 'assets/punch-release.mp3'
punchRelease.volume = 0.5
const backgroundSound = new Audio()
backgroundSound.src = 'assets/background-sound.mp3'
backgroundSound.volume = 0.2


// add a start page to the game with how to:
function startPage() {
  document.body.style.visibility = 'visible'
  startWindow.style.visibility = 'visible'
  grid.style.visibility = 'hidden'
  winner.style.visibility = 'hidden'
  loser.style.visibility = 'hidden'
  livesEl.style.visibility = 'hidden'
  scoreEl.style.visibility = 'hidden'
}
window.addEventListener('load', startPage)

function createStartGrid() {
  // Generate grid cells
  for (let idx = 0; idx < cellCount; idx++) {
    const cell = document.createElement('div')
    // cell.innerText = idx
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
    console.log(cells)
  }
}

function startGame() {
  grid.style.visibility = 'visible'
  startWindow.style.visibility = 'hidden'
  winner.style.visibility = 'hidden'
  loser.style.visibility = 'hidden'
  grid.style.position = 'absolute'
  createStartGrid()
  startGalagaMovement()
  randomBomb()
  livesEl.style.visibility = 'visible'
  scoreEl.style.visibility = 'visible'
  livesEl.innerHTML = 'lives : ' + 3
  scoreEl.innerHTML = 'score : ' + 0
  // background sound here
  backgroundSound.play()
}

function startGalagaMovement() {
  addGalaga()
  moveGalaga()
  removeGalaga()
}

function startKey(evt) {
  if (evt.key === 's') {
    grid.style.visibility = 'visible'
    startWindow.style.visibility = 'hidden'
    startGame()
  }
}

document.addEventListener('keydown', startKey)

function movePlayer(evt) {
  // remove player from current position
  cells[player].classList.remove('player')
  if (evt.key === 'ArrowLeft' && player % cols !== 0) {
    player--
  } else if (evt.key === 'ArrowRight' && player % cols !== cols - 1) {
    player++
  } else if (evt.key === ' ') {
    punchRelease.play()
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


function addGalaga() {
  galaga.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.add('galaga-bottom')
  })
}

function moveGalaga() {
  const galInt = setInterval(() => {
    removeGalaga()
    // enemys to not go out of end columns
    const rightCol = galaga.filter(enemy => enemy % cols === cols - 1)
    // enemys to not go out of beginning of cols
    const leftCol = galaga.filter(enemy => enemy % cols === 0)
    if (galLeftRight) {
      if (rightCol.length < 1) {
        galaga = galaga.map(enemy => enemy += 1)
      } else {
        galaga = galaga.map(enemy => enemy + cols + 1)
        galLeftRight = false
        const floor = galaga.filter(enemy => enemy > (cellCount - (2 * cols)))
        if (floor.length > 0) {
          endGameLost()
        }
      }
    }
    if (!galLeftRight) {
      if (leftCol.length < 1) {
        galaga = galaga.map(enemy => enemy = enemy - 1)
      } else {
        galaga = galaga.map(enemy => enemy + cols)
        galLeftRight = true
        const floor = galaga.filter(enemy => enemy >= (cellCount - (2 * cols)))
        if (floor.length > 0) {
          endGameLost()
        }
      }
    }
    addGalaga()
  }, 1000)
  intervals.push(galInt)
}

function removeGalaga() {
  galaga.forEach(idx => {
    const gridCell = cells[idx]
    gridCell.classList.remove('galaga-bottom')
  })

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
        galagaHit.play()
        console.log('KO')
        cells[newPunch].classList.remove('galaga-bottom', 'punch')
        galaga.splice(i, 1)
        clearInterval(punchInt)
        // add function to score
        scoreVar += 100
        updateScore()
        console.log('addScore')
        if (galaga.length === 0) {
          endGameWon()
        }
      }
      // if (punchArray.includes(newBomb[i])) {
      //   // sound effect for punch hitting bomb
      //   console.log('bomb hit')
      //   // remove class of bomb from newBomb array
      //   cells[newPunch].classList.remove('newBomb', 'punch')
      //   newBomb.splice(i, 1)
      //   clearInterval(punchInt)
      //   scoreVar += 50
      //   updateScore()
      // }
    }
  }, 200)
  intervals.push(punchInt)
  setTimeout(() => {
    clearInterval(punchInt)
    setTimeout(() => {
      ceiling.forEach((i) => {
        if (cells[i].className === 'punch') {
          cells[i].classList.remove('punch')
        }
      })
    }, 120)
  }, 3600)

}

function updateScore() {
  scoreEl.innerHTML = `score: ${scoreVar}`
}

function loseLife() {
  if (livesVar === 3) {
    livesVar -= 1
    livesEl.innerHTML = `lives: ${livesVar}`
  } else if (livesVar === 2) {
    livesVar -= 1
    livesEl.innerHTML = `lives: ${livesVar}`
  } else if (livesVar === 1) {
    livesVar -= 1
    livesEl.innerHTML = `lives: ${livesVar}`
    endGameLost()
  }
}


const bombArrayCrnt = []
let bombed = 0
let newBomb

function dropBombs() {
  const bombArray = bombArrayCrnt[bombed]
  const bombInt = setInterval(() => {
    if (livesVar === 0) {
      endGameLost()
    } else if (galaga.length === 0) {
      clearInterval(bombInt)
      endGameWon()
    }
    cells[bombArray[0]].classList.remove('galaga-bomb')
    newBomb = bombArray[0] + cols
    cells[newBomb].classList.add('galaga-bomb')
    bombArray.pop()
    bombArray.push(newBomb)
    if (cells[bombArray].classList.contains('player')) {
      playerHit.play()
      loseLife()
    }
    if (newBomb >= 89) {
      clearInterval(bombInt)
      setTimeout(() => {
        cells[bombArray].classList.remove('galaga-bomb')
      }, 300)
    }
  }, 800)
  intervals.push(bombInt)
}


let randomBombs

function randomBomb() {
  const randomBombInt = setInterval(() => {
    randomBombs = galaga[Math.floor(Math.random() * galaga.length)]
    defineBombs()
  }, 1000)
  intervals.push(randomBombInt)
  if (galaga.length === 0) {
    clearInterval(randomBombInt)
    console.log('hello')
  }
}

function defineBombs() {
  cells[randomBombs + cols].classList.add('galaga-bomb')
  bombArrayCrnt.push([randomBombs += cols])
  dropBombs()
  bombed += 1
}


//? Events
// document.addEventListener(startBtn)

document.addEventListener('keyup', movePlayer)

function endGameLost() {
  // clear all intervals
  // hide grid and show reset or next level button
  grid.style.visibility = 'hidden'
  loser.style.visibility = 'visible'
  backgroundSound.pause()
  playerLose.play()
  console.log(intervals)
  resetGame()
}
//    - player has defeated all galagals - YOU WIN and show score
function endGameWon() {
  grid.style.visibility = 'hidden'
  winner.style.visibility = 'visible'
  const finalScore = document.getElementsByClassName('final-score')
  console.log(finalScore)
  finalScore.innerHTML = `${scoreVar}`
  backgroundSound.pause()
  playerWon.play()
  // hide grid and show YOU WON! page 
  resetGame()
}

function resetGame(evt) {
  console.log(evt)
  if (evt.key === 'r') {
    intervals.map(interval => clearInterval(interval))
    cells = []
    galaga = startGalaga
    grid.innerHTML = ''
    startGame()
  }
}
window.addEventListener('keyup', resetGame)

