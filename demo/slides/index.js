import React, { Component, PropTypes } from 'react';
import Gamepad from 'html5-gamepad';

import Basics from './basics';

const slides = [Basics];

const gamepad = new Gamepad();

export default class Slides extends Component {

  static propTypes = {
    index: PropTypes.number,
    onDone: PropTypes.func,
  };

  restartLoop = () => {
    setTimeout(() => {
      this.startUpdate();
    }, 300);
  }

  startUpdate = () => {
    gamepad.update();
    if (gamepad.button(0, 'y')) {
      this.props.onDone();
      return;
    }

    if (gamepad.button(0, 'button 14')) {
      this.handlePrev();
      return;
    }

    if (gamepad.button(0, 'button 15')) {
      this.handleNext();
      return;
    }

    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      this.props.onDone();
    }

    if (e.keyCode === 37) {
      this.handlePrev();
    }

    if (e.keyCode === 39) {
      this.handleNext();
    }
  }

  handleNext() {
    const { currentSlide } = this.state;
    const { index } = this.props;

    if (currentSlide + 1 === slides[index].slides.length) {
      this.props.onDone();
    } else {
      this.setState({
        currentSlide: currentSlide + 1,
      }, () => {
        this.restartLoop();
      });
    }
  }

  handlePrev() {
    const { currentSlide } = this.state;

    if (currentSlide !== 0) {
      this.setState({
        currentSlide: currentSlide - 1,
      }, () => {
        this.restartLoop();
      });
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyPress);
    window.addEventListener('keypress', this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyPress);
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
        {slides[this.props.index].slides[this.state.currentSlide]}
      </div>
    );
  }
}
