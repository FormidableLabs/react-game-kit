/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h2>How can we size and scale our game?</h2>
    </Slide>,
    <Slide>
      <h2>transform: scale()</h2>
    </Slide>,
    <Slide>
      <h2><del>transform: scale()</del></h2>
    </Slide>,
    <Slide>
      <h2>Rounding errors on subpixel floats mean we have to manually round & scale.</h2>
    </Slide>,
    <Slide>
      <h2>react-game-kit provides a Stage component to help with this</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/stage.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Most screens you are targeting will have a 16:9 aspect ratio</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/stage-size.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/stage-use.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>That's cool, but won't my images be blurry?</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/stage-blurry.example')}
        </code>
      </pre>
    </Slide>,
  ],
};
