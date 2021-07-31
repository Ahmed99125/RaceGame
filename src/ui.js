class UI {
  constructor() {
    this.startScreen = document.querySelector('.start');
    this.road = document.querySelector('.game-container');
    this.lineContainer = document.querySelector('.line-container');
    this.car = document.querySelector('.player-car');
    this.score = document.querySelector('#score');
    this.topScore = document.querySelector('#top-score');

    this.startBtn = document.querySelector('.start-game');
    this.pauseBtn = document.querySelector('.pause');

    this.speed = 3000;
    this.playStatus = true;
    this.resumeTimeout = 4000;

    this.changeScoreVar = null;
    this.gameOverVar = null;
  }

  begin() {
    this.startScreen.style.display = 'none';
    this.road.style.display = 'flex';
    
    this.score.textContent = 0;
  }

  pause() {
    const container = document.createElement('div'),
    modal = document.createElement('div');
    container.className = 'modal-container';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-score-container cur-score">
        <h1>Your Score</h1>
        <h3 class="modal-score">${this.score.textContent}</h3>
      </div>
      <div class="modal-score-container">
        <h1>Top Score</h1>
        <h3 class="modal-score">${this.topScore.textContent}</h3>
      </div>
      <button class="resume">Resume</button>
      <button class="quit">Quit</button>
    `
    
    container.appendChild(modal);
    document.body.appendChild(container);
  }

  resume() {
    const modal = document.querySelector('.modal-container');
    modal.remove();
  }

  resumeWait() {
    const modal = document.querySelector('.modal-container');
    const modalBox = document.querySelector('.modal');

    modalBox.remove();

    const text = document.createElement('h1');
    text.className = 'wait-text';

    let i = this.resumeTimeout/1000, count;

    count = setInterval(() => {
      if (i > 0) {
        text.textContent = i - 1;
        modal.appendChild(text);
        i--;
      } else {
        clearInterval(count);
      }
    }, 1000);
  }

  quit() {
    this.resume();

    this.startScreen.style.display = 'block';
    this.road.style.display = 'none';
    
    this.score.textContent = 0;
  }

  UIgameOver() {
    const container = document.createElement('div'),
    modal = document.createElement('div');
    container.className = 'modal-container';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-score-container">
        <h1 class="game-over">Game Over</h1>
      </div>
      <div class="modal-score-container">
        <h1 class="gameover-score">Your Score</h1>
        <h3 class="modal-score">${this.score.textContent}</h3>
      </div>

      <button class="play-again">Play Again</button>
      <button class="gameover-quit">Quit</button>
    `
    
    container.appendChild(modal);
    document.body.appendChild(container);
  }

  // gameOverQuit() {
  //   const quit = document.querySelector('.gameover-quit');

  //   quit.addEventListener('click', this.quit);
  // }
}