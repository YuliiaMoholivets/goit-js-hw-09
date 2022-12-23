import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),

  daysLeft: document.querySelector('[data-days]'),
  hoursLeft: document.querySelector('[data-hours]'),
  minutesLeft: document.querySelector('[data-minutes]'),
  secondsLeft: document.querySelector('[data-seconds]'),
};

refs.dateInput.disabled = false;
refs.buttonStart.disabled = true;
refs.buttonStart.addEventListener('click', onButtonClickStartTimer);

let intervalId = null;
let startTime = 0;
let deadline = 0;

const date = new Date();
console.log(`Date now: ${Date.now()}`);


flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    startTime = selectedDates[0].getTime();
    if (startTime > date) {
      refs.buttonStart.disabled = false;

      console.log(`Start time: ${startTime}`);
      return startTime;
    } else {
      Notify.warning('Please choose a date in the future')
      
      refs.buttonStart.disabled = true;
    }
  },
});


function onButtonClickStartTimer() {
  console.log('Start!');
  refs.buttonStart.disabled = true;
  refs.dateInput.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    deadline = deltaTime;

   
    convertMs(deadline);
    stopClockface(deadline);
  }, 1000);
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  updateClockface({ days, hours, minutes, seconds });

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.daysLeft.textContent = days;
  refs.hoursLeft.textContent = hours;
  refs.minutesLeft.textContent = minutes;
  refs.secondsLeft.textContent = seconds;
}


function stopClockface(ms) {
  const cutMs = Math.trunc(ms * 0.001);


  if (cutMs <= 0) {
    clearInterval(intervalId);
    Notify.failure('Finish!');
    refs.buttonStart.disabled = true;
    refs.dateInput.disabled = false;


  }
}