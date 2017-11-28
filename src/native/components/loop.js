import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
} from 'react-native';

import GameLoop from '../utils/game-loop';

export default class Loop extends Component {

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
  };

  static childContextTypes = {
    loop: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.loop = new GameLoop();
  }

  componentDidMount() {
    this.loop.start();
  }

  componentWillUnmount() {
    this.loop.stop();
  }

  getChildContext() {
    return {
      loop: this.loop,
    };
  }

  render() {
    const defaultStyles = {
      flex: 1,
    };
    const styles = { ...defaultStyles, ...this.props.style };
    return (
      <View style={styles}>
        {this.props.children}
      </View>
    );
  }

}
