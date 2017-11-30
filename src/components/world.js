import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Matter, { Engine, Events } from 'matter-js';

export default class World extends Component {
  static propTypes = {
    children: PropTypes.any,
    gravity: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      scale: PropTypes.number,
    }),
    onCollision: PropTypes.func,
    onInit: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    gravity: {
      x: 0,
      y: 1,
      scale: 0.001,
    },
    onCollision: () => {},
    onInit: () => {},
    onUpdate: () => {},
  };

  static contextTypes = {
    scale: PropTypes.number,
    loop: PropTypes.object,
  };

  static childContextTypes = {
    engine: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.lastTime = null;

    const world = Matter.World.create({ gravity: props.gravity });

    this.engine = Engine.create({
      world,
    });

    this.loop = this.loop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { gravity } = nextProps;

    if (gravity !== this.props.gravity) {
      this.engine.world.gravity = gravity;
    }
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    this.props.onInit(this.engine);
    Events.on(this.engine, 'afterUpdate', this.props.onUpdate);
    Events.on(this.engine, 'collisionStart', this.props.onCollision);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
    Events.off(this.engine, 'afterUpdate', this.props.onUpdate);
    Events.off(this.engine, 'collisionStart', this.props.onCollision);
  }

  getChildContext() {
    return {
      engine: this.engine,
    };
  }

  render() {
    const defaultStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    };

    return <div style={defaultStyles}>{this.props.children}</div>;
  }

  loop() {
    const currTime = 0.001 * Date.now();
    Engine.update(
      this.engine,
      1000 / 60,
      this.lastTime ? currTime / this.lastTime : 1
    );
    this.lastTime = currTime;
  }
}
