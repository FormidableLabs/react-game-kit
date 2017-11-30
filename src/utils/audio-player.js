/* eslint-disable no-console */
export default class AudioPlayer {
  constructor(url, callback) {
    this.url = url || null;
    this.callback = callback || function () {};

    this.buffer = null;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = window.context || new AudioContext();

    this.loadBuffer();
  }

  play(options) {
    const volume = options && options.volume;
    const offset = options && options.offset;
    const loop = options && options.loop;

    const source = this.context.createBufferSource();
    const gainNode = this.context.createGain();
    gainNode.gain.value = volume || 0.5;

    gainNode.connect(this.context.destination);
    source.connect(gainNode);

    source.buffer = this.buffer;
    source.start(offset ? this.context.currentTime + offset : 0);
    source.loop = loop || false;
    return source.stop.bind(source);
  }


  loadBuffer() {
    const request = new XMLHttpRequest();
    request.open('GET', this.url, true);
    request.responseType = 'arraybuffer';

    request.onload = () => {
      this.context.decodeAudioData(
        request.response,
        (buffer) => {
          if (!buffer) {
            console.error(`error decoding file data: ${this.url}`);
            return;
          }
          this.buffer = buffer;
          this.callback();
        },
        (error) => {
          console.error('decodeAudioData error', error);
        }
      );
    };

    request.onerror = function onError() {
      console.error('BufferLoader: XHR error');
    };

    request.send();
  }
}
