import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Stage extends Component {

  static propTypes = {
    children: PropTypes.any,
    height: PropTypes.number,
    style: PropTypes.object,
    width: PropTypes.number,
  };

  static defaultProps = {
    width: 1024,
    height: 576,
  };

  static contextTypes = {
    loop: PropTypes.object,
  }

  static childContextTypes = {
    loop: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.container = null;

    this.state = {
      dimensions: [0, 0],
    };

    this.setDimensions = this.setDimensions.bind(this);
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
    const [vwidth, vheight] = this.state.dimensions;
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

    if (!this.container) {
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
    };
  }

  getInnerStyles() {
    const scale = this.getScale();
    const xOffset = Math.floor((this.state.dimensions[0] - scale.width) / 2);
    const yOffset = Math.floor((this.state.dimensions[1] - scale.height) / 2);

    return {
      height: Math.floor(scale.height),
      width: Math.floor(scale.width),
      position: 'absolute',
      overflow: 'hidden',
      transform: `translate(${xOffset}px, ${yOffset}px)`,
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()} ref={(c) => { this.container = c; }}>
        <div style={{ ...this.getInnerStyles(), ...this.props.style }}>
          {this.props.children}
        </div>
      </div>
    );
  }

  setDimensions() {
    this.setState({
      dimensions: [
        this.container.offsetWidth,
        this.container.offsetHeight,
      ],
    });
  }
}
