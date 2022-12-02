const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalId = null;
refs.stopBtn.setAttribute('disabled', true);

const onStartBtnClick = e => {
  refs.stopBtn.removeAttribute('disabled');
  refs.startBtn.setAttribute('disabled', true);

  document.body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStoptBtnClick = e => {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);

  clearInterval(intervalId);
};

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStoptBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
