"use strict";

/****** constants and variables ******/
const TARGETS = {
  input: document.getElementById('input-line'),
  send: document.getElementById('send'),
  user: document.getElementById('user'),
  iframe: document.getElementById('domain_2'),
  remove: document.getElementById('remove'),
};

import { resolve } from 'path';
/****** imports and init the interfaces ******/
import GetLsEditor from './GetLsEditor';
const lsEditor = new GetLsEditor(TARGETS.iframe);

/****** MAIN LOGIC ******/
lsEditor.then(lsEditor => {
  TARGETS.send.addEventListener('click', () => {
    let text = TARGETS.input.value;
    if (text) {
      sendMessage({user: TARGETS.user.value || 'no-name', text}, lsEditor);
      TARGETS.input.value = '';
    }
  });

  TARGETS.remove.addEventListener('click', () => {
    deleteHistory(lsEditor);
  });
});

/****** FUNCTION ******/
function sendMessage(data, lsEditor) {
  const KEY = 'task4Chat';
  let history = lsEditor.read(KEY);
  history.push(data);
  lsEditor.write(KEY, history, refresh, {lsEditor});
}

function refresh({lsEditor}) {
  lsEditor.root.dispatchEvent(new CustomEvent('baseUpdated'));
}

function deleteHistory(lsEditor) {
  const KEY = 'task4Chat';
  lsEditor.remove(KEY);
  lsEditor.write(KEY, [], refresh, {lsEditor});
}