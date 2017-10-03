import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';

import { AudioPlayer, Loop, Stage, KeyListener, World } from '../../src';

import Character from './character';
import Level from './level';
import Fade from './fade';

import GameStore from './stores/game-store';

const KEY_D = 68;
const KEY_A = 65;

export default class Game extends Component {
  static propTypes = {
    onLeave: PropTypes.func,
  };

  physicsInit = engine => {
    const ground = Matter.Bodies.rectangle(512 * 3, 448, 1024 * 3, 64, {
      isStatic: true,
    });

    const leftWall = Matter.Bodies.rectangle(-64, 288, 64, 576, {
      isStatic: true,
    });

    const rightWall = Matter.Bodies.rectangle(3008, 288, 64, 576, {
      isStatic: true,
    });

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);

    Matter.Events.on(engine, 'afterUpdate', this.update);

    this.unsubscribeFromUpdate = () => {
      Matter.Events.off(engine, 'afterUpdate', this.update);
    };
  };

  handleEnterBuilding = index => {
    this.setState({
      fade: true,
    });
    setTimeout(() => {
      this.props.onLeave(index);
    }, 500);
  };

  update = () => {
    // On first press of "d", enable debug mode
    if (this.keyListener.isDown(KEY_D)) {
      if (!this.previousDown) {
        this.previousDown = true;
        this.setState({ debug: !this.state.debug });
      }
    } else {
      this.previousDown = false;
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      fade: true,
      debug: false,
    };

    this.keyListener = new KeyListener();
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.context = window.context || new AudioContext();
  }

  componentDidMount() {
    this.player = new AudioPlayer('/assets/music.wav', () => {
      this.stopMusic = this.player.play({
        loop: true,
        offset: 1,
        volume: 0.35,
      });
    });

    this.setState({
      fade: false,
    });

    this.stageXUIUnsubscribe = GameStore.onStageXChange(stageX => {
      this.forceUpdate();
    });

    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
      this.keyListener.SPACE,
      KEY_A,
      KEY_D,
    ]);
  }

  componentWillUnmount() {
    this.stopMusic();
    this.unsubscribeFromUpdate();
    this.keyListener.unsubscribe();
    this.stageXUIUnsubscribe();
  }

  render() {
    return (
      <Loop>
        <Stage style={{ background: '#3a9bdc' }}>
          <World
            onInit={this.physicsInit}
            debug={
              this.state.debug ? (
                {
                  offset: {
                    x: -GameStore.stageX,
                    y: 0,
                  },
                  background: 'rgba(0, 0, 0, 0.5)',
                }
              ) : null
            }
          >
            <Level store={GameStore} />
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
