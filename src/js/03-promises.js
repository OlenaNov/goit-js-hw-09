
import Notiflix from 'notiflix';

const refs = {
  formCreatePromise: document.querySelector('.form'),
  inputFirstDelay: document.querySelector('input[name = "delay"]'),
  inputStepDelay: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
  btnSubmit: document.querySelector('button[type="submit"]'), 
};

refs.formCreatePromise.addEventListener('submit', onFormSubmit);
refs.btnSubmit.disabled = false;

function onFormSubmit(evt) {
  evt.preventDefault();
  const inputFirstDelay = Number(refs.inputFirstDelay.value);
  const inputStepDelay = Number(refs.inputStepDelay.value);
  const inputAmount = Number(refs.inputAmount.value);
  refs.btnSubmit.disabled = true;
  
  for (let i = 0; i < inputAmount; i += 1){
    const deleyCounter = inputFirstDelay + inputStepDelay * i;
    createPromise((i + 1), deleyCounter)
    .then(resolve)
    .catch(error)
    .finally(() => {
      if((i + 1) === inputAmount) {
        refs.btnSubmit.disabled = false;
      }
    });
  };
};

function resolve({ position, delay }) { 
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function error({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
};

