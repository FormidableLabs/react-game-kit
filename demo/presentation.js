import React, { Component } from 'react';

import Intro from './intro';
import Game from './game';

export default class Presentation extends Component {
  handleStart = () => {
    this.setState({
      mode: 1,
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      mode: 0,
    };
  }
  render() {
    let componentToRender;
    switch (this.state.mode) {
    case 0: {
      componentToRender = <Intro onStart={this.handleStart}/>;
      break;
    }
    case 1: {
      componentToRender = <Game />;
    }
    }
    return componentToRender;
  }
}
