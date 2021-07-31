// const road = document.querySelector('.game-container'),
// splitRoad = document.querySelector('.split-road'),
// startBtn = document.querySelector('.start-game'),
// startScreen = document.querySelector('.start'),
// pauseBtn = document.querySelector('.pause'),
// topElement = document.querySelector('#top-score'),
// score = document.querySelector('#score'),
// lastScore = JSON.parse(localStorage.getItem('topScore')),
// player = document.querySelector('.player-car');
// let playStatus = true, topScore = lastScore, speed = 3000, prevScore = 0;

// const changeScore = () => {
//   setInterval(() => {
//     if (playStatus == true) {
//       let scoreValue = parseInt(score.textContent);
//       scoreValue++;
//       if (scoreValue > topScore) {
//         topScore = scoreValue;
//       }
//       score.textContent = scoreValue;
//       topElement.textContent = topScore;

//       if (speed > 1000) {
//         if (scoreValue == prevScore + 100) {
//           speed -= 200;
//           prevScore = scoreValue;
//         } 
//       }
//       storeTopScore();
//     }
//   }, 100);
// }

// const storeTopScore = () => {
//   if (localStorage.getItem('topScore') == null) {
//     localStorage.setItem('topScore', JSON.stringify(topScore));
//   } else if (lastScore < topScore) {
//     localStorage.setItem('topScore', JSON.stringify(topScore));
//   }
// }

// const createSplit = () => {
//   if (playStatus == true) {
//     let split;
//     setInterval(() => {
//       split = document.createElement('div');
//       split.className = 'split';
//       split.style.animation = `move-road ${speed}ms linear 0s`
//       splitRoad.appendChild(split);
//     }, speed / 7);

//     removeSplit(split);
//   }
// }

// const removeSplit = split => {
//     setInterval(() => {
//       if (split.style.top >= `${100}%`) {
//         split.remove();
//         console.log('done');
//       }
//     }, 100);
// }

// const startGame = () => {
//   playStatus = true;
//   score.textContent = 0;
//   startScreen.style.display = 'none';
//   road.style.display = 'flex';
//   createBots();
// }

// document.addEventListener('DOMContentLoaded', changeScore);

// startBtn.addEventListener('click', () => {
//   startGame();
//   createSplit();
// });

// const pauseGame = () => {
//   playStatus = false;
//   createPauseModal();
//   pauseAnimation()
// }

// const pauseAnimation = () => {
//   const splits = document.querySelectorAll('.split');
//   splits.forEach(split => {
//     split.style.animationPlayState = 'paused';
//   });
//   const bots = document.querySelectorAll('.bot');
//   bots.forEach(bot => {
//     bot.style.animationPlayState = 'paused';
//   });
// }

// const createPauseModal = () => {
//   const container = document.createElement('div');
//   const div = document.createElement('div');
//   const body = document.body;
//   container.className = 'pause-container';
//   div.className = 'pause-modal';
//   div.innerHTML = `
//     <div class="modal-score-container">
//       <h1>Your Score</h1>
//       <h3 class="modal-score">${score.textContent}</h3>
//     </div>
//     <div class="modal-score-container">
//       <h1>Top Score</h1>
//       <h3 class="modal-score">${lastScore}</h3>
//     </div>
//     <button class="resume">Resume</button>
//     <button class="quit">Quit</button>
//   `
//   container.appendChild(div);
//   body.appendChild(container);
// }

// const removePauseModal = () => {
//   document.querySelector('.pause-container').remove();
// }

// pauseBtn.addEventListener('click', e => {
//   if (e.target.classList.contains('fa-pause')) {
//     pauseGame();
//     const resumeBtn = document.querySelector('.resume'),
//     quitBtn = document.querySelector('.quit');
    
//     resumeBtn.addEventListener('click', resumeGame);
//     quitBtn.addEventListener('click', quitGame);
//   }
// });

// const resumeAnimation = () => {
//   const splits = document.querySelectorAll('.split');
//   splits.forEach(split => {
//     split.style.animationPlayState = 'running';
//   });
//   createSplit();
//   const bots = document.querySelectorAll('.bot');
//   bots.forEach(bot => {
//     bot.style.animationPlayState = 'running';
//   });

// }

// const resumeGame = () => {
//   playStatus = true;
//   removePauseModal()
//   resumeAnimation();
// }

// const quitGame = () => {
//   removePauseModal()
//   startScreen.style.display = 'block';
//   road.style.display = 'none';
//   playStatus = false;
// }

// const moveCar = () => {
//   player.style.left = `${event.clientX - (road.clientWidth/2) + (player.clientWidth/2) + (player.clientWidth/3)}px`;
//   const Arr = player.style.left.split('p');
//   if (Arr[0] > 500) {
//     player.style.left = `${500}px`;
//   } else if (Arr[0] < 7) {
//     player.style.left = `${7}px`;
//   }
// }

// road.addEventListener('mousemove', e => {
//   moveCar();
// });

// player.addEventListener('touchmove', e => {
//   moveCar();
// });

// const createBots = () => {
//   let genBots;
  
//   const cars = ['images/car-red.png', 'images/car-black.png'];
//   const imgContainer = document.createElement('div');
  
//     genBots = setInterval(() => {
//       if (playStatus == true) {
//         const carNum = generageNum(2, 0);
//         const carPlace = generageNum(510, 0);
//         imgContainer.className = 'player-car bot';
//         imgContainer.innerHTML = `
//           <img class="car" src="${cars[carNum]}" alt="main car">
//         `
//         imgContainer.style.animation = `move-road ${speed-500}ms linear 0s`;
//         imgContainer.style.left = `${carPlace}px`;
//         road.appendChild(imgContainer);
//       }
//     }, speed - 500);
//   removeBots(imgContainer);
// }

// const removeBots = imgContainer => {
//   setInterval(() => {
//     if (imgContainer.style.top >= `${100}%`) {
//       imgContainer.remove();
//     }
//   }, speed - 500);
// }

// const generageNum = (max, min) => {
//   const num = Math.floor(Math.random() * (max - min) + min);
//   return num;
// }

// // const ifGameOver = bot => {
// //   setInterval(() => {
// //     if (playStatus == true) {
// //       const playerRect = player.getBoundingClientRect();
// //       const botRect = bot.getBoundingClientRect();
// //       if (playerRect.top == botRect.bottom) {
// //         console.log('hello');
// //       }
// //     }
// //   }, .001);
// // }