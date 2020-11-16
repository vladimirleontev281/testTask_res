"use strict";

const TARGETS = {
  size: document.getElementsByName('size'),
  color: document.getElementsByClassName('color-list__input'),
  manufacturer: document.getElementById('manufacturer'),
  sale: document.getElementById('sale'),
},
DEFAULT = false;


class Task2Data {
  constructor() {
    this.size = '';
    this.color = [];
    this.manufacturer = [];
    this.sale = '';

    this.__proto__.targets = {
      size: TARGETS.size,
      color: TARGETS.color,
      manufacturer: Array.from(TARGETS.manufacturer.options),
      sale: TARGETS.sale,
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
  let data = new Task2Data;
  data.setObjValues(getURLDetails());
  data.setValuesInDOM();
});

for (const key in TARGETS) {
  if (TARGETS[key].length) {
    for (let i = 0; i < TARGETS[key].length; i++) {
      setListener(TARGETS[key][i]);
    }
  } else {
    setListener(TARGETS[key]);
  }
}



function setListener(elem) {
  elem.addEventListener('change', ev => {
    console.log(ev);

    /* возможно не будет работать из-за того что это момент эвента */
    // let data = new Task2Data;
    // data.getValuesInDOM();
    // console.log(getActualURL(data).url);
  });
}

function getURLDetails() {
  let output = {};
  let url = decodeURIComponent(location.search);
  let details = (url) ? url.slice(1, url.length).split('&').map(item => item.split('=')) : null;

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

function getActualURL(obj) {
  let prop = '';
  for (const key in obj) {
    prop += (Array.isArray(obj[key])) ? 
      obj[key].map(item => key + '=' + item).join('&') + '&' : key + '=' + obj[key] + '&';
  }
  prop = prop.slice(0, prop.length - 1);
  return {
    url: location.origin + '?' + prop,
    encodedURL: location.origin + '?' + encodeURIComponent(prop)
  };
}





/*
for tests

  console.log(getURLDetails());
  let temp = {
    color: ["1", "2"],
    manufacturer: ["aaa", "ddd"],
    sale: ["1", "2"],
    size: ["M", "L"]
  };
  console.log(getActualURL(temp));

*/


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

