"use strict";

const boxInput = document.getElementById('box-input');

window.addEventListener('DOMContentLoaded', () => {
  boxInput.dataset.default = boxInput.value;
  initAdditional(boxInput);
});

boxInput.addEventListener('input', ev => {
  if (ev.target.value != ev.target.dataset.default) {
    ev.target.parentElement.parentElement.classList.add('error');

    ev.target.classList.add('red'); // (*)
    аdditionalLogic(boxInput, true);
  } else {
    ev.target.parentElement.parentElement.classList.remove('error');

    ev.target.classList.remove('red'); // (*)
    аdditionalLogic(boxInput, false);
  }
});


function initAdditional(boxInput) {
  boxInput.dataset.counter = 0;
  document.getElementById('additional').innerText = boxInput.value;
}

function аdditionalLogic(boxInput, show) {
  let box = boxInput.parentElement.parentElement;
  if (show) {
    boxInput.dataset.counter = +boxInput.dataset.counter + 1;
    let classToAdd = boxInput.dataset.counter < 5 ? 'sed' : 'crying';
    box.classList.add(classToAdd);
  } else {
    box.classList.remove('sed', 'crying');
    boxInput.dataset.counter = '0';
  }
}