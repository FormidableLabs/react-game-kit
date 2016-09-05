import React, { Component, PropTypes } from 'react';

import { Engine, Events } from 'matter-js';

export default class World extends Component {

  static propTypes = {
    children: PropTypes.any,
    gravity: PropTypes.array,
    onCollision: PropTypes.func,
    onInit: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    gravity: [0, -25],
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

  loop = () => {
    const currTime = 0.001 * Date.now();
    Engine.update(this.engine, 1000 / 60, this.lastTime ? currTime / this.lastTime : 1);
    this.lastTime = currTime;
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.lastTime = null;

    this.engine = Engine.create();
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

    return (
      <div style={defaultStyles}>
        {this.props.children}
      </div>
    );
  }

}
