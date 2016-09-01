import React, { Component, PropTypes } from 'react';

export default class Sprite extends Component {

  static propTypes = {
    animating: PropTypes.bool,
    offset: PropTypes.array,
    scale: PropTypes.number,
    src: PropTypes.string,
    state: PropTypes.number,
    states: PropTypes.array,
    ticksPerFrame: PropTypes.number,
    tileHeight: PropTypes.number,
    tileWidth: PropTypes.number,
  };

  static defaultProps = {
    animating: false,
    offset: [0, 0],
    scale: 1,
    src: '',
    state: 0,
    states: [],
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

    this.state = {
      currentStep: 0,
      src: null,
    };
  }

  componentDidMount() {
    const image = new Image();
    image.onload = () => {
      this.setState({
        src: this.props.src,
      });

      const animate = this.animate.bind(this, this.props);
      this.loopID = this.context.loop.subscribe(animate);
    };

    image.src = this.props.src;
  }

  componentWillReceiveProps(nextProps) {
    this.context.loop.unsubscribe(this.loopID);
    this.tickCount = 0;

    this.setState({
      currentStep: 0,
    }, () => {
      const animate = this.animate.bind(this, nextProps);
      this.loopID = this.context.loop.subscribe(animate);
    });
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
  }

  animate(props) {
    const { ticksPerFrame, state, states } = props;

    if (this.tickCount === ticksPerFrame) {
      if (states[state] !== 0) {
        const { currentStep } = this.state;
        const lastStep = states[state];
        const nextStep = currentStep === lastStep ? 0 : currentStep + 1;

        this.setState({
          currentStep: nextStep,
        });
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
      transform: `translate(-${left}px, -${top}px)`,
      visibility: this.state.src ? 'visible' : 'hidden',
    };
  }

  getWrapperStyles() {
    return {
      height: this.props.tileHeight,
      width: this.props.tileWidth,
      overflow: 'hidden',
      position: 'relative',
      transform: `scale(${this.props.scale})`,
      transformOrigin: 'top left',
      imageRendering: 'pixelated',
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
        <img
          style={this.getImageStyles()}
          src={this.state.src}
        />
      </div>
    );
  }

}
