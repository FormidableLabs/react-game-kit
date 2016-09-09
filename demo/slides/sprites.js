/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h2>So how do sprites work?</h2>
    </Slide>,
    <Slide>
      <div style={{ background: 'white', width: '100%' }}>
        <img width="100%" style={{ imageRendering: 'pixelated', display: 'block' }} src="assets/character-sprite.png"/>
      </div>
    </Slide>,
    <Slide>
      <div style={{ background: 'white', width: '100%' }}>
        <img width="100%" style={{ imageRendering: 'pixelated', display: 'block' }} src="assets/character-sprite-grid.png"/>
      </div>
    </Slide>,
    <Slide>
      <div style={{ background: 'white', width: '100%' }}>
        <img width="100%" style={{ imageRendering: 'pixelated', display: 'block' }} src="assets/character-gif.gif"/>
      </div>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/sprite-manual.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/sprite-style.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>react-game-kit provides a Sprite component to simplify this process.</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/sprite.example')}
        </code>
      </pre>
    </Slide>,
  ],
};
