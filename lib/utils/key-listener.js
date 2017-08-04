'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyListener = function () {
  _createClass(KeyListener, [{
    key: '__down__REACT_HOT_LOADER__',
    value: function __down__REACT_HOT_LOADER__(event) {
      if (event.keyCode in this.keys) {
        event.preventDefault();
        this.keys[event.keyCode] = true;
      }
    }
  }, {
    key: '__up__REACT_HOT_LOADER__',
    value: function __up__REACT_HOT_LOADER__(event) {
      if (event.keyCode in this.keys) {
        event.preventDefault();
        this.keys[event.keyCode] = false;
      }
    }
  }, {
    key: '__isDown__REACT_HOT_LOADER__',
    value: function __isDown__REACT_HOT_LOADER__(keyCode) {
      return this.keys[keyCode] || false;
    }
  }, {
    key: '__subscribe__REACT_HOT_LOADER__',
    value: function __subscribe__REACT_HOT_LOADER__(keys) {
      var _this = this;

      window.addEventListener('keydown', this.down);
      window.addEventListener('keyup', this.up);

      keys.forEach(function (key) {
        _this.keys[key] = false;
      });
    }
  }, {
    key: '__unsubscribe__REACT_HOT_LOADER__',
    value: function __unsubscribe__REACT_HOT_LOADER__() {
      window.removeEventListener('keydown', this.down);
      window.removeEventListener('keyup', this.up);
      this.keys = {};
    }
  }]);

  function KeyListener() {
    var _this2 = this;

    _classCallCheck(this, KeyListener);

    this.LEFT = 37;
    this.RIGHT = 39;
    this.UP = 38;
    this.DOWN = 40;
    this.SPACE = 32;

    this.down = function () {
      return _this2.__down__REACT_HOT_LOADER__.apply(_this2, arguments);
    };

    this.up = function () {
      return _this2.__up__REACT_HOT_LOADER__.apply(_this2, arguments);
    };

    this.isDown = function () {
      return _this2.__isDown__REACT_HOT_LOADER__.apply(_this2, arguments);
    };

    this.subscribe = function () {
      return _this2.__subscribe__REACT_HOT_LOADER__.apply(_this2, arguments);
    };

    this.unsubscribe = function () {
      return _this2.__unsubscribe__REACT_HOT_LOADER__.apply(_this2, arguments);
    };

    this.keys = {};
  }

  return KeyListener;
}();

exports.default = KeyListener;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(KeyListener, 'KeyListener', 'src/utils/key-listener.js');
}();

;