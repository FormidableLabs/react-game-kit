import React, { Component, PropTypes } from 'react';
import Gamepad from 'html5-gamepad';

import Slide from './slide';

const gamepad = new Gamepad();

export default class Slides extends Component {

  static propTypes = {
    onDone: PropTypes.func,
  };

  startUpdate = () => {
    gamepad.update();
    if (gamepad.button(0, 'y')) {
      this.props.onDone();
      return;
    }
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.props.onDone();
    }
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyPress);
    window.addEventListener('keypress', this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
    cancelAnimationFrame(this.animationFrame);
  }

  getWrapperStyles() {
    return {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <Slide>test</Slide>
      </div>
    );
  }
}
