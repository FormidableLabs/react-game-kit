import React, { Component, PropTypes } from 'react';

export default class Keys extends Component {

  static propTypes = {
    onInput: PropTypes.func,
  };

  static defaultProps = {
    onInput: () => {},
  };

  handleKeyPress = (e) => {
    this.props.onInput.call(null, e);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  render() {
    return null;
  }

}
