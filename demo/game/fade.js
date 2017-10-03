import React from 'react';
import PropTypes from 'prop-types';

const Fade = props => <div className={`fade ${props.visible && 'active'}`} />;

Fade.propTypes = {
  visible: PropTypes.bool,
};

Fade.defaultProps = {
  visible: true,
};

export default Fade;
