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

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadio === 'fulfilled') {
        iziToast.show({
          ...toastOptions,
          backgroundColor: 'green',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        resolve(delay);
      } else {
        iziToast.show({
          ...toastOptions,
          backgroundColor: 'darkred',
          message: `❌ Rejected promise in ${delay}ms`,
        });
        reject(new Error(`❌ Rejected promise in ${delay}ms`));
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(error => {
      console.error(error.message);
    });

  form.reset();
}
