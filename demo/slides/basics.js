/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h1>I don't know anything about game dev.</h1>
    </Slide>,
    <Slide>
      <h1>Should you build a game with React?</h1>
    </Slide>,
    <Slide>
      <h1>Can <del>Should</del> you build a game with React?</h1>
    </Slide>,
    <Slide>
      <h1>You sure can!</h1>
    </Slide>,
    <Slide>
      <h1>Why would you build a game with React?</h1>
    </Slide>,
    <Slide>
      <ul>
        <li>The same game code can work on the web, iOS & Android</li>
        <li>You primarily write React code</li>
        <li>You dont feel like learning Unity</li>
        <li>Fun?</li>
      </ul>
    </Slide>,
    <Slide>
      <h1>Basic Concepts</h1>
    </Slide>,
    <Slide>
      <h2>Game Loop</h2>
      <p>A programmatic loop that gets input, updates game state and draws the game.</p>
    </Slide>,
    <Slide>
      <h2>Tick</h2>
      <p>Each step of the loop.</p>
    </Slide>,
    <Slide>
      <h2>Update Function</h2>
      <p>A function called on each tick where game logic is checked.</p>
    </Slide>,
    <Slide>
      <h2>Stage</h2>
      <p>The main game container to which game entities are added.</p>
    </Slide>,
    <Slide>
      <h2>Sprite</h2>
      <p>An often animated bitmap graphic derived from a larger tiled image of states and steps.</p>
    </Slide>,
    <Slide>
      <h2>TileMap</h2>
      <p>A large graphic created by rendering a matrix of position indexes derived from a smaller set of common tiles.</p>
    </Slide>,
    <Slide>
      <h2>Physics Engine</h2>
      <p>A class that simulates physical systems.</p>
    </Slide>,
    <Slide>
      <h2>Rigid Body Physics Engine</h2>
      <p>A physics engine that assumes that physical bodies are not elastic or fluid.</p>
    </Slide>,
    <Slide>
      <h2>Physics World</h2>
      <p>A class that provides a set of conditions that the simulation abides by.</p>
    </Slide>,
    <Slide>
      <h2>Physics Body</h2>
      <p>A class that acts as an entity inside the physics world.</p>
    </Slide>,
  ],
};
