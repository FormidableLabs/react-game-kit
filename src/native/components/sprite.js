import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Image } from 'react-native';

export default class Sprite extends Component {

  static propTypes = {
    offset: PropTypes.array,
    onPlayStateChanged: PropTypes.func,
    repeat: PropTypes.bool,
    scale: PropTypes.number,
    src: PropTypes.string,
    state: PropTypes.number,
    steps: PropTypes.array,
    style: PropTypes.object,
    ticksPerFrame: PropTypes.number,
    tileHeight: PropTypes.number,
    tileWidth: PropTypes.number,
  };

  static defaultProps = {
    offset: [0, 0],
    onPlayStateChanged: () => {},
    repeat: true,
    src: '',
    state: 0,
    steps: [],
    ticksPerFrame: 4,
    tileHeight: 64,
    tileWidth: 64,
  };

  static contextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.tickCount = 0;
    this.finished = false;

    this.state = {
      currentStep: 0,
    };
  }

  componentDidMount() {
    this.props.onPlayStateChanged(1);
    const animate = this.animate.bind(this, this.props);
    this.loopID = this.context.loop.subscribe(animate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state !== this.props.state) {
      this.finished = false;
      this.props.onPlayStateChanged(1);
      this.context.loop.unsubscribe(this.loopID);
      this.tickCount = 0;

      this.setState({
        currentStep: 0,
      }, () => {
        const animate = this.animate.bind(this, nextProps);
        this.loopID = this.context.loop.subscribe(animate);
      });
    }
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  animate(props) {
    const { repeat, ticksPerFrame, state, steps } = props;

    if (this.tickCount === ticksPerFrame && !this.finished) {
      if (steps[state] !== 0) {
        const { currentStep } = this.state;
        const lastStep = steps[state];
        const nextStep = currentStep === lastStep ? 0 : currentStep + 1;

        this.setState({
          currentStep: nextStep,
        });

        if (currentStep === lastStep && repeat === false) {
          this.finished = true;
          this.props.onPlayStateChanged(0);
        }
      }

      this.tickCount = 0;
    } else {
      this.tickCount++;
    }

  }

  getImageStyles() {
    const { currentStep } = this.state;
    const { state, tileWidth, tileHeight } = this.props;

    const left = this.props.offset[0] + (currentStep * tileWidth);
    const top = this.props.offset[1] + (state * tileHeight);

    return {
      position: 'absolute',
      transform: [
        { translateX: left * -1 },
        { translateY: top * -1 },
      ],
    };
  }

  getWrapperStyles() {
    const scale = this.props.scale || this.context.scale;
    return {
      height: this.props.tileHeight,
      width: this.props.tileWidth,
      overflow: 'hidden',
      position: 'relative',
      transform: [{ scale }],
    };
  }

  render() {
    return (
      <View style={{ ...this.getWrapperStyles(), ...this.props.style }}>
        <Image
          style={this.getImageStyles()}
          source={this.props.src}
        />
      </View>
    );
  }

}
