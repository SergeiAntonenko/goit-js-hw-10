'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const formFieldset = document.querySelector('.form-fieldset');
const delayInput = document.querySelector('[name = "delay"]');
const stateRadios = document.querySelectorAll('[name = "state"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const delay = delayInput.value;
  let selectedRadio = null;
  stateRadios.forEach(radio => {
    if (radio.checked) {
      selectedRadio = radio.value;
    }
  });

  const toastOptions = {
    backgroundColor: '',
    messageColor: 'white',
    messageSize: '24',
    timeout: 3000,
    position: 'topRight',
  };

  if (selectedRadio === 'fulfilled') {
    const fulfilledPromise = new Promise(resolve => {
      setTimeout(() => {
        iziToast.show({
          ...toastOptions,
          backgroundColor: 'green',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        resolve(delay);
      }, delay);
    });

    fulfilledPromise.then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    });
  } else {
    const rejectedPromise = new Promise((_, reject) => {
      setTimeout(() => {
        iziToast.show({
          ...toastOptions,
          backgroundColor: 'darkred',
          message: `❌ Rejected promise in ${delay}ms`,
        });
        reject(new Error(`❌ Rejected promise in ${delay}ms`));
      }, delay);
    });

    rejectedPromise.catch(error => {
      console.error(error.message);
    });
  }

  form.reset();
}
