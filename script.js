(() => {
  const firsHtmlNum = document.querySelector('#firstNum');
  const secondHtmlNum = document.querySelector('#secondNum');
  const htmlMessage = document.querySelector('#message');
  const htmlRes = document.querySelector('#resList');
  const htmlExercise = document.querySelector('.exercise');
  const htmlImg = document.querySelector('.minotaur');
  const input = document.querySelector('#number');
  const button = document.querySelector('#answer');
  const htmlSign = document.querySelector('#sign');
  const htmlLevels = document.querySelector('#levels');
  const htmlCLevel = document.querySelector('#cLevel');
  const htmlHearts = document.querySelector('#hearts');
  const htmlCage = document.querySelector('.cage');
  const htmlTrap = document.querySelector('.trap');
  const htmlResetBtn = document.querySelector('#resetBtn');

  const messages = {
    success: 'Поздравляю, монстр был побежден! Тебе нет равных в математике!',
    error: 'Тебе не хватило совсем чуть-чуть. \nВ следующий раз ты обязательно справишься!'
  };
  const results = [];
  const questionCount = 20;

  let max = 10;
  let min = 3;
  let heartCount = 3;
  let firstNum;
  let secondNum;
  const increment = 282;
  let sum = 40;
  let attackSum = 10;
  let attackInterval, idleInterval, idleInterval2, dieInterval, bossWinInterval;

  button.addEventListener('click', () => {
    onAnswer(results);
  });

  htmlLevels.addEventListener('click', (e) => {
    if (e.target?.tagName === 'INPUT') {
      e.stopPropagation();
      switch (+e.target.value) {
        case 2:
          max = 15;
          min = 3;
          break;
        case 3:
          max = 35;
          min = 5;
          break;
        default:
          max = 10;
          min = 2;
      }
      htmlExercise.style.display = 'flex';
      htmlLevels.style.display = 'none';
      htmlCLevel.innerHTML = e.target.value;
      generateRandom();
    }
  });

  htmlResetBtn.addEventListener('click', () => {
    location.reload();
  });

  startIdleAnimation();

  function startIdleAnimation() {
    attackSum = 10;
    idleInterval = setInterval(() => {
      htmlImg.style.backgroundPosition = `-${sum}px 10px`;
      sum += increment;
      if (sum > 1300) {
        sum = 40;
      }
    }, 150);
  }

  function startIdle2Animation() {
    attackSum = 10;
    idleInterval2 = setInterval(() => {
      htmlImg.style.backgroundPosition = `-${attackSum}px -550px`;
      attackSum += increment;
      if (attackSum > 1300) {
        clearInterval(idleInterval2);
        idleInterval2 = null;

        if (results.length < 20) {
          startIdleAnimation();
        }
      }
    }, 100);
  }

  function startAttackAnimation() {
    attackSum = 10;
    heartCount--;
    if (!attackInterval) {
      attackInterval = setInterval(() => {
        htmlImg.style.backgroundPosition = `-${attackSum}px -840px`;
        attackSum += increment;
        if (attackSum > 1600) {
          clearInterval(attackInterval);
          attackInterval = null;
          startIdleAnimation();
        }
      }, 100);
    }
  }

  function startWinAnimation() {
    attackSum = 10;
    bossWinInterval = setInterval(() => {
      htmlImg.style.backgroundPosition = `-${sum}px -1395px`;
      sum += increment;
      if (sum > 1600) {
        sum = 40;
        clearInterval(bossWinInterval);
        htmlCage.style.display = 'block';
        htmlTrap.classList.add('active');
      }
    }, 100);
  }

  function startDieAnimation() {
    attackSum = 10;
    clearInterval(idleInterval);
    dieInterval = setInterval(() => {
      htmlImg.style.backgroundPosition = `-${sum}px -2520px`;
      sum += increment;
      if (sum > 1300) {
        clearInterval(dieInterval);
      }
    }, 200);
  }

  function onAnswer(results) {
    clearInterval(idleInterval);
    clearInterval(attackInterval);
    button.disabled = true;
    setTimeout(() => button.disabled = false, 700);

    if (!(results.length % 2)) {
      const res = checkSubtract(firstNum, secondNum, +input.value);
      !res ? startAttackAnimation() : startIdle2Animation();
      results.push({
        exercise: `${firstNum} - ${secondNum} = ${input.value}`,
        res
      });
    } else {
      const res = checkSum(firstNum, secondNum, +input.value);
      !res ? startAttackAnimation() : startIdle2Animation();
      results.push({
        exercise: `${firstNum} + ${secondNum} = ${input.value}`,
        res
      });
    }

    if (results.length < questionCount && heartCount > 0) {
      generateRandom();
    } else {
      finish(results);
    }

    if (heartCount < 3) {
      htmlHearts.childNodes[heartCount].style.display = 'none';
    }
  }

  function finish(results) {
    clearInterval(idleInterval);
    clearInterval(attackInterval);
    htmlExercise.classList.add('hide');

    if (checkResult(results)) {
      htmlMessage.innerHTML = messages.success;
      htmlImg.classList.add('lose');
      setTimeout(() => startDieAnimation(), 500);
    } else {
      htmlMessage.innerHTML = messages.error;
      htmlImg.classList.add('win');
      startWinAnimation();
    }
    updateResults(results);
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
    htmlResetBtn.classList.remove('hide');
  }

  function checkResult(results) {
    return results.filter(r => !r.res).length < 3;
  }

  function checkSum(first, second, res) {
    return first + second === res;
  }

  function checkSubtract(first, second, res) {
    return first - second === res;
  }

  function generateRandom() {
    input.value = 0;
    input.focus();
    if (!(results.length % 2)) {
      firstNum = getRandomInt(5, max);
      secondNum = getRandomInt(2, firstNum - 1);
      firsHtmlNum.innerHTML = firstNum;
      secondHtmlNum.innerHTML = secondNum;
      htmlSign.innerHTML = '-';
    } else {
      firstNum = getRandomInt(min, max);
      secondNum = max - firstNum > min ? getRandomInt(min, max - firstNum) : max - firstNum;
      firsHtmlNum.innerHTML = firstNum;
      secondHtmlNum.innerHTML = secondNum;
      htmlSign.innerHTML = '+';
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
})();
