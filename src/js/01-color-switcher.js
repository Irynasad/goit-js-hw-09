const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

// activeBtnStart();
let timerId = null;
refs.btnStop.setAttribute('disabled', true);

refs.btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    console.log('Смена темы');
    const randomColor = getRandomHexColor();
    refs.body.style.backgroundColor = randomColor;
  }, 1000);
  activeBtnStop();
});

refs.btnStop.addEventListener('click', () => {
  clearInterval(timerId);
  activeBtnStart();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function activeBtnStop() {
  refs.btnStart.setAttribute('disabled', true);
  refs.btnStop.removeAttribute('disabled');
}

function activeBtnStart() {
  refs.btnStop.setAttribute('disabled', true);
  refs.btnStart.removeAttribute('disabled');
}
