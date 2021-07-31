// Variables
const move = new Move, ui = new UI, storage = new Storage;

document.addEventListener('DOMContentLoaded', () => storage.removeHistory());

// Start Game
const startGame = () => {
  ui.begin();
  move.playStatus = true;
  
  move.createLine();
  if (localStorage.getItem('playedBefore') == null) {
    //Move Car
    move.moveCarEvent();
  }

  ui.gameOverVar = setInterval(() => move.gameOver(ui.changeScoreVar, ui.gameOverVar, resumeGame, quitGame), 10);

  //Create Bot
  setTimeout(() => move.createBot(), 3000);
  
  ui.changeScoreVar = setInterval(() => move.changeScore(), 100);
}

ui.startBtn.addEventListener('click', startGame);

//Pause Callback Fn
const pauseCallback = () => {
  //pause
  pauseGame();

  //resume
  callResumeGame();

  //Quit
  callQuitGame();
}

// Pause Game
const pauseGame = () => {
  ui.pause();

  move.changeAnimationState(false, 'paused', 'line', 'bot');

  clearInterval(ui.changeScoreVar);
  clearInterval(ui.gameOverVar);
}

ui.pauseBtn.addEventListener('click', pauseCallback);

// Resume Game
const resumeGame = () => {
  ui.resumeWait();
  setTimeout(() => {
    ui.resume();
  
    move.changeAnimationState(true, 'running', 'line', 'bot');
    move.createLine();
    move.removeAll('line');
    
    move.removeAll('bot');
    move.createBot();

    ui.changeScoreVar = setInterval(() => move.changeScore(), 100);
    ui.gameOverVar = setInterval(() => move.gameOver(ui.changeScoreVar, ui.gameOverVar, resumeGame, quitGame), 10);
  }, ui.resumeTimeout);
}

const callResumeGame = () => {
  const resumeBtn = document.querySelector('.resume');
  
  resumeBtn.addEventListener('click', resumeGame);
}

// Quit Game
const quitGame = () => {
  ui.quit();
  storage.playedBefore();

  move.playStatus = false;
  move.removeAll('line');
  move.AnimationState('running', 'line');
  
  move.botRecursive = 3000;
  move.removeAll('bot');
  move.AnimationState('running', 'bot');

  clearInterval(ui.changeScoreVar);
  clearInterval(ui.gameOverVar);
}

const callQuitGame = () => {
  const quitBtn = document.querySelector('.quit');

  quitBtn.addEventListener('click', quitGame);
}