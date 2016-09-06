import React, { Component } from 'react';
import Matter from 'matter-js';

import {
  Loop,
  Stage,
  KeyListener,
  World,
} from '../../src';

import Character from './character';
import Level from './level';
import Fade from './fade';

import GameStore from './stores/game-store';

export default class Game extends Component {

  physicsInit = (engine) => {
    const ground = Matter.Bodies.rectangle(
      512 * 3, 448,
      1024 * 3, 64,
      {
        isStatic: true,
      },
    );

    const leftWall = Matter.Bodies.rectangle(
      -64, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    const rightWall = Matter.Bodies.rectangle(
      3008, 288,
      64, 576,
      {
        isStatic: true,
      },
    );

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
  }

  handleEnterBuilding = () => {
    this.setState({
      fade: true,
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      fade: true,
    };
    this.keyListener = new KeyListener();
  }

  componentDidMount() {
    this.setState({
      fade: false,
    });

    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
      this.keyListener.SPACE,
    ]);
  }

  componentWillUnmount() {
    this.keyListener.unsubscribe();
  }

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#3a9bdc' }}>
          <World
            onInit={this.physicsInit}
          >
            <Level
              store={GameStore}
            />
            <Character
              onEnterBuilding={this.handleEnterBuilding}
              store={GameStore}
              keys={this.keyListener}
            />
          </World>
        </Stage>
        <Fade visible={this.state.fade} />
      </Loop>
    );
  }

}
