/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h2>You probably don't need a physics engine</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-simple.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>But lets say you do want physics</h2>
    </Slide>,
    <Slide>
      <h2>react-game-kit provides physics helpers provided by matter-js</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-world.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-world-init.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>When using matter-js physics, it's important to do physics updates after the world has updated.</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-update.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Using physics bodies</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-body.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-body-update.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Performant use of physics data for positioning</h2>
    </Slide>,
    <Slide>
      <h2>mobx</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-store.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-mobx-update.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/physics-style.example')}
        </code>
      </pre>
    </Slide>,
  ],
};
