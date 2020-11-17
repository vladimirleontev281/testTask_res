export default class {
  constructor(inputRoot) {
    this.root = inputRoot || window;
    Object.defineProperty(this, "root", {
      writable: true,
      enumerable: true,
      configurable: false
    });

    this.noImputRoot = (!inputRoot) ? true : false;
    Object.defineProperty(this, "root", {
      writable: true,
      enumerable: false,
      configurable: false
    });

    this.__proto__.MESSAGES = {
      notInitialized: 'The interface is not initialized! For initialization, use the init () method.',
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
      writable: true,
      enumerable: false,
      configurable: false
    });

    logToConsole = true;
  }

  init() {
    rememberThis = this;
    return new Promise(resolve => {
      let oldWin = rememberThis.root.contentWindow;
    
      let timer = setInterval(() => {
        let newWin = rememberThis.root.contentWindow;
        if (!rememberThis.noImputRoot && oldWin == newWin) return;

        rememberThis._initialization = true;
        Object.defineProperty(rememberThis, "_initialization", {
          writable: true,
          enumerable: false,
          configurable: false
        });
        
        rememberThis.root = newWin;
        if (rememberThis.logToConsole) console.log(rememberThis.MESSAGES.connect.yes);
        resolve(rememberThis.root);

        clearInterval(timer);
      }, 100);
    });
  }

  read(key, callback, data) {
    if (this._initialization) {
      let result = JSON.parse(this.root.localStorage.getItem(key));
      if (this.logToConsole) console.log(result);
      if (callback) callback(data);
      return result;
    } else {
      if (this.logToConsole) console.log(this.MESSAGES.notInitialized);
      return false;
    }
  }

  write(key, value, callback, data) {
    if (this._initialization) {
      this.root.localStorage.setItem(key, value);
      let check = this.read(key);
      if (this.logToConsole) console.log(check ? this.MESSAGES.write.yes : this.MESSAGES.write.no);
      if (callback && check) callback(data);
      return check ? true : false;
    } else {
      if (this.logToConsole) console.log(this.MESSAGES.notInitialized);
      return false;
    }
  }

  remove(key, callback, data) {
    if (this._initialization) {
      this.root.localStorage.removeItem(key);
      let check = this.read(key);
      if (this.logToConsole) console.log(check ? this.MESSAGES.remove.yes : this.MESSAGES.remove.no);
      if (callback && !check) callback(data);
      return !check ? true : false;
    } else {
      if (this.logToConsole) console.log(this.MESSAGES.notInitialized);
      return false;
    }
  }
}

