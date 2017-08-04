'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _matterJs = require('matter-js');

var _matterJs2 = _interopRequireDefault(_matterJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = (_temp = _class = function (_Component) {
  _inherits(Body, _Component);

  function Body(props, context) {
    _classCallCheck(this, Body);

    var _this = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, props));

    var args = props.args,
        children = props.children,
        shape = props.shape,
        options = _objectWithoutProperties(props, ['args', 'children', 'shape']);

    _this.body = _matterJs.Bodies[shape].apply(_matterJs.Bodies, _toConsumableArray(args).concat([options]));
    _matterJs.World.addBody(context.engine.world, _this.body);
    return _this;
  }

  _createClass(Body, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var args = nextProps.args,
          children = nextProps.children,
          shape = nextProps.shape,
          options = _objectWithoutProperties(nextProps, ['args', 'children', 'shape']);

      Object.keys(options).forEach(function (option) {
        if (option in _this2.body && _this2.props[option] !== nextProps[option]) {
          _matterJs2.default.Body.set(_this2.body, option, options[option]);
        }
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _matterJs.World.remove(this.context.engine.world, this.body);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        body: this.body
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Body;
}(_react.Component), _class.propTypes = {
  angle: _react.PropTypes.number,
  area: _react.PropTypes.string,
  args: _react.PropTypes.array,
  axes: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),
  bounds: _react.PropTypes.shape({
    min: _react.PropTypes.shape({
      x: _react.PropTypes.number,
      y: _react.PropTypes.number
    }),
    max: _react.PropTypes.shape({
      x: _react.PropTypes.number,
      y: _react.PropTypes.number
    })
  }),
  children: _react.PropTypes.any,
  collisionFilter: _react.PropTypes.shape({
    category: _react.PropTypes.number,
    group: _react.PropTypes.number,
    mask: _react.PropTypes.number
  }),
  density: _react.PropTypes.number,
  force: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),
  friction: _react.PropTypes.number,
  frictionAir: _react.PropTypes.number,
  frictionStatic: _react.PropTypes.number,
  id: _react.PropTypes.number,
  inertia: _react.PropTypes.number,
  inverseInertia: _react.PropTypes.number,
  inverseMass: _react.PropTypes.number,
  isSensor: _react.PropTypes.bool,
  isSleeping: _react.PropTypes.bool,
  isStatic: _react.PropTypes.bool,
  label: _react.PropTypes.string,
  mass: _react.PropTypes.number,
  position: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),
  restitution: _react.PropTypes.number,
  shape: _react.PropTypes.string,
  sleepThreshold: _react.PropTypes.number,
  slop: _react.PropTypes.number,
  slope: _react.PropTypes.number,
  timeScale: _react.PropTypes.number,
  torque: _react.PropTypes.number,
  vertices: _react.PropTypes.array
}, _class.defaultProps = {
  args: [0, 0, 100, 100],
  restitution: 0,
  friction: 1,
  frictionStatic: 0,
  shape: 'rectangle'
}, _class.contextTypes = {
  engine: _react.PropTypes.object
}, _class.childContextTypes = {
  body: _react.PropTypes.object
}, _temp);
exports.default = Body;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Body, 'Body', 'src/native/components/body.js');
}();

;