(() => {
  const max = 10;
  const firsHtmlNum = document.querySelector('#firstNum');
  const secondHtmlNum = document.querySelector('#secondNum');
  const htmlMessage = document.querySelector('#message');
  const htmlRes = document.querySelector('#resList');
  const htmlExercise = document.querySelector('.exercise');
  const htmlImg = document.querySelector('.img');
  const input = document.querySelector('input');
  const messages = {
    success: 'Поздравляю, жалкий монстр был побежден! Тебе нет равных!',
    error: 'Тебе не хватило совсем чуть-чуть. В следующий раз ты обязательно справишься!'
  };
  const results = [];

  let firstNum;
  let secondNum;

  generateRandom();

  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
      results.push({
        exercise: `${firstNum} + ${secondNum} = ${e.target.value}`,
        res: checkExercise(firstNum, secondNum, +e.target.value)
      });

      if (results.length < 20) {
        generateRandom();
      } else {
        htmlMessage.innerHTML = checkResult(results) ? messages.success : messages.error;
        htmlImg.classList.add(checkResult(results) ? 'lose' : 'win');
        htmlExercise.classList.add('hide');
        updateResults(results);
      }
    }
  });

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
    firstNum = getRandomInt(1, max);
    secondNum = getRandomInt(1, max - firstNum);
    firsHtmlNum.innerHTML = firstNum;
    secondHtmlNum.innerHTML = secondNum;
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }
})();
