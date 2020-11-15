"use strict";

let manufacturer = document.getElementById('manufacturer');
manufacturer.addEventListener('change', ev => {
  let select = ev.target;
  console.log(Array.from(select.options));
  let selected = Array.from(select.options);

    // .filter(option => option.selected)
    // .map(option => option.value);
  // console.log(selected);
  });