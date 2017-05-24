'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _matterJs = require('matter-js');

var _matterJs2 = _interopRequireDefault(_matterJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = (_temp = _class = function (_Component) {
  _inherits(World, _Component);

  _createClass(World, [{
    key: '__loop__REACT_HOT_LOADER__',
    value: function __loop__REACT_HOT_LOADER__() {
      var currTime = 0.001 * Date.now();
      _matterJs.Engine.update(this.engine, 1000 / 60, this.lastTime ? currTime / this.lastTime : 1);
      this.lastTime = currTime;
    }
  }]);

  function World(props) {
    _classCallCheck(this, World);

    var _this = _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this, props));

    _this.loop = function () {
      return _this.__loop__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.loopID = null;
    _this.lastTime = null;

    var world = _matterJs2.default.World.create({ gravity: props.gravity });

    _this.engine = _matterJs.Engine.create({
      world: world
    });
    return _this;
  }

  _createClass(World, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var gravity = nextProps.gravity;


      if (gravity !== this.props.gravity) {
        this.engine.world.gravity = gravity;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loopID = this.context.loop.subscribe(this.loop);
      this.props.onInit(this.engine);
      _matterJs.Events.on(this.engine, 'afterUpdate', this.props.onUpdate);
      _matterJs.Events.on(this.engine, 'collisionStart', this.props.onCollision);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.loop.unsubscribe(this.loopID);
      _matterJs.Events.off(this.engine, 'afterUpdate', this.props.onUpdate);
      _matterJs.Events.off(this.engine, 'collisionStart', this.props.onCollision);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        engine: this.engine
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      };

      return _react2.default.createElement(
        'div',
        { style: defaultStyles },
        this.props.children
      );
    }
  }]);

  return World;
}(_react.Component), _class.propTypes = {
  children: _react.PropTypes.any,
  gravity: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    scale: _react.PropTypes.number
  }),
  onCollision: _react.PropTypes.func,
  onInit: _react.PropTypes.func,
  onUpdate: _react.PropTypes.func
}, _class.defaultProps = {
  gravity: {
    x: 0,
    y: 1,
    scale: 0.001
  },
  onCollision: function onCollision() {},
  onInit: function onInit() {},
  onUpdate: function onUpdate() {}
}, _class.contextTypes = {
  scale: _react.PropTypes.number,
  loop: _react.PropTypes.object
}, _class.childContextTypes = {
  engine: _react.PropTypes.object
}, _temp);
exports.default = World;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(World, 'World', 'src/components/world.js');
}();

;