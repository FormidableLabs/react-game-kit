'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _gameLoop = require('../utils/game-loop');

var _gameLoop2 = _interopRequireDefault(_gameLoop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loop = (_temp = _class = function (_Component) {
  _inherits(Loop, _Component);

  function Loop(props) {
    _classCallCheck(this, Loop);

    var _this = _possibleConstructorReturn(this, (Loop.__proto__ || Object.getPrototypeOf(Loop)).call(this, props));

    _this.loop = new _gameLoop2.default();
    return _this;
  }

  _createClass(Loop, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loop.start();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.loop.stop();
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        loop: this.loop
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultStyles = {
        flex: 1
      };
      var styles = _extends({}, defaultStyles, this.props.style);
      return _react2.default.createElement(
        _reactNative.View,
        { style: styles },
        this.props.children
      );
    }
  }]);

  return Loop;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.any,
  style: _react.PropTypes.object
}, _class.childContextTypes = {
  loop: _react.PropTypes.object
}, _temp);
exports.default = Loop;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Loop, 'Loop', 'src/native/components/loop.js');
}();

;