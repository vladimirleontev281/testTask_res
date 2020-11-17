"use strict";

/****** imports and init the interfaces ******/
import GetChatBaseManager from './ChatBaseManager';
const chatBaseManager = new GetChatBaseManager();

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
  user: {
    elem: document.getElementById('user'),
    id: 'user'
  }
};

/****** MAIN LOGIC ******/
document.addEventListener('DOMContentLoaded', () => {
  chatBaseManager.initChat();
  setHistory(chatBaseManager.read());
});

TARGETS.send.elem.addEventListener('click', ev => {
  let text = TARGETS.input.elem.value, user = TARGETS.user.elem.value;
  if (text) {
    chatBaseManager.writeMessage(user || 'no-name', text);
    setHistory(chatBaseManager.read());
  }
  TARGETS.input.elem.value = '';
});


/****** FUNCTION ******/

function setHistory(history) {
  TARGETS.history.elem.innerHTML = '';
  history.forEach(element => {
    setTemplate(TARGETS.message.id, TARGETS.history.id, element)
  });
}

function setTemplate(templateID, boxID, data, rewrite) {
  let template = document.getElementById(templateID).innerHTML;
  let box = document.getElementById(boxID);
  let output = Mustache.render(template, data);
  box.innerHTML = (rewrite) ? output : box.innerHTML + output;
};

