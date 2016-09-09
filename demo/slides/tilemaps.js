/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h2>What in the world is a tilemap?</h2>
    </Slide>,
    <Slide>
      <h2>Tile maps use a tile atlas to use a few graphics to create a "level"</h2>
    </Slide>,
    <Slide>
      <h2>Tile maps have tiles and layers</h2>
    </Slide>,
    <Slide>
      <img width="25%" style={{ imageRendering: 'pixelated', display: 'block', margin: 'auto' }} src="assets/boardwalktile.png"/>
    </Slide>,
    <Slide>
      <img width="100%" style={{ imageRendering: 'pixelated', display: 'block', margin: 'auto' }} src="assets/buildings.png"/>
    </Slide>,
    <Slide>
      <h2>Ok, so what does the map look like?</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap-map.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Parsing a tile map</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap-manual.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap-render.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>react-game-kit provides a TileMap component to simplify this process.</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap-buildings.example')}
        </code>
      </pre>
    </Slide>,
    <Slide>
      <h2>Why not just make it one big image?</h2>
    </Slide>,
    <Slide>
      <pre>
        <code className="language-javascript">
          {require('raw-loader!../code-samples/tilemap-custom.example')}
        </code>
      </pre>
    </Slide>,
  ],
};
