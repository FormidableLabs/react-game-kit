export default class GameLoop {
  constructor() {
    this.subscribers = [];
    this.loopID = null;
    this.loop = this.loop.bind(this);
  }

  loop() {
    this.subscribers.forEach((callback) => {
      callback.call();
    });

    this.loopID = window.requestAnimationFrame(this.loop);
  }

  start() {
    if (!this.loopID) {
      this.loop();
    }
  }

  stop() {
    if (!this.loopID) {
      window.cancelAnimationFrame(this.loopID);
      this.loopID = null;
    }
  }

  subscribe(callback) {
    return this.subscribers.push(callback);
  }

  unsubscribe(id) {
    this.subscribers.splice((id - 1), 1);
  }
}
