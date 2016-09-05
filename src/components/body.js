import { Component, PropTypes } from 'react';

import { World, Bodies } from 'matter-js';

export default class Body extends Component {

  static propTypes = {
    args: PropTypes.array,
    children: PropTypes.any,
    shape: PropTypes.string,
  };

  static defaultProps = {
    args: [0, 0, 100, 100],
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

    this.body = Bodies[props.shape](...props.args);
    World.addBody(context.engine.world, this.body);
  }

  componentWillUnmount() {
    World.removeBody(this.context.engine.world, this.body);
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
