import React, { Component } from 'react';

import Intro from './intro';
import Game from './game';
import Slides from './slides';

export default class Presentation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: 0,
      slideIndex: 0,
    };

    this.handleStart = this.handleStart.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  render() {
    this.gameStates = [
      <Intro onStart={this.handleStart} />,
      <Game onLeave={this.handleLeave} />,
      <Slides onDone={this.handleDone} index={this.state.slideIndex} />,
    ];
    return this.gameStates[this.state.gameState];
  }

  handleStart() {
    this.setState({
      gameState: 1,
    });
  };

  handleDone() {
    this.setState({
      gameState: 1,
    });
  };

  handleLeave(index) {
    this.setState({
      gameState: 2,
      slideIndex: index,
    });
  };
}
