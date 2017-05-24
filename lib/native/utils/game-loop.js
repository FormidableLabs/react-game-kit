"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameLoop = function () {
  _createClass(GameLoop, [{
    key: "__loop__REACT_HOT_LOADER__",
    value: function __loop__REACT_HOT_LOADER__() {
      this.subscribers.forEach(function (callback) {
        callback.call();
      });

      this.loopID = window.requestAnimationFrame(this.loop);
    }
  }]);

  function GameLoop() {
    var _this = this;

    _classCallCheck(this, GameLoop);

    this.loop = function () {
      return _this.__loop__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    this.subscribers = [];
    this.loopID = null;
  }

  _createClass(GameLoop, [{
    key: "start",
    value: function start() {
      if (!this.loopID) {
        this.loop();
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      window.cancelAnimationFrame(this.loop);
    }
  }, {
    key: "subscribe",
    value: function subscribe(callback) {
      return this.subscribers.push(callback);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(id) {
      delete this.subscribers[id - 1];
    }
  }]);

  return GameLoop;
}();

exports.default = GameLoop;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(GameLoop, "GameLoop", "src/native/utils/game-loop.js");
}();

;