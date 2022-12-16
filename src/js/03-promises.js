import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
//

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button[type="submit"'),
};

// refs.btn.addEventListener('submit', createPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        console.log('вдало');
        resolve({ position, delay });
        // Fulfill
        // Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        console.log('невдало');
        reject({ position, delay });
        // Reject
        // Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

createPromise(2, 1500)
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
