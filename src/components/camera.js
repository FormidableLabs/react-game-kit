import React, { Component, PropTypes } from 'react';

export default class Game extends Component {

  static propTypes = {
    children: PropTypes.any,
    height: PropTypes.number,
    style: PropTypes.object,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    width: 1024,
    height: 576,
    x: 0,
    y: 0,
  };

  static contextTypes = {
    loop: PropTypes.object,
  }

  static childContextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  setDimensions = () => {
    this.setState({
      dimensions: [
        this.container.offsetWidth,
        this.container.offsetHeight,
      ],
    });
  }

  constructor(props) {
    super(props);

    this.container = null;

    this.state = {
      dimensions: [0, 0],
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setDimensions);
    this.setDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setDimensions);
  }

  getChildContext() {
    return {
      scale: this.getScale().scale,
      loop: this.context.loop,
    };
  }

  getScale() {
    const { container } = this;
    const { dimensions } = this.state;

    const [vwidth, vheight] = dimensions;
    const { height, width } = this.props;

    let targetWidth;
    let targetHeight;
    let targetScale;

    if (height / width > vheight / vwidth) {
      targetHeight = vheight;
      targetWidth = targetHeight * width / height;
      targetScale = vheight / height;
    } else {
      targetWidth = vwidth;
      targetHeight = targetWidth * height / width;
      targetScale = vwidth / width;
    }

    if (!container) {
      return {
        height,
        width,
        scale: 1,
      };
    } else {
      return {
        height: targetHeight,
        width: targetWidth,
        scale: targetScale,
      };
    }
  }

  getWrapperStyles() {
    return {
      height: '100%',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    };
  }

  getInnerStyles() {
    const scale = this.getScale();
    const xOffset = Math.floor((this.state.dimensions[0] - scale.width) / 2);
    const yOffset = Math.floor((this.state.dimensions[1] - scale.height) / 2);

    return {
      height: Math.floor(scale.height),
      width: Math.floor(scale.width),
      position: 'relative',
      overflow: 'hidden',
      transform: `translate(${this.props.x + xOffset}px, ${this.props.y + yOffset}px)`,
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()} ref={(c) => { this.container = c; }}>
        <div style={this.getInnerStyles()}>
          {this.props.children}
        </div>
      </div>
    );
  }

}
