import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysLabel = document.querySelector('[data-days]')
const hoursLabel = document.querySelector('[data-hours]')
const minutesLabel = document.querySelector('[data-minutes]')
const secondsLabel = document.querySelector('[data-seconds]')

let userSelectedDate = null;
let countdownInterval = null;

startBtn.classList.add('disabled');
startBtn.disabled = true;

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

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      
      if (selectedDates[0] <= new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight'
        });
        startBtn.disabled = true;
        startBtn.classList.add('disabled');
      } else {
        startBtn.disabled = false;
        startBtn.classList.remove('disabled');
      }
    },
  });

  startBtn.addEventListener("click", event => {
    startBtn.disabled = true;
    startBtn.classList.add('disabled');
    input.disabled = true;
    input.classList.add('disabled'); 

    countdownInterval = setInterval(() => {
        const currentDate = new Date().getTime();
        const timeDiff = userSelectedDate - currentDate;

        if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            daysLabel.textContent = '00';
            hoursLabel.textContent = '00';
            minutesLabel.textContent = '00';
            secondsLabel.textContent = '00';
            iziToast.success({ title: 'Success', message: 'Countdown finished!' });
            input.disabled = false;
            input.classList.remove('disabled');
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(timeDiff);
        daysLabel.textContent = addLeadingZero(days);
        hoursLabel.textContent = addLeadingZero(hours);
        minutesLabel.textContent = addLeadingZero(minutes);
        secondsLabel.textContent = addLeadingZero(seconds);
    }, 1000);
  });
  