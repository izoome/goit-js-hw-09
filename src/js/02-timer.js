import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const refs = {
  timePicker: document.querySelector('input[type="text"]'),
  startBtn: document.querySelector("button[data-start]"),
  valueSpans: document.querySelectorAll(".value"),
};
refs.startBtn.disabled = true;
let selectedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedTime = selectedDates[0].getTime();
    if (selectedDates[0] <= Date.now()) {
      return Notify.failure("Please choose a date in the future");
    }

    refs.startBtn.disabled = false;
  },
};
flatpickr("input#datetime-picker", options);

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    refs.startBtn.disabled = true;
    refs.timePicker.disabled = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime >= selectedTime) {
        this.stop();
        return;
      }
      const deltaTime = selectedTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    refs.timePicker.disabled = false;
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));

    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));

    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );

    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );
    return { days, hours, minutes, seconds };
  }

  addLeadingZero = (value) => {
    return String(value).padStart(2, "0");
  };
}

const timer = new Timer({
  onTick: updateClockface,
});

function updateClockface({ days, hours, minutes, seconds }) {
  refs.valueSpans[0].textContent = `${days}`;
  refs.valueSpans[1].textContent = `${hours}`;
  refs.valueSpans[2].textContent = `${minutes}`;
  refs.valueSpans[3].textContent = `${seconds}`;
}

refs.startBtn.addEventListener("click", timer.start.bind(timer));

const timerStyles = document.querySelector(".timer").style;
const fields = document.querySelectorAll(".field");
timerStyles.gap = "20px";
timerStyles.display = "flex";
timerStyles.marginTop = "20px";
timerStyles.textAlign = "center";
timerStyles.fontWeight = "500";
fields.forEach((field) => {
  const valueStyles = field.firstElementChild.style;
  const labelStyles = field.lastElementChild.style;
  valueStyles.fontSize = "30px";
  valueStyles.display = "block";
  labelStyles.fontSize = "12px";
  labelStyles.textTransform = "uppercase";
});
