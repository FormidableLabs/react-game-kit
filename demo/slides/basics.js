/* eslint-disable react/jsx-key, max-len */
import React from 'react';

import Slide from './slide';

export default {
  slides: [
    <Slide>
      <h1 className="yellow">Disclaimer:</h1>
      <h2>I'm not a game dev. I just build games for fun.</h2>
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
        <li>You can hot reload game logic</li>
      </ul>
    </Slide>,
    <Slide>
      <h1>What is a game?</h1>
    </Slide>,
    <Slide>
      <h2>"A form of play or sport, especially a competitive one played according to rules and decided by skill, strength, or luck."</h2>
    </Slide>,
    <Slide>
      <h1>Today we are going to learn how to make a 2d platformer game with ReactJS</h1>
    </Slide>,
    <Slide>
      <h1>Basic Concepts</h1>
    </Slide>,
    <Slide>
      <h2 className="yellow">Game Loop</h2>
      <p>A programmatic loop that gets input, updates game state and draws the game.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Tick</h2>
      <p>Each step of the loop.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Update Function</h2>
      <p>A function called on each tick where game logic is checked.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Stage</h2>
      <p>The main game container to which game entities are added.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Sprite</h2>
      <p>An often animated bitmap graphic derived from a larger tiled image of states and steps.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">TileMap</h2>
      <p>A large graphic created by rendering a matrix of position indexes derived from a smaller set of common tiles.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Physics Engine</h2>
      <p>A class that simulates physical systems.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Rigid Body Physics Engine</h2>
      <p>A physics engine that assumes that physical bodies are not elastic or fluid.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Physics World</h2>
      <p>A class that provides a set of conditions that the simulation abides by.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">Physics Body</h2>
      <p>A class that acts as an entity inside the physics world.</p>
    </Slide>,
    <Slide>
      <h2 className="yellow">This sounds hard.</h2>
      <h2>But it doesn't have to be!</h2>
    </Slide>,
    <Slide>
      <h1>Introducing:</h1>
      <h1 className="yellow">react-game-kit</h1>
    </Slide>,
    <Slide>
      <h2>
        A collection of ReactJS components and utilities that help you make awesome games.
      </h2>
    </Slide>,
    <Slide>
      <h2>
        It's pretty fun. In fact, this entire presentation is built in it.
      </h2>
    </Slide>,
    <Slide>
      <h2>
        Oh, and it works on React Native too!
      </h2>
    </Slide>,
  ],
};
