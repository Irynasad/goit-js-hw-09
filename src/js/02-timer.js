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
    // console.log(userDate);
  },
};

flatpickr(refs.input, options);

class Timer {
  constructor({ onTick, userDate }) {
    this.timerId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    // if (this.isActive) {
    //   return;
    // }
    // this.isActive = true;

    refs.btnStart.setAttribute('disabled', true);
    refs.input.setAttribute('disabled', true);

    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userDate - currentTime;
      if (deltaTime <= 0) {
        return;
      }

      const data = this.convertMs(deltaTime);

      this.onTick(data);
      // console.log(data);
    }, 1000);
  }
  stop() {
    clearInterval(this.timerId);
    // this.isActive = false;
    refs.input.removeAttribute('disabled');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // const days = this.addLeadingZero(Math.floor(ms / day));
    // const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // const minutes = this.addLeadingZero(
    //   Math.floor(((ms % day) % hour) / minute)
    // );
    // const seconds = this.addLeadingZero(
    //   Math.floor((((ms % day) % hour) % minute) / second)
    // );

    const days = this.Math.floor(ms / day);
    const hours = this.Math.floor((ms % day) / hour);
    const minutes = this.Math.floor(((ms % day) % hour) / minute);
    const seconds = this.Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  //   addLeadingZero(value) {
  //     return String(value).padStart(2, '0');
  //   }
}

const timer = new Timer({
  onTick: updateClockFace,
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// function updateClockFace({ days, hours, minutes, seconds }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.textContent = `${hours}`;
//   refs.minutes.textContent = `${minutes}`;
//   refs.seconds.textContent = `${seconds}`;
// }

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
}

refs.btnStart.addEventListener('click', timer.start.bind(timer));
