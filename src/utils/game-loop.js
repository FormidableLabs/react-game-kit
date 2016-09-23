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
    window.cancelAnimationFrame(this.loopID);
  }
  subscribe(callback) {
    return this.subscribers.push(callback);
  }
  unsubscribe(id) {
    this.subscribers.splice(this.subscribers.indexOf(id), 1);
  }
}
