export default class {
  constructor(inputRoot) {
    this.init = false;

    this.chatKey = 'task4Chat';
    Object.defineProperty(this, "chatKey", {
      writable: true,
      enumerable: true,
      configurable: false
    });

    this.root = inputRoot || window;
    Object.defineProperty(this, "root", {
      writable: true,
      enumerable: true,
      configurable: false
    });
  }

  initChat() {
    if (!this.root.localStorage.getItem(this.chatKey)) this.createChat();
    this.init = true;
  }

  createChat() {
    let obj = [];
    this.root.localStorage.setItem(this.chatKey, JSON.stringify(obj));
  }

  writeMessage(user, text) {
    if (!this.init) {
      this.initChat();
    }
    let chat = JSON.parse(this.root.localStorage.getItem(this.chatKey));
    chat.push({user, text});
    this.root.localStorage.setItem(this.chatKey, JSON.stringify(chat));
  }

  read() {
    return (this.init) ? JSON.parse(this.root.localStorage.getItem(this.chatKey)): null;
  }
}


