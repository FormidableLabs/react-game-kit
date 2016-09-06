import React, { Component, PropTypes } from 'react';
import Gamepad from 'html5-gamepad';

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
    window.addEventListener('keypress', this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
    cancelAnimationFrame(this.animationFrame);
  }

  render() {
    return (
      <div>
        <p>Ayy whatup</p>
      </div>
    );
  }
}
