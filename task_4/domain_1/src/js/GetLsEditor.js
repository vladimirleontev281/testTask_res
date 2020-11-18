class LsEditor {
  constructor(source, isIframe) {
    this.logToConsole = true;
    Object.defineProperty(this, "logToConsole", {
      writable: true,
      enumerable: true,
      configurable: false
    });
    this.reverseSide = false;
    Object.defineProperty(this, "reverseSide", {
      writable: true,
      enumerable: true,
      configurable: false
    });

    this.root = source;
    Object.defineProperty(this, "root", {
      writable: false,
      enumerable: true,
      configurable: false
    });

    this.isIframe = isIframe;
    Object.defineProperty(this, "isIframe", {
      writable: false,
      enumerable: true,
      configurable: false
    });

    this.__proto__.MESSAGES = {
      notInitialized: 'The interface is not initialized! For initialization, use the init () method.',
      noKey: 'The key is not a string or is not specified!',
      // noValue: 'The value is not specified!',
      write: {
        yes: 'Written',
        no: 'Value is didn\'t written'
      },
      remove: {
        yes: 'Removed',
        no: 'Value is didn\'t removed'
      },
      connect: {
        yes: 'Iframe connected',
      }
    },
    Object.defineProperty(this.__proto__, "MESSAGES", {
      writable: false,
      enumerable: false,
      configurable: false
    });
  }

  read(key, callback, data) {
    if (key === undefined || typeof key != 'string') {
      if (this.logToConsole) console.log(this.MESSAGES.noKey);
      return false;
    } else {
      let result = this.root.localStorage.getItem(key);
      if (this.logToConsole) console.log(result);
      if (callback) this.runCallback(callback, data, this.reverseSide);
      return result;
    }
  }

  write(key, value, callback, data) {
    if (key === undefined || typeof key != 'string') {
      if (this.logToConsole) console.log(this.MESSAGES.noKey);
      return false;
    } else {
      this.root.localStorage.setItem(key, value);
      let check = this.root.localStorage.getItem(key);
      if (this.logToConsole) console.log(check ? this.MESSAGES.write.yes : this.MESSAGES.write.no);
      if (callback) this.runCallback(callback, data, this.reverseSide);
      return check ? true : false;
    }
  }

  remove(key, callback, data) {
    if (key === undefined || typeof key != 'string') {
      if (this.logToConsole) console.log(this.MESSAGES.noKey);
      return false;
    } else {
      this.root.localStorage.removeItem(key);
      let check = this.root.localStorage.getItem(key);
      if (this.logToConsole) console.log(!check ? this.MESSAGES.remove.yes : this.MESSAGES.remove.no);
      if (callback) this.runCallback(callback, data, this.reverseSide);
      return !check ? true : false;
    }
  }

  runCallback(callback, data, reverseSide) {
    if (reverseSide) {
      console.log('Пока не реализовано');
    } else {
      callback(data);
    }
  }
}

export default function(inputNode) {
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      let rootNode = (inputNode && inputNode.tagName.toLowerCase() == 'iframe') ? 
        inputNode.contentWindow : window;
      let isIframe = (inputNode && inputNode.tagName.toLowerCase() == 'iframe') ? 
        true : false;
      resolve(new LsEditor(rootNode, isIframe));
    });
  });
}

