"use strict";

/****** imports and init the interfaces ******/
import GetChatBaseManager from './GetChatBaseManager';
const chatBaseManager = new GetChatBaseManager();

/****** constants, variables, classes ******/
const TARGETS = {
  input: document.getElementById('input-line'),
  send: document.getElementById('send'),
  history: document.getElementById('history'),
  message: document.getElementById('message-template'),
  user: document.getElementById('user'),
};

/****** MAIN LOGIC ******/
document.addEventListener('DOMContentLoaded', () => {
  window.dispatchEvent(new Event('baseUpdated'));
});

TARGETS.send.addEventListener('click', () => {
  let text = TARGETS.input.value;
  if (text) {
    chatBaseManager.writeMessage(TARGETS.user.value || 'no-name', text);
    window.dispatchEvent(new Event('baseUpdated'));
    TARGETS.input.value = '';
  }
});

window.addEventListener('baseUpdated', () => {
  TARGETS.history.innerHTML = '';
  chatBaseManager.read().forEach(elem => {
    setTemplate(TARGETS.message.id, TARGETS.history.id, elem)
  });
});

/****** FUNCTION ******/
function setTemplate(templateID, boxID, data, rewrite) {
  let template = document.getElementById(templateID).innerHTML;
  let output = Mustache.render(template, data);
  let box = document.getElementById(boxID);
  box.innerHTML = (rewrite) ? output : box.innerHTML + output;
};

