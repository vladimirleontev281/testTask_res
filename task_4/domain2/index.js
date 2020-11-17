"use strict";

/****** constants, variables, classes ******/
const TARGETS = {
  input: {
    elem: document.getElementById('input-line'),
    id: 'input-line'
  },
  send: {
    elem: document.getElementById('send'),
    id: 'send'
  },
  history: {
    elem: document.getElementById('history'),
    id: 'history'
  },
  message: {
    elem: document.getElementById('message-template'),
    id: 'message-template'
  },
};



/****** MAIN LOGIC ******/
document.addEventListener('DOMContentLoaded', () => {
  let firstMessage = {
    user: 'Lyooo',
    text: 'Дратути! Дратути! Дратути! Дратути! Дратути! Дратути! Дратути! Дратути! Дратути! Дратути! '
  };
  setTemplate(TARGETS.message.id, TARGETS.history.id, firstMessage)
});


/****** FUNCTION ******/

function setTemplate(templateID, boxID, data, rewrite) {
  let template = document.getElementById(templateID).innerHTML;
  let box = document.getElementById(boxID);
  let output = Mustache.render(template, data);
  box.innerHTML = (rewrite) ? output : box.innerHTML + output;
};

