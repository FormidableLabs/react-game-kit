import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TileMap extends Component {
  static propTypes = {
    columns: PropTypes.number,
    layers: PropTypes.array,
    renderTile: PropTypes.func,
    rows: PropTypes.number,
    scale: PropTypes.number,
    src: PropTypes.string,
    style: PropTypes.object,
    tileSize: PropTypes.number,
  };

  static defaultProps = {
    columns: 16,
    layers: [],
    renderTile: (tile, src, styles) => <img style={styles} src={src} />,
    rows: 9,
    src: '',
    tileSize: 64,
  };

  static contextTypes = {
    scale: PropTypes.number,
  };

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.context.scale !== nextContext.scale;
  }

  generateMap() {
    const { columns, layers, rows } = this.props;

    const mappedLayers = [];

    layers.forEach((l, index) => {
      const layer = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const gridIndex = r * columns + c;
          if (l[gridIndex] !== 0) {
            layer.push(
              <div
                key={`tile-${index}-${r}-${c}`}
                style={this.getImageWrapperStyles(r, c)}
              >
                {this.props.renderTile(
                  this.getTileData(r, c, l[gridIndex]),
                  this.props.src,
                  this.getImageStyles(l[gridIndex])
                )}
              </div>
            );
          }
        }
      }
      mappedLayers.push(layer);
    });

    return mappedLayers;
  }

  getTileData(row, column, index) {
    const { tileSize } = this.props;

    const size = tileSize;
    const left = column * size;
    const top = row * size;

    return {
      index,
      size: tileSize,
      left,
      top,
    };
  }

  getImageStyles(imageIndex) {
    const { scale } = this.context;
    const { tileSize } = this.props;

    const size = Math.round(scale * tileSize);
    const left = (imageIndex - 1) * size;

    return {
      position: 'absolute',
      imageRendering: 'pixelated',
      display: 'block',
      height: '100%',
      transform: `translate(-${left}px, 0px)`,
    };
  }

  getImageWrapperStyles(row, column) {
    const { scale } = this.context;
    const { tileSize } = this.props;

    const size = Math.round(scale * tileSize);
    const left = column * size;
    const top = row * size;

    return {
      height: size,
      width: size,
      overflow: 'hidden',
      position: 'absolute',
      transform: `translate(${left}px, ${top}px)`,
    };
  }

  getLayerStyles() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
    };
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
    };
  }

  render() {
    const layers = this.generateMap();
    return (
      <div style={{ ...this.getWrapperStyles(), ...this.props.style }}>
        {layers.map((layer, index) => {
          return (
            <div key={`layer-${index}`} style={this.getLayerStyles()}>
              {layer}
            </div>
          );
        })}
      </div>
    );
  }
}
