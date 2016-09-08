import React from 'react';

const slideStyles = {
  display: 'flex',
  flex: '1 1 0',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxWidth: '166vh',
};

const Slide = (props) => (
  <div style={slideStyles}>
    <div>
      {props.children}
    </div>
  </div>
);

export default Slide;
