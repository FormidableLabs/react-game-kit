import React, { Component, PropTypes } from 'react';

import { observer } from 'mobx-react';

import {
  Body,
  Sprite,
} from '../src';

import Matter from 'matter-js';

@observer
export default class Character extends Component {

  static propTypes = {
    keys: PropTypes.object,
    store: PropTypes.object,
  };

  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  loop = () => {
    const { keys } = this.props;

    if (keys) {

      let characterState = 2;

      if (keys.isDown(keys.LEFT)) {
        this.body.body.position.x -= 1;
        characterState = 1;
      } else if (keys.isDown(keys.RIGHT)) {
        this.body.body.position.x += 1;
        characterState = 0;
      }

      if (keys.isDown(keys.UP)) {
        Matter.Body.applyForce(
          this.body.body,
          { x: 0, y: 0 },
          { x: 0, y: -0.025 },
        );
      }

      this.props.store.setCharacterPosition(this.body.body.position);

      this.setState({
        characterState,
      });
    }

  };

  constructor(props) {
    super(props);

    this.loopID = null;

    this.state = {
      characterState: 2,
    };
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
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
          0, 400, 64, 64, { inertia: Infinity }]
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
