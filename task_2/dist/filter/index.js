"use strict";

const DEFAULT = false;

class task2Data {
  constructor() {
    this.size = '';
    this.color = [];
    this.manufacturer = [];
    this.sale = '';

    this.__proto__.targets = {
      size: document.getElementsByName('sale'),
      color: document.getElementsByClassName('color-list__input'),
      manufacturer: Array.from(document.getElementById('manufacturer').options),
      sale: document.getElementById('sale'),
    };
    this.__proto__.propList = {
      size: {
        multivalue: false,
        values: new Set(['s', 'm', 'l']),
        default: 's',
      },
      color: {
        multivalue: true,
        values: new Set(['1', '2', '3', '4', '5']),
        default: null,
      },
      manufacturer: {
        multivalue: true,
        values: new Set(['aaa', 'b&c',  'ddd', 'eee']),
        default: 'aaa',
      },
      sale: {
        multivalue: false,
        values: new Set(['0', '1']),
        default: null,
      },
    }
  }

  isValidValue(propName, value) {
    return this.propList.hasOwnProperty(propName) ? this.propList[propName].values.has(value) : false;
  }

  // получает значения DOM-элементов и перезаписывает ими данные объекта
  getValuesInDOM() {
    
  }

  // устагавливает значения DOM-элементов
  // в соответствии с текущими значениями объекта
  setValuesInDOM() {
    
  }

  // устанавливает значения внутреннего объекта в соответствии с полученным
  setObjValues(obj) {
    for (const key in obj) {
      
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  console.log(getURLDetails());
  
});

function getURLDetails() {
  let output = {};
  let details = (location.search) ? 
    location.search.slice(1, location.search.length).split('&').map(item => item.split('=')) : null;

  if (details) {
    for (let i = 0; i < details.length; i++) {
      if (output.hasOwnProperty(details[i][0])) {
        output[details[i][0]].push(details[i][1]);
      } else {
        output[details[i][0]] = [details[i][1]];
      }
    }
    for (const key in output) {
      output[key] = (output[key].length > 1) ? output[key] : output[key][0];
    }
    return output;
  } else {
    return null;
  }
}








// function objIsEmpty(obj) {
//   for (let key in obj) {
//     return false;
//   }
//   return true;
// }

// let manufacturer = document.getElementById('manufacturer');
// manufacturer.addEventListener('change', ev => {
//   let select = ev.target;
//   console.log(Array.from(select.options));
//   let selected = Array.from(select.options)
//     .filter(option => option.selected)
//     .map(option => option.value);
//   console.log(selected);
// });

