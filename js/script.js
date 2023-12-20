const gameOptions = [
  '<i class="fa-regular fa-hand-back-fist"></i>',
  '<i class="fa-regular fa-hand"></i>',
  '<i class="fa-regular fa-hand-scissors"></i>'
];
const startBtn = document.querySelector('.start-btn');
const controlBtns = document.querySelector('.control-btns');
let userScore = 0;
let pcScore = 0;

startBtn.addEventListener('click',startGame);

function startGame(){
  const userChoiceCont = document.querySelector('.game-user.user .cont-icon');
  const pcChoiceCont = document.querySelector('.game-user.pc .cont-icon');
  const choiceUser = controlBtns.querySelectorAll('button');

  innerUserName(); 
  addRemoveElements(userChoiceCont,pcChoiceCont,gameOptions);
  roundChoice(choiceUser,userChoiceCont,pcChoiceCont);
}

function innerUserName(){
  let userName = '';
  while(userName === '' || userName.length < 3){
   userName = prompt('Inserisci il tuo nome *');
  }
  const userNameCont = document.querySelector('.game-user.user .player-name h2');
  userNameCont.innerHTML = userName;

  return userName
}

function addRemoveElements(userCont,pcCont,gameOptions){
  startBtn.classList.add('d-none');
  controlBtns.classList.remove('d-none');
  userCont.innerHTML = gameOptions[0];
  pcCont.innerHTML = gameOptions[0];
}

function roundChoice(userChoice,userChoiceCont,pcChoiceCont){
  userChoice.forEach(element => {

    element.addEventListener('click',function(){
      shakeFists(userChoiceCont,pcChoiceCont);
      const userElement = this.innerHTML;
      setTimeout(function(){

        clearTimeout(shakeFists);
        userChoiceCont.innerHTML = userElement;
        pcRoundChoice(gameOptions,pcChoiceCont);
        checkWinner(userChoiceCont,pcChoiceCont);

      },1000);
    })
  });
}

function shakeFists(userChoiceCont,pcChoiceCont){
  userChoiceCont.classList.add('shake-animation');
  pcChoiceCont.classList.add('shake-animation');

  const timeShake = setTimeout(function(){
    userChoiceCont.classList.remove('shake-animation');
    pcChoiceCont.classList.remove('shake-animation');
  },1000)
  
  return timeShake
}

function pcRoundChoice(gameOptions,pcChoiceCont){
  let pcElement = gameOptions[getRandomNumber(0,gameOptions.length)];
  while(pcElement === undefined){
    pcElement = gameOptions[getRandomNumber(0,gameOptions.length)];
  }
  pcChoiceCont.innerHTML = pcElement;
  
  return pcElement
}

function checkWinner(userChoiceCont,pcChoiceCont){
  const scoreContUser = document.querySelector('.game-user.user .score-cont')
  const scoreContPc = document.querySelector('.game-user.pc .score-cont')
  const userHand = userChoiceCont.querySelector('i');
  const pcHand = pcChoiceCont.querySelector('i');

  if(
    (classContains(userHand,'fa-hand-back-fist') && classContains(pcHand,'fa-hand-scissors')) ||
    (classContains(userHand,'fa-hand') && classContains(pcHand,'fa-hand-back-fist'))||
    (classContains(userHand,'fa-hand-scissors') && classContains(pcHand,'fa-hand'))
  ){
    scoreContUser.innerHTML = ++userScore
  }else if (
    (classContains(pcHand,'fa-hand-back-fist') && classContains(userHand,'fa-hand-scissors')) ||
    (classContains(pcHand,'fa-hand') && classContains(userHand,'fa-hand-back-fist')) ||
    (classContains(pcHand,'fa-hand-scissors') && classContains(userHand,'fa-hand'))
  ) {
    scoreContPc.innerHTML = ++pcScore
  }else{
    setTimeout(function(){
      alert('Pari')
    },300)
  }
}

function getRandomNumber(min,max){
  return  Math.floor(Math.random() * (max - min + 1)) + min;
};

function classContains(el,cla){
  return el.classList.contains(cla)
}