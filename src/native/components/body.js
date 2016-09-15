import { Component, PropTypes } from 'react';

import Matter, { World, Bodies } from 'matter-js';

export default class Body extends Component {

  static propTypes = {
    angle: PropTypes.number,
    area: PropTypes.string,
    args: PropTypes.array,
    axes: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    bounds: PropTypes.shape({
      min: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      max: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
    }),
    children: PropTypes.any,
    collisionFilter: PropTypes.shape({
      category: PropTypes.number,
      group: PropTypes.number,
      mask: PropTypes.number,
    }),
    density: PropTypes.number,
    force: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    friction: PropTypes.number,
    frictionAir: PropTypes.number,
    frictionStatic: PropTypes.number,
    id: PropTypes.number,
    inertia: PropTypes.number,
    inverseInertia: PropTypes.number,
    inverseMass: PropTypes.number,
    isSensor: PropTypes.bool,
    isSleeping: PropTypes.bool,
    isStatic: PropTypes.bool,
    label: PropTypes.string,
    mass: PropTypes.number,
    position: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    restitution: PropTypes.number,
    shape: PropTypes.string,
    sleepThreshold: PropTypes.number,
    slop: PropTypes.number,
    slope: PropTypes.number,
    timeScale: PropTypes.number,
    torque: PropTypes.number,
    vertices: PropTypes.array,
  };

  static defaultProps = {
    args: [0, 0, 100, 100],
    restitution: 0,
    friction: 1,
    frictionStatic: 0,
    shape: 'rectangle',
  };

  static contextTypes = {
    engine: PropTypes.object,
  };

  static childContextTypes = {
    body: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    const { args, children, shape, ...options } = props;

    this.body = Bodies[shape](...args, options);
    World.addBody(context.engine.world, this.body);
  }

  componentWillReceiveProps(nextProps) {
    const { args, children, shape, ...options } = nextProps;

    Object.keys(options).forEach((option) => {
      if (option in this.body && this.props[option] !== nextProps[option]) {
        Matter.Body.set(this.body, option, options[option]);
      }
    });
  }

  componentWillUnmount() {
    World.remove(this.context.engine.world, this.body);
  }

  getChildContext() {
    return {
      body: this.body,
    };
  }

  render() {
    return this.props.children;
  }

}
