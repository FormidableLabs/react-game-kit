import React, { Component } from 'react';

import {
  Loop,
  Stage,
  KeyListener,
  World,
} from '../src';

import Character from './character';
import Level from './level';
import GameStore from './stores/game-store';

import './index.css';

import Matter from 'matter-js';

export default class Demo extends Component {

  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      448 * 2, 448,
      1024 * 2, 64,
      {
        isStatic: true,
      },
    );

    const leftWall = Matter.Bodies.rectangle(
      -96, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    const rightWall = Matter.Bodies.rectangle(
      992, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }
  constructor(props) {
    super(props);

    this.keyListener = new KeyListener();
  }
  componentDidMount() {
    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.SPACE,
    ]);
  }
  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }
  render() {
    return (
      <Loop>
        <Stage>
          <World
            onInit={this.physicsInit}
          >
            <Level
              store={GameStore}
            />
            <Character
              store={GameStore}
              keys={this.keyListener}
            />
          </World>
        </Stage>
      </Loop>
    );
  }

}
