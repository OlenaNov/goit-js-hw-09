
import Notiflix from 'notiflix';

const refs = {
  formCreatePromise: document.querySelector('.form'),
  inputFirstDelay: document.querySelector('input[name = "delay"]'),
  inputStepDelay: document.querySelector('input[name = "step"]'),
  inputAmount: document.querySelector('input[name = "amount"]'),
};

refs.formCreatePromise.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const inputFirstDelay = Number(refs.inputFirstDelay.value);
  const inputStepDelay = Number(refs.inputStepDelay.value);
  const inputAmount = Number(refs.inputAmount.value);
  
  for (let i = 0; i < inputAmount; i += 1){
    const deleyCounter = inputFirstDelay + inputStepDelay * i;
    createPromise((i + 1), deleyCounter).then(resolve).catch(error);
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

