'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stage = (_temp = _class = function (_Component) {
  _inherits(Stage, _Component);

  function Stage(props) {
    _classCallCheck(this, Stage);

    var _this = _possibleConstructorReturn(this, (Stage.__proto__ || Object.getPrototypeOf(Stage)).call(this, props));

    var _Dimensions$get = _reactNative.Dimensions.get('window'),
        height = _Dimensions$get.height,
        width = _Dimensions$get.width;

    _this.state = {
      dimensions: [height, width]
    };
    return _this;
  }

  _createClass(Stage, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        scale: this.getScale().scale,
        loop: this.context.loop
      };
    }
  }, {
    key: 'getScale',
    value: function getScale() {
      var _state$dimensions = _slicedToArray(this.state.dimensions, 2),
          vheight = _state$dimensions[0],
          vwidth = _state$dimensions[1];

      var _props = this.props,
          height = _props.height,
          width = _props.width;


      var targetWidth = void 0;
      var targetHeight = void 0;
      var targetScale = void 0;

      if (height / width > vheight / vwidth) {
        targetHeight = vheight;
        targetWidth = targetHeight * width / height;
        targetScale = vheight / height;
      } else {
        targetWidth = vwidth;
        targetHeight = targetWidth * height / width;
        targetScale = vwidth / width;
      }

      return {
        height: targetHeight,
        width: targetWidth,
        scale: targetScale
      };
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      return {
        flex: 1
      };
    }
  }, {
    key: 'getInnerStyles',
    value: function getInnerStyles() {
      var scale = this.getScale();
      var xOffset = Math.floor((this.state.dimensions[1] - scale.width) / 2);
      var yOffset = Math.floor((this.state.dimensions[0] - scale.height) / 2);

      return {
        height: Math.floor(scale.height),
        width: Math.floor(scale.width),
        position: 'absolute',
        overflow: 'hidden',
        left: xOffset,
        top: yOffset
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: this.getWrapperStyles() },
        _react2.default.createElement(
          _reactNative.View,
          { style: _extends({}, this.getInnerStyles(), this.props.style) },
          this.props.children
        )
      );
    }
  }]);

  return Stage;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.any,
  height: _react.PropTypes.number,
  style: _react.PropTypes.object,
  width: _react.PropTypes.number
}, _class.defaultProps = {
  width: 1024,
  height: 576
}, _class.contextTypes = {
  loop: _react.PropTypes.object
}, _class.childContextTypes = {
  loop: _react.PropTypes.object,
  scale: _react.PropTypes.number
}, _temp);
exports.default = Stage;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Stage, 'Stage', 'src/native/components/stage.js');
}();

;