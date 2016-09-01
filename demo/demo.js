import React, { Component } from 'react';

import {
  Game,
  Keys,
} from '../src';

import Character from './character';

import './index.css';

export default class Demo extends Component {

  handleInput = (e) => {
    switch (e.keyCode) {
    case '37':
      // left
      break;
    case '39':
      // right
      break;
    default:
      break;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      character: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const state = this.state.character === 2 ? 0 : this.state.character + 1;
    this.setState({
      character: state,
    });
  }

  render() {
    return (
      <Game>
        <Keys onInput={this.handleInput} />
        <Character state={this.state.character}/>
        {this.state.character}
        <button style={{ marginTop: 200 }}onClick={this.handleClick} type="button">Toggle</button>
      </Game>
    );
  }

}
