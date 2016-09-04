import React, { Component, PropTypes } from 'react';

import { Engine, Events } from 'matter-js';

export default class World extends Component {

  static propTypes = {
    children: PropTypes.any,
    collisionCallback: PropTypes.func,
    gravity: PropTypes.array,
    updateCallback: PropTypes.func,
  };

  static defaultProps = {
    collisionCallback: () => {},
    gravity: [0, -25],
    updateCallback: () => {},
  };

  static contextTypes = {
    loop: PropTypes.object,
  };

  static childContextTypes = {
    world: PropTypes.object,
  };

  loop = () => {
    Engine.update(this.engine, 1000 / 60, 1);
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.lastTimeMilliSeconds = null;

    this.engine = Engine.create();
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    Events.on(this.engine, 'afterUpdate', this.props.updateCallback);
    Events.on(this.engine, 'collisionStart', this.props.collisionCallback);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
    Events.off(this.engine, 'afterUpdate', this.props.updateCallback);
    Events.off(this.engine, 'collisionStart', this.props.collisionCallback);
  }

  getChildContext() {
    return {
      world: this.engine.world,
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
