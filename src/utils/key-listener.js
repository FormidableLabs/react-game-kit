export default class KeyListener {

  LEFT = 37;
  RIGHT = 39;
  UP = 38;
  DOWN = 40;
  SPACE = 32;

  constructor() {
    this.keys = {};

    this.down = this.down.bind(this);
    this.up = this.up.bind(this);
    this.isDown = this.isDown.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  down(event) {
    if (event.keyCode in this.keys) {
      event.preventDefault();
      this.keys[event.keyCode] = true;
    }
  }

  up(event) {
    if (event.keyCode in this.keys) {
      event.preventDefault();
      this.keys[event.keyCode] = false;
    }
  }

  isDown(keyCode) {
    return this.keys[keyCode] || false;
  }

  subscribe(keys) {
    window.addEventListener('keydown', this.down);
    window.addEventListener('keyup', this.up);

    keys.forEach((key) => {
      this.keys[key] = false;
    });
  }

  unsubscribe() {
    window.removeEventListener('keydown', this.down);
    window.removeEventListener('keyup', this.up);
    this.keys = {};
  }
}
