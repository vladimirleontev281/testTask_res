export default class {
  constructor() {
    this.chatKey = 'task4Chat';
    Object.defineProperty(this, "chatKey", {
      writable: false,
      enumerable: true,
      configurable: false
    });

    this.root = window;
    Object.defineProperty(this, "root", {
      writable: false,
      enumerable: true,
      configurable: false
    });

    if (!this.root.localStorage.getItem(this.chatKey)) {
      this.root.localStorage.setItem(this.chatKey, JSON.stringify([]));
    };
  }

  writeMessage(user, text) {
    let chat = JSON.parse(this.root.localStorage.getItem(this.chatKey));
    chat.push({user, text});
    this.root.localStorage.setItem(this.chatKey, JSON.stringify(chat));
  }

  read() {
    return JSON.parse(this.root.localStorage.getItem(this.chatKey));
  }
}


