<h1 align="center">react-game-kit</h1>

<h4 align="center">
  Make games with React & React Native!
</h4>

***

<!-- MarkdownTOC depth=3 autolink=true bracket=round -->


<!-- /MarkdownTOC -->


## Install

`npm install react-game-kit --save`

## Get Started

`react-game-kit` provides a set of helper components to make it easier to create games with React and React Native.

You'll want to begin by importing the components you need:

```js
import { Loop, Stage } from 'react-game-kit';
```

### Loop & Stage

Next, in your render method of your top level component, you'll want to put the `Loop` component at the top level, optionally followed by the `Stage` component:

```js
render() {
  return (
    <Loop>
      <Stage>
        // Game specific components go here
      </Stage>
    </Loop>
  );
}
```

The `Loop` component uses `context` to pass a subscribable game tick down your component tree. The `Stage` component does the same with game scale.

### World

If you intend on using physics in your game, a good next component would be the `World` component, which creates and provides a physics engine & world:

```js
render() {
  return (
    <Loop>
      <Stage>
        <World>
          // Game specific components go here
        </World>
      </Stage>
    </Loop>
  );
}
```

### Physics Bodies

Once you have a physics engine/world established, you can use the `Body` component to define physics bodies inline:

```js
render() {
  return (
    <Loop>
      <Stage>
        <World>
          <Body args={[0,0,75,75]} ref={(b) => this.body = b.body; }>
            // Sprites go here
          </Body>
        </World>
      </Stage>
    </Loop>
  );
}
```

Using a ref you can obtain a reference to the physics body and modify its properties via the [Matter-js API](https://github.com/liabru/matter-js).

### Next Steps

Once this general structure is established, what follows usually depends on what kind of game you intend to make. Check out the API documentation below for further clarity regarding use of these components.

## React Native

Using this library with React Native is a simple as importing from the native directory:

```js
import { Loop, Stage, ...etc } from 'react-game-kit/native';
```

> Note: AudioPlayer and KeyListener are not implemented on the React Native version.

## API

#### \<Loop />

The `Loop` component acts much like a Redux provider, in that it passes a GameLoop instance down the component tree via `this.context.loop`.

This allows you to subscribe and unsubscribe to the main game loop anywhere in your component tree. Here is an example of how this would generally look:

```js
class ChildComponent extends React.Component {
  static contextTypes = {
    loop: PropTypes.object,
  };

  componentDidMount() {
    this.context.loop.subscribe(this.update);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.update);
  }

  update() {
    // tick logic
  };
}

```

--

#### \<Stage />

**height** (_number_) : Base game height. Defaults to `576`.

**width** (_number_) : Base game width. Defaults to `1024`.

The `Stage` component also leverages `context` much like `Loop`, except it passes game scale as `this.context.scale`. You can use this value to appropriately scale positioning and dimension values within your game. Again, you would have to specify `scale: PropTypes.number` in your component's `contextTypes` to receive this value.

--

#### \<World />

**gravity** (_object_) : World gravity object.

Defaults:

```js
gravity={{
  x: 0,
  y: 1,
  scale: 0.001,
}}
```

**onCollision** (_func_) : World collision callback.

**onInit** (_func_) : World init callback.

**onUpdate** (_func_) : World update callback.

The `World` component is used as the first step in setting up game physics. It passes a `matter-js` Engine instance down via context as `this.context.engine`. Generally speaking, when getting or settings physics properties you'll want to do this after the physics world is updated in the main tick cycle. You can hook into this using the `onUpdate` prop, or in child components use `Matter.Events.on(this.context.engine, 'afterUpdate', this.update);` to subscribe to the engine updates.

The `onInit` callback is a great place to do your initial world setup, things like creating static bodies for walls and the floor.

--

#### \<Body />

**args** (_array_) : Initial body creation arguments. Depends on the `shape` prop, which maps to Matter.Bodies body creation methods detailed here: [Matter.Bodies Documentation](http://brm.io/matter-js/docs/classes/Bodies.html)

All other props on the body component map directly to [Matter-js Body properties](http://brm.io/matter-js/docs/classes/Body.html).

The `Body` component is used to define physics bodies. You will generally want to use `ref` to obtain a reference to the body, at which point you can call Matter-js methods on it, as well as listen to and react to its physic properties in the world update callback.

--

#### \<Sprite />


**offset** (array) : Sprite sheet x,y offset.

**onPlayStateChanged** (func) : Sprite play state changed callback.

**repeat** (bool) : Determines whether sprite animation should loop.

**scale** (number) : Scale value for sprite image.

**src** (string) : src path for sprite sheet.

**state** (number) : Vertical position in sprite sheet.

**steps** (array) : Number of animation steps for current row (state).

**ticksPerFrame** (number) : Number of loop ticks per animation frame.

**tileHeight** (number) : Height of spritesheet tile.

**tileWidth** (number) : Width of spritesheet tile.

The `Sprite` component lets you define sprite animations using sprite sheets. When creating a sprite sheet, define sprite tile dimensions that will be provided via the `tileHeight` & `tileWidth` props. Next, each animation state is represented by a row, with steps of the animation represented as columns.

--

#### \<TileMap />

**columns** (number) : number of columns in tile map.

**layers** (array) : Array of arrays that contain tile indexes.

**renderTile** (func) : Overrideable tile rendering function.

**rows** (number) : Number of rows in tile map.

**scale** (number) : Tile map scale.

**src** (string) : Tilemap image src path.

**tileSize** (number) : Tilemap tile size.

**width** (number) : Tilemap width.

**height** (number) : Tilemap height.

The `TileMap` component lets you define tile maps from a tile atlas. Your tilemap is made of up rows and columns. Each layer is then drawn using those numbers as reference. So for example, if you had 4 rows and 4 columns, with 1 layer, your `layers` prop would look like:

```js
layers={[
  [
    0, 0, 0, 0,
    1, 0, 1, 1,
    0, 0, 1, 0,
    1, 0, 0, 0,
  ]
]}
```

--



## License

[MIT License](http://opensource.org/licenses/MIT)
