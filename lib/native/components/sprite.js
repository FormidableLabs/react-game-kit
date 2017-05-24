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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sprite = (_temp = _class = function (_Component) {
  _inherits(Sprite, _Component);

  function Sprite(props) {
    _classCallCheck(this, Sprite);

    var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, props));

    _this.loopID = null;
    _this.tickCount = 0;
    _this.finished = false;

    _this.state = {
      currentStep: 0
    };
    return _this;
  }

  _createClass(Sprite, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onPlayStateChanged(1);
      var animate = this.animate.bind(this, this.props);
      this.loopID = this.context.loop.subscribe(animate);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.state !== this.props.state) {
        this.finished = false;
        this.props.onPlayStateChanged(1);
        this.context.loop.unsubscribe(this.loopID);
        this.tickCount = 0;

        this.setState({
          currentStep: 0
        }, function () {
          var animate = _this2.animate.bind(_this2, nextProps);
          _this2.loopID = _this2.context.loop.subscribe(animate);
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.loop.unsubscribe(this.loopID);
    }
  }, {
    key: 'animate',
    value: function animate(props) {
      var repeat = props.repeat,
          ticksPerFrame = props.ticksPerFrame,
          state = props.state,
          steps = props.steps;


      if (this.tickCount === ticksPerFrame && !this.finished) {
        if (steps[state] !== 0) {
          var currentStep = this.state.currentStep;

          var lastStep = steps[state];
          var nextStep = currentStep === lastStep ? 0 : currentStep + 1;

          this.setState({
            currentStep: nextStep
          });

          if (currentStep === lastStep && repeat === false) {
            this.finished = true;
            this.props.onPlayStateChanged(0);
          }
        }

        this.tickCount = 0;
      } else {
        this.tickCount++;
      }
    }
  }, {
    key: 'getImageStyles',
    value: function getImageStyles() {
      var currentStep = this.state.currentStep;
      var _props = this.props,
          state = _props.state,
          tileWidth = _props.tileWidth,
          tileHeight = _props.tileHeight;


      var left = this.props.offset[0] + currentStep * tileWidth;
      var top = this.props.offset[1] + state * tileHeight;

      return {
        position: 'absolute',
        transform: [{ translateX: left * -1 }, { translateY: top * -1 }]
      };
    }
  }, {
    key: 'getWrapperStyles',
    value: function getWrapperStyles() {
      var scale = this.props.scale || this.context.scale;
      return {
        height: this.props.tileHeight,
        width: this.props.tileWidth,
        overflow: 'hidden',
        position: 'relative',
        transform: [{ scale: scale }]
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactNative.View,
        { style: _extends({}, this.getWrapperStyles(), this.props.style) },
        _react2.default.createElement(_reactNative.Image, {
          style: this.getImageStyles(),
          source: this.props.src
        })
      );
    }
  }]);

  return Sprite;
}(_react.Component), _class.propTypes = {
  offset: _react.PropTypes.array,
  onPlayStateChanged: _react.PropTypes.func,
  repeat: _react.PropTypes.bool,
  scale: _react.PropTypes.number,
  src: _react.PropTypes.number,
  state: _react.PropTypes.number,
  steps: _react.PropTypes.array,
  style: _react.PropTypes.object,
  ticksPerFrame: _react.PropTypes.number,
  tileHeight: _react.PropTypes.number,
  tileWidth: _react.PropTypes.number
}, _class.defaultProps = {
  offset: [0, 0],
  onPlayStateChanged: function onPlayStateChanged() {},
  repeat: true,
  src: '',
  state: 0,
  steps: [],
  ticksPerFrame: 4,
  tileHeight: 64,
  tileWidth: 64
}, _class.contextTypes = {
  loop: _react.PropTypes.object,
  scale: _react.PropTypes.number
}, _temp);
exports.default = Sprite;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Sprite, 'Sprite', 'src/native/components/sprite.js');
}();

;