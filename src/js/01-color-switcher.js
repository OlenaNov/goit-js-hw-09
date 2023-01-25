
const body = document.querySelector('body')
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = null;

btnStart.addEventListener('click', onBtnStartColorSwitcer)

function onBtnStartColorSwitcer() {
    intervalId = setInterval(changeColor, 1000);
    onStateBtns(true, false);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
};

btnStop.addEventListener('click', onButtonStop);

function onButtonStop() {
        clearInterval(intervalId); 
        onStateBtns(false, true);
};

function onStateBtns(stateStart, stateStop) {
    btnStart.disabled = stateStart;
    btnStop.disabled = stateStop;
};