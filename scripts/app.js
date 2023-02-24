

function init() {

  // ! Elements
  const startBtn = document.querySelector('#start')
  // Generating the grid
  const grid = document.querySelector('.grid')
  const livesDisplay = document.querySelector('#lives-display')
  const lilipad = document.querySelector('.lilipad')
  const river = document.querySelector('.river')
  const audio = document.querySelector('audio')

  // Variables

  const startingPosition = 76
  let frogPosition = startingPosition
  const cells = []
  const cars = ['c1', 'c2', 'c3'] //! //! //! //!
  const Lorry = ['lorry1', 'lorry2']
  //const roadLayout = ['road']


  let pos = 0 //Index counter 

  let lives = 3
  let position
  //let timer

  const width = 9
  const cellCount = width * width
  let m = ((width - 2) * width)  // starting position of Cars- Obstacles
  console.log(m)

  // ! Executions
  // Create Grid
  function createGrid() {
    // iterating through the cells
    for (let i = 0; i < cellCount; i++) {
      // Create div cell
      const cell = document.createElement('div')

      // Data attribute representing the index
      cell.dataset.index = i

      // Append to grid
      grid.appendChild(cell)

      // Push cell into cells array
      cells.push(cell)
    }
   
    addFrog(startingPosition)
    // moveCars() //! working function
    // moveCarsFaster()
    // moveLorries()
    // layout()

  }
  // layout to prodouce river, lilypads , bushes and home for frogger ( intended goal to win )
  function layout() {
    for (let g = width ; g < width * 3; g++){
      cells[g].classList.add('river')
    }
    for (let k = width - 1 ; k < width * 3; k++ ){
      cells[k + 1].classList.add('lilypad')
      if (k % 2 !== 0 ){
        k += 2
      }
    }
    for (let l = 1 ; l < width ; l += 2){
      cells[l].classList.add('home')
    }
    for (let j = 0 ; j < width ; j += 2){
      cells[j].classList.add('bushes')
    }
  }
  //moving the lilipads across the river
  function movingLilipads(){
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('lilypad')){
        cells[i].classList.remove('lilypad')
        cells[i].classList.add('river')
      } else if (cells[i].classList.contains('river')){
        cells[i].classList.remove('river')
        cells[i].classList.add('lilypad')
      }
    }
  }

  function reset() {
    // ! Cleanup in case a previous interval is running
    // Clear timer interval
    clearInterval(moveCars)
    clearInterval(moveCarsFaster)
    clearInterval(moveLorries)
    cells[frogPosition].classList.add('froggerDies')
    
  }

  function addFrog(position) {
    cells[position].classList.add('frog')

  }

  function removeFrog() {
    cells[frogPosition].classList.remove('frog')
  }

  //Frogger moving

  function moveFrog(e) {
    const right = 39
    const left = 37
    const up = 38
    const down = 40

    removeFrog()
    if (e.keyCode === right && frogPosition % width !== width - 1) {
      frogPosition++ // moving frogger to the right
    } else if (e.keyCode === left && frogPosition % width !== 0) {
      frogPosition-- // moving frogger to the left
    } else if (e.keyCode === up && frogPosition >= width) {
      frogPosition -= width // moving frogger upwards
    } else if (e.keyCode === down && frogPosition + width < cellCount) {
      frogPosition += width // moving frogger downwards
    }
    // Updating frogger's position
    addFrog(frogPosition)

  }

  //Moving cars
  function moveCars() { //! working function
    let a = m
    let n = m - 10
    const timer = setInterval(() => {
      cells[a].classList.add(cars[pos])

      cells[n].classList.add(cars[pos + 1])

      const timeout = setTimeout(() => {
        cells[a].classList.remove(cars[pos])
        if (a % width === width - 1) {
          a = a - width
          //clearInterval(timer)
        }
        a++
        cells[n].classList.remove(cars[pos + 1])
        if (n % width === 0) {
          n = n + width
          //clearInterval(timer)
        }
        n--
      }, 290)
    }, 300)
    
  }
  
  // Adding a faster car moving in the opposite direction
  function moveCarsFaster() {

    let a = m - 9
    const timer1 = setInterval(() => {
      cells[a].classList.add(cars[pos + 2])
      const timeout1 = setTimeout(() => {
        cells[a].classList.remove(cars[pos + 2])
        if ((a) % width === width - 1) {
          a = a - width
        }
        a++
      }, 100)
    }, 110)

  }
  // Adding moving Lorries
  function moveLorries() { //! 
    let a = m - 31 //!begining of the previous function 
    let n = m - 20
    const timer = setInterval(() => {
      cells[a].classList.add(Lorry[pos + 1])

      cells[n].classList.add(Lorry[pos])
      const timeout = setTimeout(() => {
        cells[a].classList.remove(Lorry[pos + 1])
        if (a % width === width - 1) {
          a = a - width
          
        }
        a++
        cells[n].classList.remove(Lorry[pos])
        if (n % width === 0) {
          n = n + width
          //clearInterval(timer)
        }
        n--
      }, 150)
    }, 160)
  
  }

  function collisionChecker() {
    
    const checker = cells[frogPosition].classList
  
    //requestAnimationFrame(collisionChecker)
    //comparing frogger's position with obstacles to check for collision
    if (
      checker.contains('c1') ||
      checker.contains('c2') ||
      checker.contains('c3') ||
      checker.contains('lorry1') ||
      checker.contains('lorry2') ||
      checker.contains('river') ||
      checker.contains('bushes')
    ) {
      //update lives remaining
      audio.src = './assets/sound-frogger-squash.wav'
      audio.play()
      lives--
      livesDisplay.innerHTML = lives ? '❤️'.repeat(lives) : '❤️'
    }
    if (lives === 0) {
      livesDisplay.innerHTML = '💔'
      checker.add('froggerDies')
    }
    if (checker.contains('home')) {
      alert('YOU WON ')
 
    }
  }
  
  
  //function endGame(){
  // alert('YOU LOST')
  // clearInterval(timer)
  // }
  function music(){
    audio.src = './assets/arcade.wav' 
    audio.play()
  }
  function gameIsOn(){
    moveCars()
    moveCarsFaster()
    moveLorries()
    const timer = setInterval(collisionChecker, 200) 
    const timer1 = setInterval(movingLilipads, 1300)
    const timer2 = setInterval(music, 5000)
    layout()
    if (lives === 0) {
      clearInterval(timer)
      clearInterval(timer1)
      //clearInterval(timer2)
     
    }
  }
  // ! Events
  //let gameMode = true 
  //Grid
  createGrid()
  // if (gameMode === true) {
  //   gameIsOn()
  // }
  //startbutton 

  document.addEventListener('keydown', moveFrog)
  startBtn.addEventListener('click',    gameIsOn)
}
window.addEventListener('DOMContentLoaded', init)