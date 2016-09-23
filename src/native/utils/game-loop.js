export default class GameLoop {
  loop = () => {
    this.subscribers.forEach((callback) => {
      callback.call();
    });

    this.loopID = window.requestAnimationFrame(this.loop);
  }
  constructor() {
    this.subscribers = [];
    this.loopID = null;
  }
  start() {
    if (!this.loopID) {
      this.loop();
    }
  }
  stop() {
    window.cancelAnimationFrame(this.loop);
  }
  subscribe(callback) {
    return this.subscribers.push(callback);
  }
  unsubscribe(id) {
    delete this.subscribers[id - 1];
  }
}
