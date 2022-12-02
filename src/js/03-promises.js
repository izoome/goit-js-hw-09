import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");

form.addEventListener("submit", onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let deley = Number(form.elements.delay.value);
  let step = Number(form.elements.step.value);
  let amount = Number(form.elements.amount.value);

  if (deley < 0 || step < 0 || amount <= 0) {
    alert("Будь ласка, заповніть поле.");
    return;
  }
  for (let position = 1; position <= amount; position++) {
    createPromise(position, deley)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
        console.log(`Rejected promise ${position} in ${delay}ms`);
      });
    deley += step;
  }
  event.currentTarget.reset();
}
