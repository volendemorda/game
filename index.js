const $start = document.getElementById('start')
const $game = document.querySelector('#game') 
const $time = document.querySelector('#time')
const $resultHeader = document.querySelector('#result-header')
const $timeHeader = document.querySelector('#time-header')
let $resultScore = document.querySelector('#result')
const $gameTime = document.querySelector('#game-time')

let isGameStart = false
let scope = 0
//event
$start.addEventListener('click',startGame)
$game.addEventListener('click',clickHandlerBox)

//show hide
function show($element){
  $element.classList.remove('hide')
}
function hide($element){
  $element.classList.add('hide')
}


function startGame(){
  scope = 0
  setGameTime()
  $gameTime.setAttribute('disabled','true')
  
  isGameStart = true
  hide($start)
  $game.style.backgroundColor = '#fff'

 let interval = setInterval(() => {
    let time = $time.textContent
    if (time <= 0){
      clearInterval(interval)
      isGameEnd()
    }
    else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100);
  renderBox()
}
  $gameTime.addEventListener('change',setGameTime)
function setGameTime(){
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}
function setGameScore(){
  $resultScore.textContent = scope.toString()
}
function isGameEnd(){
  isGameStart = false
  setGameScore()
  $gameTime.removeAttribute('disabled','false')
  $game.innerHTML = ''
  show($start)
  $game.style.background = '#ccc'
  hide($timeHeader)
  show($resultHeader)
}

function clickHandlerBox(event){
  if (!isGameStart){
    return
  }
  if (event.target.dataset.box){
    scope++
    renderBox()
    
  }
}
function renderBox(){
  let box = document.createElement('div')
  let rnd = getRandom(30,100)
  let gameSize = $game.getBoundingClientRect()
  let maxTop = gameSize.width - rnd
  let maxleft = gameSize.height - rnd
  $game.innerHTML = ''
  box.style.height = rnd + 'px'
  box.style.width = '50px'
  box.style.position = 'absolute'
  box.style.background = getRandomColor()
  box.style.cursor = 'pointer'
  box.style.left = getRandom(0,maxleft) + 'px'
  box.style.top = getRandom(0,maxTop) + 'px'
  box.setAttribute('data-box','true')
  $game.insertAdjacentElement('afterbegin',box)
}

function getRandom(min,max){
  return Math.floor(Math.random() * (max - min) + min)
}
function getRandomColor(){
  return '#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase()
}