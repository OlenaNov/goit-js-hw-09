import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const inputDatetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const timerBox = document.querySelector('.timer');
const daysRemaining = document.querySelector('[data-days]');
const hoursRemaining = document.querySelector('[data-hours]');
const minutesRemaining = document.querySelector('[data-minutes]');
const secondsRemaining = document.querySelector('[data-seconds]');

inputDatetimePicker.style.marginLeft = "20px";
timerBox.style.display = "flex";
timerBox.style.gap = "20px";
timerBox.style.border = "4px double gray";
timerBox.style.margin = "20px auto 20px 20px";
timerBox.style.padding = "10px";
timerBox.style.maxWidth = "330px";

btnStart.disabled = true;

let selectedDate = null;
let timer = null;
let valuesRemaining = {};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < new Date()) {
            Notiflix.Notify.warning('Please choose a date in the future');
            return;
        }
        btnStart.disabled = false;
        selectedDate = selectedDates[0];
    }
  };

  flatpickr(inputDatetimePicker, options);

  btnStart.addEventListener('click', timerStart)

  function timerStart() {
    timer = setInterval(countDown, 1000);
    btnStart.disabled = true;
  }

  function countDown() {
    let  timeRemaining = selectedDate - new Date();
    convertMs(timeRemaining);
    addLeadingZero(valuesRemaining);

    if(timeRemaining <= 1000) {
        clearInterval(timer);
    }
}

function convertMs(ms) {
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
  
    valuesRemaining = { days, hours, minutes, seconds };
    return { days, hours, minutes, seconds };
  };

  function addLeadingZero(value) {
    daysRemaining.textContent = value.days.toString().padStart(1, "0");
    hoursRemaining.textContent = value.hours.toString().padStart(1, "0");
    minutesRemaining.textContent = value.minutes.toString().padStart(1, "0");
    secondsRemaining.textContent = value.seconds.toString().padStart(1, "0");
  };
