import React from 'react';
import ReactDOM from 'react-dom';
import Presentation from './presentation';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
  <AppContainer>
    <Presentation />
  </AppContainer>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept('./presentation', () => {
    const NextPresentation = require('./presentation').default;
    ReactDOM.render(
      <AppContainer>
        <NextPresentation />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
