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
},
EVENTS = {
  baseUpdated: new Event('baseUpdated'),
  runCallback: new Event('runCallback', {detail: {callback: window.task4Callback}}),
}

/****** MAIN LOGIC ******/
document.addEventListener('DOMContentLoaded', () => {
  chatBaseManager.initChat();
  document.dispatchEvent(EVENTS.baseUpdated);
});

TARGETS.send.elem.addEventListener('click', ev => {
  let text = TARGETS.input.elem.value, user = TARGETS.user.elem.value;
  if (text) {
    chatBaseManager.writeMessage(user || 'no-name', text);
  }
  document.dispatchEvent(EVENTS.baseUpdated);
  TARGETS.input.elem.value = '';
});

document.addEventListener('baseUpdated', () => {
  let history = chatBaseManager.read();
  TARGETS.history.elem.innerHTML = '';
  history.forEach(element => {
    setTemplate(TARGETS.message.id, TARGETS.history.id, element)
  });
});

document.addEventListener('runCallback', ev => {
  if (ev.detail.callback) ev.detail.callback.run(ev.detail.callback.data);
});


/****** FUNCTION ******/
function setTemplate(templateID, boxID, data, rewrite) {
  let template = document.getElementById(templateID).innerHTML;
  let box = document.getElementById(boxID);
  let output = Mustache.render(template, data);
  box.innerHTML = (rewrite) ? output : box.innerHTML + output;
};

