import React, { Component, PropTypes } from 'react';

import GameLoop from '../utils/game-loop';

export default class Game extends Component {

  static propTypes = {
    children: PropTypes.any,
    stageHeight: PropTypes.number,
    stageWidth: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    stageWidth: 1024,
    stageHeight: 768,
  };

  static childContextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.container = null;
    this.loop = new GameLoop();
  }

  componentDidMount() {
    this.loop.start();
  }

  componentWillUnmount() {
    this.loop.stop();
  }

  getChildContext() {
    const { container } = this;
    const { stageWidth, stageHeight } = this.props;

    if (!container) {
      return {
        scale: 0,
        loop: this.loop,
      };
    }

    const xScale = container.offsetWidth / stageWidth;
    const yScale = container.offsetHeight / stageHeight;

    return {
      scale: Math.max(xScale, yScale),
      loop: this.loop,
    };
  }

  render() {
    const defaultStyles = {
      height: '100%',
      width: '100%',
    };
    const styles = { ...defaultStyles, ...this.props.style };
    return (
      <div style={styles} ref={(c) => { this.container = c; }}>
        {this.props.children}
      </div>
    );
  }

}
