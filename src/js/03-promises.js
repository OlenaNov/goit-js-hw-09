
import Notiflix from 'notiflix';

const refs = {
  formCreatePromise: document.querySelector('.form'),
};

refs.formCreatePromise.addEventListener('submit', onFormSubmit);
const btnSubmit = refs.formCreatePromise.elements[3];
onActiveBtn(false);

function onFormSubmit(evt) {
  evt.preventDefault();
  const inputFirstDelay = Number(refs.formCreatePromise.elements[0].value);
  const inputStepDelay = Number(refs.formCreatePromise.elements[1].value);
  const inputAmount = Number(refs.formCreatePromise.elements[2].value);

  onActiveBtn(true);
  
  for (let i = 0; i < inputAmount; i += 1){
    const deleyCounter = inputFirstDelay + inputStepDelay * i;
    createPromise((i + 1), deleyCounter)
    .then(resolve)
    .catch(error)
    .finally(() => {
      if((i + 1) === inputAmount) {
        onActiveBtn(false);
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

function onActiveBtn(state) {
  btnSubmit.disabled = state;
};