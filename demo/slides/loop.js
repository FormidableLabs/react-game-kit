/* eslint-disable react/jsx-key, max-len */
import React from 'react';
import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h2>How does the loop work?</h2>
    </Slide>,
    <Slide>
      <h1>requestAnimationFrame</h1>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/raf.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>How can I implement this in React with react-game-kit?</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/loop.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Wait, how does context work?</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/loop-use.example')}
        </code>
      </pre>
    </Slide>,
  ],
};
