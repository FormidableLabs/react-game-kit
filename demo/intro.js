import React, { Component, PropTypes } from 'react';
import Gamepad from 'html5-gamepad';

import { AudioPlayer } from '../src';

const gamepad = new Gamepad();

export default class Intro extends Component {
  static propTypes = {
    onStart: PropTypes.func,
  };

  startUpdate = () => {
    gamepad.update();
    if (gamepad.button(0, 'left stick')) {
      this.startNoise.play();
      this.props.onStart();
      return;
    }
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this.startNoise.play();
      this.props.onStart();
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      blink: false,
    };
  }

  componentDidMount() {
    this.startNoise = new AudioPlayer('/assets/start.wav');
    window.addEventListener('keypress', this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
    this.interval = setInterval(() => {
      this.setState({
        blink: !this.state.blink,
      });
    }, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
    cancelAnimationFrame(this.animationFrame);
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <img className="intro" src="assets/intro.png"/>
        <p
          className="start"
          style={{ display: this.state.blink ? 'block' : 'none' }}
        >
            Press Start
        </p>
      </div>
    );
  }
}
