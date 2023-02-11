    document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const timerBlock = document.querySelector('.timer');
    timerBlock.textContent = '100';
    const retryBtn = document.querySelector('.retry__btn');

    /* Cоздаем объект с изображениями
let cardList = [
{"name": 'img1', "img_src": 'img/cards_img/1_card.jpg'},
{"name": 'img2', "img_src": 'img/cards_img/2_card.jpg'},
{"name": 'img3', "img_src": 'img/cards_img/3_card.jpg'},
{"name": 'img4', "img_src": 'img/cards_img/4_card.jpg'},
{"name": 'img5', "img_src": 'img/cards_img/5_card.jpg'},
{"name": 'img6', "img_src": 'img/cards_img/6_card.jpg'},
{"name": 'img7', "img_src": 'img/cards_img/7_card.jpg'},
{"name": 'img8', "img_src": 'img/cards_img/8_card.jpg'},
]; 
*/

          let array = [];
          for (i = 1; i < 9; i++) {
            array.push(i);
          }
          let array1 = [];

          for (i = 1; i <= array.length; i++) {
            array1.push(i);
            array1.push(i);
          } 

          array1 = array1.sort(() => Math.random() - 0.5)
          console.log(array1)
            
          let hasFlippedCard = false;
          let fildLocked = false;
          let firstCard;
          let secondCard;
          let matchPoints = 0;
          let allMatches = 8;
          let flag = false;
  
    let storageSize = JSON.parse(localStorage.getItem('size'));
    if (storageSize === null || storageSize === '0') {
      array = array1;
    }
  
    function shuffle(array) {
  
      if (storageSize === '1') {
        array = array2;
        allMatches = 16;
        timerBlock.textContent = '100';
      } 
  
      for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
          }
  }
      shuffle(array);
  
    const createGameTable = () => {
      for (let i = 0; i < array.length; ++i) {
          let card = document.createElement('div');
          card.classList.add('card__item');
          card.classList.add('hidden');
          card.textContent = array[i];
          container.appendChild(card);
      }
  }
      createGameTable();
  
  
      const fildReset = () => {
      [hasFlippedCard, fildLocked] = [false, false];
      [firstCard, secondCard] = [null, null];
      }
  
    const openCard = event => {
          initialTimer();
          flag = true;
          if (fildLocked) return;
          const activeCard = event.target
          // console.log(activeCard);
  
          if (activeCard === firstCard) return;
          activeCard.classList.remove('hidden');
  
          if (!hasFlippedCard) {
          hasFlippedCard = true;
          firstCard = activeCard;
      } else {
          hasFlippedCard = false;
          secondCard = activeCard;
              checkingMatching();
          }
      }
  
      let count;
      const initialTimer = () => {
          if (flag === true) return;
          clearInterval(timer);
          count = timerBlock.textContent;
          timer = setInterval(() => {
          count = count--;
          timerBlock.textContent = count--;
              if (count === 0) {
                  disableAllCards();
              clearInterval(timer);
              timerBlock.textContent = 'Проигрыш!';
              setTimeout(() => {
                  }, 300);
              }
              if (matchPoints === allMatches) {
                timerBlock.textContent = 'Победа!'
                timerBlock.style.color = 'red';
                  return;
              }
          }, 1000);
      }
  
      const checkingMatching = () => {
          if (firstCard.innerHTML === secondCard.innerHTML) {
              matchPoints += 1;
              if (matchPoints === allMatches) {
                  setTimeout(() => {
                  }, 300);
              }
              disableCards();
      } else {
          unflipCards();
      }
      }
  
      const disableAllCards = () => {
          let cards = document.querySelectorAll('.card__item');
          cards.forEach(card => {
              card.removeEventListener('click', openCard);
          })
  }
  
  const disableCards = () => {
      firstCard.removeEventListener('click', openCard);
      secondCard.removeEventListener('click', openCard);
  }
  
  const unflipCards = () => {
      fildLocked = true;
          setTimeout(() => {
              firstCard.classList.add('hidden');
              secondCard.classList.add('hidden');
              fildReset();
          }, 600);
  }
  
      const createGamingProcess = () => {
          let cards = document.querySelectorAll('.card__item');
          cards.forEach(card => {
              card.addEventListener('click', openCard);
          })
        retryBtn.addEventListener('click', () => {
              window.location.reload();
        })
      }
      createGamingProcess();

      // Cursor
      const siteCursor = document.querySelector('.site-wide');

      document.addEventListener('mouseenter', () => {
        siteCursor.style.display = 'block';
      });

      document.addEventListener('mouseleave', () => {
        siteCursor.style.display = 'none';
      });

      document.addEventListener('mousemove', function trackCursor(evt){
        siteCursor.style.transform = `translate(${evt.clientX}px, ${evt.clientY}px)`;
      })

      

  });
  