import React, { Component } from 'react';

import {
  Loop,
  Camera,
  KeyListener,
  World,
} from '../src';

import Character from './character';
import Level from './level';
import GameStore from './stores/game-store';

import './index.css';

export default class Demo extends Component {
  constructor(props) {
    super(props);

    this.keyListener = new KeyListener();
  }
  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
    ]);
  }
  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }
  render() {
    return (
      <Loop>
        <Camera>
          <World>
            <Level />
            <Character
              store={GameStore}
              keys={this.keyListener}
            />
          </World>
        </Camera>
      </Loop>
    );
  }

}
