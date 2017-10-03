import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Matter, { Render, Engine, Events } from 'matter-js';

export default class World extends Component {
  static propTypes = {
    children: PropTypes.any,
    gravity: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      scale: PropTypes.number,
    }),
    debug: PropTypes.shape({
      offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
      }),
      background: PropTypes.string,
    }),
    onCollision: PropTypes.func,
    onInit: PropTypes.func,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    gravity: {
      x: 0,
      y: 1,
      scale: 0.001,
    },
    onCollision: () => {},
    onInit: () => {},
    onUpdate: () => {},
  };

  static contextTypes = {
    scale: PropTypes.number,
    renderWidth: PropTypes.number,
    renderHeight: PropTypes.number,
    loop: PropTypes.object,
  };

  static childContextTypes = {
    engine: PropTypes.object,
  };

  loop = () => {
    const currTime = 0.001 * performance.now();
    Engine.update(
      this.engine,
      1000 / 60,
      this.lastTime ? currTime / this.lastTime : 1,
    );
    this.lastTime = currTime;
  };

  onInit = (...args) => {
    if (this.props.debug) {
      this.setupDebugRenderer();
    }

    this.props.onInit(...args);
  };

  stopDebugRendering = () => {
    if (this._render) {
      Render.stop(this._render);
      delete this._render;
    }
  };

  getDebugProps = () => {
    const debugProps = Object.assign(
      {
        offset: {},
        // transparent background to see sprites, etc, in the world
        background: 'rgba(0, 0, 0, 0)',
      },
      this.props.debug || {}
    );

    debugProps.offset = Object.assign(
      {
        x: 0,
        y: 0,
      },
      debugProps.offset
    );

    return debugProps;
  };

  setupDebugRenderer = () => {

    if (!this._debugRenderElement) {
      return;
    }

    const { renderWidth, renderHeight, scale } = this.context;
    const { offset, background } = this.getDebugProps();

    const width = renderWidth / scale;
    const height = renderHeight / scale;

    this._render = Render.create({
      canvas: this._debugRenderElement,
      // Auto-zoom the canvas to the correct game area
      bounds: {
        min: {
          x: offset.x,
          y: offset.y,
        },
        max: {
          x: offset.x + width,
          y: offset.y + height,
        },
      },
      options: {
        wireframeBackground: background,
        width: renderWidth,
        height: renderHeight,
      },
    });

    // Setting this as part of `.create` crashes Chrome during a deep clone. :/
    // My guess: a circular reference
    this._render.engine = this.engine;

    Render.run(this._render);
  };

  getCanvasRef = (element) => {

    this._debugRenderElement = element;

    if (element) {
      if (!this._render) {
        this.setupDebugRenderer();
      }
    } else {
      this.stopDebugRendering();
    }
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.lastTime = null;

    const world = Matter.World.create({gravity: props.gravity});

    this.engine = Engine.create({
      world,
    });
  }

  componentWillReceiveProps(nextProps) {
    const {gravity} = nextProps;

    if (gravity !== this.props.gravity) {
      this.engine.world.gravity = gravity;
    }

    if (!nextProps.debug) {
      this.stopDebugRendering();
    }
  }

  componentDidUpdate() {
    if (this.props.debug && this._render) {

      const { renderWidth, renderHeight, scale } = this.context;

      const { offset } = this.getDebugProps();

      // When context changes (eg; `scale` due to a window resize),
      // re-calculate the world stage
      this._render.options.width = renderWidth;
      this._render.options.height = renderHeight;

      this._render.bounds = {
        min: {
          x: offset.x,
          y: offset.y,
        },
        max: {
          x: offset.x + (renderWidth / scale),
          y: offset.y + (renderHeight / scale),
        },
      };

      Render.world(this._render);
    }
  }

  componentDidMount() {
    this.loopID = this.context.loop.subscribe(this.loop);
    this.onInit(this.engine);
    Events.on(this.engine, 'afterUpdate', this.props.onUpdate);
    Events.on(this.engine, 'collisionStart', this.props.onCollision);
  }

  componentWillUnmount() {
    this.context.loop.unsubscribe(this.loopID);
    Events.off(this.engine, 'afterUpdate', this.props.onUpdate);
    Events.off(this.engine, 'collisionStart', this.props.onCollision);
    this.stopDebugRendering();
  }

  getChildContext() {
    return {
      engine: this.engine,
    };
  }

  render() {
    const defaultStyles = {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    };

    const { renderWidth, renderHeight, scale } = this.context;

    let debugRenderTarget = false;

    if (this.props.debug) {
      debugRenderTarget = (
        <canvas
          key="debug-render-target"
          style={{position: 'relative'}}
          width={renderWidth}
          height={renderHeight}
          ref={this.getCanvasRef}
        />
      );
    }

    return (
      <div style={defaultStyles}>
        {this.props.children}
        {debugRenderTarget}
      </div>
    );
  }
}
