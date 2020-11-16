"use strict";

/****** constants, variables, classes ******/
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
    Object.defineProperty(this.__proto__, "targets", {
      writable: true,
      enumerable: false,
      configurable: false
    });

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
    };
    Object.defineProperty(this.__proto__, "propList", {
      writable: true,
      enumerable: false,
      configurable: false
    });
  }

  isValidValue(key, value) {
    return this.propList.hasOwnProperty(key) ? 
      this.propList[key].values.has(value.toLowerCase()) : false;
  }

  // получает значения DOM-элементов и перезаписывает ими данные объекта класса
  getValuesInDOM() {
    for (let i = 0; i < this.targets.size.length; i++) {
      if (this.targets.size[i].checked) {
        this.size = this.targets.size[i].value;
        break;
      }
    }
    this.color = [];
    for (let i = 0; i < this.targets.color.length; i++) {
      if (this.targets.color[i].checked) {
        this.color.push(this.targets.color[i].value);
      }
    }
    this.manufacturer = [];
    for (let i = 0; i < this.targets.manufacturer.length; i++) {
      if (this.targets.manufacturer[i].selected) {
        this.manufacturer.push(this.targets.manufacturer[i].value);
      }
    }
    this.sale = (this.targets.sale.checked) ? '1' : '';
  }

  // устанавливает значения DOM-элементов
  // в соответствии с текущими значениями объекта класса
  setValuesInDOM() {
    for (let i = 0; i < this.targets.size.length; i++) {
      if (this.targets.size[i].value.toLowerCase() == this.size.toLocaleLowerCase()) {
        this.targets.size[i].checked = true;
        break;
      }
    }
    for (let i = 0; i < this.targets.color.length; i++) {
      let item = this.targets.color[i];
      item.checked = (this.color.includes(item.value.toLocaleLowerCase())) ? true : false;
    }
    for (let i = 0; i < this.targets.manufacturer.length; i++) {
      let item = this.targets.manufacturer[i];
      item.selected = (this.manufacturer.includes(item.value.toLocaleLowerCase())) ? true : false;
    }
    this.targets.sale.checked = (this.sale && +this.sale) ? true : false;
  }

  // устанавливает значения объекта класса в соответствии со входным
  setObjValues(obj) {
    writeValue = writeValue.bind(this);

    for (const key in obj) {
      if (this.propList.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(item => writeValue(key, item))
        } else {
          writeValue(key, obj[key]);
        }
      }
    }

    function writeValue(key, value) {
      if (this.isValidValue(key, value)) {
        this[key] = (this.propList[key].multivalue) ? 
          (!this[key].includes(value)) ? this[key].concat(value) : this[key] :
          (this[key] == '') ? value : this[key];
      }
    }
  }
}

/****** MAIN LOGIC ******/

document.addEventListener('DOMContentLoaded', () => {
  let data = new Task2Data;
  data.setObjValues(getURLDetails());
  data.setValuesInDOM();
});

for (const key in TARGETS) {
  if (key == 'size' || key == 'color') {
    for (let i = 0; i < TARGETS[key].length; i++) {
      setListener(TARGETS[key][i]);
    }
  } else {
    setListener(TARGETS[key]);
  }
}

/****** FUNCTION ******/

function setListener(elem) {
  elem.addEventListener('change', ev => {
    let data = new Task2Data;
    data.getValuesInDOM();
    console.log(getActualURL(data).url);
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
      (obj[key].length) ? obj[key].map(item => key + '=' + item).join('&') + '&' : '' : 
      (obj[key]) ? key + '=' + obj[key] + '&' : '';
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