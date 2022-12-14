import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

// toastr.error(
//   'I do not think that word means what you think it means.',
//   '"Please choose a date in the future"'
// );

// Command: toastr['error']('I do not think that means what you think it means.');

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

// 0. дефолтний стан- кнопка Старт неактивна
// let timerId = 0
// let userDate = 0
// const ...btnStart.setAttribute('disabled', true)

// 1. вибір дати(const userDate)
// 1.0 на інпут вішаємо слухача input та колбек onUserDate
// 1.1.ерор-повідомлення, якщо вибрана дата в минулому
// 1.2.дата майбутнього (>= new Date ())
// 1.3.кнопка  Старт стає активною.

const refs = {
  btnStart: document.querySelector('button[data-start'),
  input: document.querySelector('#datetime-picker'),
};

refs.btnStart.setAttribute('disabled', true);
let userDate = null;
let timerId = null;
console.log(refs.input);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] <= options.defaultDate
      ? toastr.error(
          'I do not think that word means what you think it means.',
          '"Please choose a date in the future"'
        )
      : refs.btnStart.removeAttribute('disabled');
    userDate = selectedDates[0];
  },
};

const onUserDate = () => {
  return (userDate = refs.input.value);
};

refs.input.addEventListener('input', onUserDate);

// 2. Нажимаєм кнопку старт - запускається лічильник
// 2.1.Вішаємо слухача на кнопку, в колбєк ставим роботу ліччильника

// 3. Лічильник = userDate.getTime? - Date.now()
// 2.2 привести до одного формату!
