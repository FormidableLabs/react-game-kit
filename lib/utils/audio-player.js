'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-console */
var AudioPlayer = function () {
  function AudioPlayer(url, callback) {
    var _this = this;

    _classCallCheck(this, AudioPlayer);

    this.play = function () {
      return _this.__play__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    this.loadBuffer = function () {
      return _this.__loadBuffer__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    this.url = url || null;
    this.callback = callback || function () {};

    this.buffer = null;

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = window.context || new AudioContext();

    this.loadBuffer();
  }

  _createClass(AudioPlayer, [{
    key: '__play__REACT_HOT_LOADER__',
    value: function __play__REACT_HOT_LOADER__(options) {
      var volume = options && options.volume;
      var offset = options && options.offset;
      var loop = options && options.loop;

      var source = this.context.createBufferSource();
      var gainNode = this.context.createGain();
      gainNode.gain.value = volume || 0.5;

      gainNode.connect(this.context.destination);
      source.connect(gainNode);

      source.buffer = this.buffer;
      source.start(offset ? this.context.currentTime + offset : 0);
      source.loop = loop || false;
      return source.stop.bind(source);
    }
  }, {
    key: '__loadBuffer__REACT_HOT_LOADER__',
    value: function __loadBuffer__REACT_HOT_LOADER__() {
      var _this2 = this;

      var request = new XMLHttpRequest();
      request.open('GET', this.url, true);
      request.responseType = 'arraybuffer';

      request.onload = function () {
        _this2.context.decodeAudioData(request.response, function (buffer) {
          if (!buffer) {
            console.error('error decoding file data: ' + _this2.url);
            return;
          }
          _this2.buffer = buffer;
          _this2.callback();
        }, function (error) {
          console.error('decodeAudioData error', error);
        });
      };

      request.onerror = function onError() {
        console.error('BufferLoader: XHR error');
      };

      request.send();
    }
  }]);

  return AudioPlayer;
}();

exports.default = AudioPlayer;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AudioPlayer, 'AudioPlayer', 'src/utils/audio-player.js');
}();

;