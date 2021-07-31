const store = new Storage;

class Move extends UI {

  
  static scoreChecker = 0;

  constructor() {
    super(UI.constructor);

    this.botRecursive = 3000;
    this.cars = ['images/car-red.png', 'images/car-black.png'];
  }
  
  changeScore() {
    // Store top score
    store.storeTopScore(this.topScore);

    // increase score
    this.scoreValue = parseInt(this.score.textContent);
    this.scoreValue++;
    this.score.textContent = this.scoreValue;
    
    // update top score
    if (parseInt(this.topScore.textContent) < this.scoreValue) {
      this.topScore.textContent = this.scoreValue;
    }

    // update speed
    this.updateSpeed()
  }

  updateSpeed() {
    if (this.speed > 1000 && Move.scoreChecker+100 == this.scoreValue) {
      Move.scoreChecker = this.scoreValue;
      this.speed -= 200;
      this.updateSpeedLines()
    }
  }

  updateSpeedLines() {
    const lines = document.querySelectorAll('.line');

    lines.forEach(line => {
      line.style.animation = `move-road ${this.speed}ms linear 0s`;
    });
  }

  createLine() {
    if (this.playStatus) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.animation = `move-road ${this.speed}ms linear 0s`;

      this.lineContainer.appendChild(line);
      
      setTimeout(() => this.removeLine(line), this.speed);

      // Recursive
      setTimeout(() => this.createLine(), this.speed / 7);
    }
  }

  removeLine(line) {
    if (this.playStatus) {
      line.remove();
    }
  }

  removeAll(className) {
    const lines = document.querySelectorAll(`.${className}`);

    lines.forEach(line => {
      setTimeout(() => line.remove(), this.speed + 500);
    });
  }

  AnimationState(state, className) {
    const lines = document.querySelectorAll(`.${className}`);

    lines.forEach(line => {
      line.style.animationPlayState = state;
    });
  }

  changeAnimationState(status, state, className1, className2) {
    this.playStatus = status;
    this.AnimationState(state, className1);

    this.AnimationState(state, className2);
  }

  //Cars
  moveCar() {
    if (this.playStatus) {
      this.car.style.left = `${event.clientX - document.body.clientWidth/2 + this.road.clientWidth/2 - this.car.clientWidth/2}px`;

      const x = this.car.style.left.split('p')[0],
      maxPos = this.road.clientWidth - this.car.clientWidth,
      minPos = this.road.clientLeft;
      
      if (x <= minPos) {
        this.car.style.left = `${minPos}px`;
      } else if (x >= maxPos - minPos) {
        this.car.style.left = `${maxPos - minPos}px`;
      } 
    }
  }

  moveCarMobile() {
    if (this.playStatus) {
      this.car.style.left = `${event.touches[0].clientX - document.body.clientWidth/2 + this.road.clientWidth/2 - this.car.clientWidth/2}px`;

      const x = this.car.style.left.split('p')[0],
      maxPos = this.road.clientWidth - this.car.clientWidth,
      minPos = this.road.clientLeft;
      
      if (x <= minPos) {
        this.car.style.left = `${minPos}px`;
      } else if (x >= maxPos - minPos) {
        this.car.style.left = `${maxPos - minPos}px`;
      } 
    }
  }

  moveCarEvent() {
    this.road.addEventListener('mousemove', e => {
      this.moveCar();
    });
    
    this.car.addEventListener('touchmove', e => {
      this.moveCarMobile();
    });
  }
  
  createBot() {
    if (this.playStatus) {
      const randCar = Move.generageNum(this.cars.length, 0),
        maxPos = this.road.clientWidth - this.car.clientWidth,
        minPos = this.road.clientLeft,
        randPlace = Move.generageNum(maxPos, minPos);
      let className = 'red';
      
      if (randCar == 1) {
        className = 'black';
      }

      const bot = document.createElement('div');
      bot.className = 'player-car bot';
      bot.innerHTML = `
        <img class="car ${className}" src="${this.cars[randCar]}" alt="main car">
      `
      bot.style.animation = `move-road ${this.speed + 500}ms linear 0s`;
      bot.style.left = `${randPlace}px`;

      this.road.appendChild(bot);

      setTimeout(() => this.removeBot(bot), this.speed + 500);

      // Recursive
      setTimeout(() => this.createBot(), this.botRecursive);
      
      if (this.botRecursive > 800) {
        this.botRecursive -= 100;
      }
    }
  }

  removeBot(bot) {
    if (this.playStatus) {
      bot.remove();
    }
  }

  gameOver(score, gameOverVar, resume, quit) {
    const bots = document.querySelectorAll('.bot');

    
    bots.forEach(bot => {
      const playerPos = this.car.getBoundingClientRect(),
      botPos = bot.getBoundingClientRect();

      if (botPos.y + bot.clientHeight >= playerPos.y) {
        if (botPos.left <= playerPos.right - 15 && botPos.right >= playerPos.left + 15 && botPos.top < playerPos.bottom - 40) {
          this.gameOverEvent(resume, quit);
          clearInterval(score);
          clearInterval(gameOverVar);
          return true;
        }
      }
    });
  }

  gameOverEvent(resume, quit) {
    move.changeAnimationState(false, 'paused', 'line', 'bot');

    this.UIgameOver();

    const playAgainBtn = document.querySelector('.play-again'),
    quitBtn = document.querySelector('.gameover-quit');

    playAgainBtn.addEventListener('click', () => {
      this.removeAll('bot');
      resume();
      this.score.textContent = 0;
    });

    quitBtn.addEventListener('click', quit);
  }

  static generageNum(max, min) {
    const num = Math.floor(Math.random() * (max - min) + min);
    return num;
  }
}