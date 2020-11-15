"use strict";

const TARGETS = {
  startButton: document.getElementById('start-button'),
  preloader: document.getElementById('pre-loader'),
  mesagger: document.getElementById('mesagger-box'),
},
REQUESTS = {
  first: {
    url: './source/first.json',
    delayEmulation: 2000
  },
  second: {
    url: './source/second.json',
    delayEmulation: 2000
  }
},
MESSAGES = {
  positive: 'Both responses received!',
  negative: 'Sorry, but one of the requests didn\'t get a correct response'
},
pushMessage = getPushMessage();


TARGETS.startButton.addEventListener('click', () => {
  preloader(true);
  let firstRequest = requestEmulation(REQUESTS.first.delayEmulation, REQUESTS.first.url);
  let secondRequest = requestEmulation(REQUESTS.second.delayEmulation, REQUESTS.second.url);

  Promise.all([firstRequest, secondRequest])
    .then(data => Promise.all(getResponseBodies(data)))
    .then(data => {
      preloader(false);
      let message;
      if (data[0] && data[1]) {
        message = MESSAGES.positive + '\n\nFirst response:\n' + JSON.stringify(data[0]) + 
        '\n\nSecond response:\n' + JSON.stringify(data[1]);
        pushMessage(MESSAGES.positive);
      } else {
        message = MESSAGES.negative;
        pushMessage(MESSAGES.negative, true);
      }
      console.log(message);
    });
}); 

function preloader(flag) {
  if (flag) {
    TARGETS.preloader.classList.add('active');
  } else {
    TARGETS.preloader.classList.remove('active');
  }
}

function requestEmulation(time, path, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sendRequest(path, data));
    }, time)
  });
}

function sendRequest(path, postData) {
  return (!postData) ? fetch(path) : fetch(path, {
    method: "POST",
    headers: JSON.stringify(postData.headers),
    body: JSON.stringify(postData.body)
  });
}

function getResponseBodies(data) {
  let responseBodyArray = [];
  for (let i = 0; i < data.length; i++) {
    responseBodyArray.push(processingResponse(data[i]) ? data[i].json() : null);
  }
  return responseBodyArray;
}

function processingResponse(responseObj) {
  return (responseObj.ok) ? true : false;
}

function getPushMessage() {
  let timerID = null;
  const box = TARGETS.mesagger, shutdownDelay = 5000;

  function clearTimer() {
    clearTimeout(timerID);
    timerID = null;
  }

  return function (message, negativeFlag) {
    if (!message) {
      box.classList.remove('active', 'negative');
      clearTimer();
    } else {
      box.classList.add('active');
      box.innerText = message;
      if (timerID) clearTimer();
      timerID = setTimeout(() => {box.classList.remove('active');}, shutdownDelay);
      
      if (negativeFlag) {
        box.classList.add('negative');
      } else {
        box.classList.remove('negative');
      }
    }
  }
}