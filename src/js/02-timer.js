import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

//налаштування нотіфікацій
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.setAttribute('disabled', true);
let userDate = null;
// let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? toastr.error('Please choose a date in the future')
      : refs.btnStart.removeAttribute('disabled');
    userDate = selectedDates[0];
  },
};

flatpickr(refs.input, options);

//в параметри Timer добавити результат флетріку(юзерДате)
class Timer {
  constructor({ onTick, userDate }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }
    console.log(userDate);
    //замість Date.now() * 1.0000002 поставити userDate
    const startTime = Date.now() * 1.0000002;
    this.isActive = true;

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime <= 0) {
        return;
      }

      const { days, hours, minutes, seconds } = this.convertMs(deltaTime);

      this.onTick({ days, hours, minutes, seconds });

      console.log(`${days}::${hours}::${minutes}::${seconds}`);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day), 3);
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour), 2);
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute),
      2
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second),
      2
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value, num) {
    return String(value).padStart(num, '0');
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

timer.start();

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
