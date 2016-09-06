import React, { PropTypes } from 'react';

const Fade = (props) => (
  <div
    className={`fade ${props.visible && 'active'}`}
  />
);

Fade.propTypes = {
  visible: PropTypes.bool,
};

Fade.defaultProps = {
  visible: true,
};

export default Fade;
