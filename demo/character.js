import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import Gamepad from 'html5-gamepad';
import Matter from 'matter-js';

import {
  Body,
  Sprite,
} from '../src';

const gamepad = new Gamepad();

@observer
export default class Character extends Component {

  static propTypes = {
    keys: PropTypes.object,
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  move = (body, x) => {
    Matter.Body.setVelocity(body, { x, y: 0 });
  };

  jump = (body) => {
    this.isJumping = true;
    Matter.Body.applyForce(
      body,
      { x: 0, y: 0 },
      { x: 0, y: -0.15 },
    );
    Matter.Body.set(body, 'friction', 0);
  }

  update = () => {
    const { keys, store } = this.props;
    const { body } = this.body;

    const shouldMoveStageLeft = body.position.x < 448 && store.stageX < 0;
    const shouldMoveStageRight = body.position.x > 448 && store.stageX > -1024;

    if (body.velocity.y === 0) {
      this.isJumping = false;
      Matter.Body.set(body, 'friction', 1);
    }

    if (keys && !this.isJumping) {

      let characterState = 2;

      gamepad.update();

      if (keys.isDown(keys.SPACE) || gamepad.button(0, 'a')) {
        this.jump(body);
      }

      if (keys.isDown(keys.LEFT) || gamepad.button(0, 'button 14')) {
        if (shouldMoveStageLeft) {
          store.setStageX(store.stageX + 5);
        } else {
          this.move(body, -5);
        }

        characterState = 1;
      } else if (keys.isDown(keys.RIGHT) || gamepad.button(0, 'button 15')) {
        if (shouldMoveStageRight) {
          store.setStageX(store.stageX - 5);
        } else {
          this.move(body, 5);
        }

        characterState = 0;
      }

      store.setCharacterPosition(body.position);

      this.setState({
        characterState,
      });
    }
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.isJumping = false;

    this.state = {
      characterState: 2,
    };
  }

  componentDidMount() {
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { characterPosition } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition;

    return {
      position: 'absolute',
      transform: `translate(${x * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <Body args={[
          0, 384, 64, 64, { inertia: Infinity, restitution: 0, friction: 1, frictionStatic: 0 }]
          }
          ref={(b) => { this.body = b; }}
        >
          <Sprite
            animating
            src="assets/character-sprite.png"
            scale={this.context.scale * 2}
            state={this.state.characterState}
            states={[9, 9, 0]}
          />
        </Body>
      </div>
    );
  }
}
