"use strict";

/****** constants, variables, classes ******/
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
  lsEditor.remove('newMessage');
});

/****** FUNCTION ******/



let iframe = document.getElementById('domain_2');
