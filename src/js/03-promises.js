import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button[type="submit"'),
  delay: document.querySelector('input[name="delay"'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"'),
};

// let delay = refs.delay.value;
// let step = refs.step.value;
// let amount = refs.amount.value;

refs.btn.addEventListener('submit', onBtnShow);

function onBtnShow(event) {
  event.preventDefault;
  let delay = refs.delay.value;
  let step = refs.step.value;
  let amount = refs.amount.value;
  console.log(delay, step, amount);

  createShowPromises(delay, step, amount);
}

function createShowPromises(delay, step, amount) {
  let newDelay = delay;
  console.log(delay);
  let position = 0;
  for (let i = 0; i < amount; i++) {
    newDelay += step;
    position += 1;
    createPromise(position, newDelay);
  }
}

// createShowPromises(2000, 500, 4);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        console.log('вдало');
        resolve({ position, delay });
        // Fulfill
      } else {
        console.log('невдало');
        reject({ position, delay });
        // Reject
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      return Notiflix.Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      return Notiflix.Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`
      );
    });
}

function createShowPromises(delay, step, amount) {
  let newDelay = delay;
  let position = 0;
  for (let i = 0; i < amount; i++) {
    newDelay += step;
    position += 1;
    createPromise(position, newDelay);
  }
}
