'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const inputBtn = document.querySelector('[data-start]');
const dateValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        backgroundColor: 'red',
        messageColor: 'white',
        messageSize: '24',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    } else {
      inputBtn.removeAttribute('disabled');
    }
  },
  onOpen() {
    inputBtn.setAttribute('disabled', 'true');
  },
};

flatpickr(dateInput, options);

inputBtn.addEventListener('click', function () {
  startTimer(userSelectedDate);
});

function startTimer(userSelectedDate) {
  inputBtn.setAttribute('disabled', 'true');
  dateInput.setAttribute('disabled', 'true');
  const idInterval = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const convertTime = convertMs(diff);
    const time = formatTime(convertTime);
    dateValue.textContent = time.days;
    hoursValue.textContent = time.hours;
    minutesValue.textContent = time.minutes;
    secondsValue.textContent = time.seconds;
    if (
      dateValue.textContent === '00' &&
      hoursValue.textContent === '00' &&
      minutesValue.textContent === '00' &&
      secondsValue.textContent === '00'
    ) {
      clearInterval(idInterval);
    }
  }, 1000);
}

function formatTime({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return { days, hours, minutes, seconds };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
