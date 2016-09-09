import React from 'react';

const slideStyles = {
  display: 'flex',
  flex: '1 1 0',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxWidth: '166vh',
  padding: 20,
};

const Slide = (props) => (
  <div style={slideStyles}>
    <div style={{ width: '100%' }}>
      {props.children}
    </div>
  </div>
);

export default Slide;
