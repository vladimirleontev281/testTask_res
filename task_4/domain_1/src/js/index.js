"use strict";

/****** constants and variables ******/
const TARGETS = {
  input: document.getElementById('input-line'),
  send: document.getElementById('send'),
  user: document.getElementById('user'),
  iframe: document.getElementById('domain_2'),
};

import { resolve } from 'path';
/****** imports and init the interfaces ******/
import GetLsEditor from './GetLsEditor';
const lsEditor = new GetLsEditor(TARGETS.iframe);

/****** MAIN LOGIC ******/
lsEditor.then(lsEditor => {
  lsEditor.logToConsole = false;

  TARGETS.send.addEventListener('click', () => {
    let text = TARGETS.input.value, user = TARGETS.user.value;
    if (text) {
      let data = {user: user || 'no-name', text};
      sendMessage(data, lsEditor);
    }
    TARGETS.input.value = '';
  });
});

/****** FUNCTION ******/
function sendMessage(data, lsEditor) {
  let history = lsEditor.read('task4Chat');
  history.push(data);
  lsEditor.write('task4Chat', history, refresh, {lsEditor});
}

function refresh(data) {
  let lsEditor = data.lsEditor;
  lsEditor.root.dispatchEvent(new CustomEvent('baseUpdated'));
}