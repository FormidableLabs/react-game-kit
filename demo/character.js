import React, { Component, PropTypes } from 'react';

import {
  Sprite,
} from '../src';

export default class Character extends Component {
  static propTypes = {
    state: PropTypes.number,
  };
  render() {
    return (
      <Sprite
        animating
        src="assets/character-sprite.png"
        scale={4}
        state={this.props.state}
        states={[9, 9, 0]}
      />
    );
  }
}
