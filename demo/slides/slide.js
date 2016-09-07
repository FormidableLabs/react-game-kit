import React from 'react';

const slideStyles = {
  display: 'flex',
  flex: '1 1 0',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '166vh',
  background: 'red',
};

const Slide = (props) => (
  <div style={slideStyles}>
    {props.children}
  </div>
);

export default Slide;
