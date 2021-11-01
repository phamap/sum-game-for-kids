(() => {
  const max = 25;
  const min = 3;

  const firsHtmlNum = document.querySelector('#firstNum');
  const secondHtmlNum = document.querySelector('#secondNum');
  const htmlMessage = document.querySelector('#message');
  const htmlRes = document.querySelector('#resList');
  const htmlExercise = document.querySelector('.exercise');
  const htmlImg = document.querySelector('.minotaur');
  const input = document.querySelector('#number');
  const button = document.querySelector('#answer');
  const sign = document.querySelector('#sign');

  const messages = {
    success: 'Поздравляю, жалкий монстр был побежден! Тебе нет равных!',
    error: 'Тебе не хватило совсем чуть-чуть. В следующий раз ты обязательно справишься!'
  };
  const results = [];

  let firstNum;
  let secondNum;
  const increment = 282;
  let sum = 40;
  let attackSum = 10;
  let attackInterval, idleInterval, dieInterval, bossWinInterval;

  idleInterval = setInterval(() => {
    htmlImg.style.backgroundPosition = `-${sum}px 10px`;
    sum += increment;
    if (sum > 1300) {
      sum = 40;
    }
  }, 150);

  generateRandom();

  button.addEventListener('click', () => {
    onAnswer();
  });

  input.oninput = function() {
    console.log('Function: oninput: ', input.value)
  };

  function onAnswer() {
    clearInterval(idleInterval);
    /*if (!attackInterval) {
      attackInterval = setInterval(() => {
        htmlImg.style.backgroundPosition = `-${attackSum}px -840px`;
        attackSum += increment;
        if (attackSum > 1600) {
          attackSum = 10;
        }
      }, 100);
    }*/

    results.push({
      exercise: `${firstNum} + ${secondNum} = ${input.value}`,
      res: checkExercise(firstNum, secondNum, +input.value)
    });

    if (results.length < 20) {
      generateRandom();
    } else {
      clearInterval(attackInterval);
      htmlExercise.classList.add('hide');

      if (checkResult(results)) {
        htmlMessage.innerHTML = messages.success;
        htmlImg.classList.add('lose');
        dieInterval = setInterval(() => {
          htmlImg.style.backgroundPosition = `-${sum}px -2530px`;
          sum += increment;
          if (sum > 1600) {
            clearInterval(dieInterval);
          }
        }, 100);
      } else {
        htmlMessage.innerHTML = messages.error;
        htmlImg.classList.add('win');
        bossWinInterval = setInterval(() => {
          htmlImg.style.backgroundPosition = `-${sum}px -1400px`;
          sum += increment;
          if (sum > 1600) {
            sum = 40;
          }
        }, 100);
      }
      updateResults(results);
    }
  }

  function updateResults(results) {
    const el = document.createElement('ul');
    el.classList.add('result-list');
    results.forEach((r) => {
      const li = document.createElement('li');
      li.innerHTML = r.exercise;
      li.classList.add(r.res ? 'success' : 'error');
      el.appendChild(li);
    });
    htmlRes.append(el);
  }

  function checkResult(results) {
    return results.every(r => r.res);
  }

  function checkExercise(first, second, res) {
    return first + second === res;
  }

  function generateRandom() {
    input.value = 0;
    firstNum = getRandomInt(min, max);
    secondNum = max - firstNum > min ? getRandomInt(min, max - firstNum) : max - firstNum;
    firsHtmlNum.innerHTML = firstNum;
    secondHtmlNum.innerHTML = secondNum;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
})();
