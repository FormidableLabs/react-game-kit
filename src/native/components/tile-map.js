import React, { Component, PropTypes } from 'react';

import { View, Image } from 'react-native';

export default class TileMap extends Component {

  static propTypes = {
    layers: PropTypes.array,
    renderTile: PropTypes.func,
    scale: PropTypes.number,
    sourceWidth: PropTypes.number.isRequired,
    src: PropTypes.number,
    style: PropTypes.object,
    tileSize: PropTypes.number,
  };

  static defaultProps = {
    layers: [
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ],
    renderTile: (tile, src, styles) => (
      <Image
        resizeMode="stretch"
        style={styles}
        source={src}
      />
    ),
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
    const { layers } = this.props;

    const mappedLayers = [];

    layers.forEach((layer, layerIndex) => {
      const mappedLayer = [];
      layer.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
          mappedLayer.push(
            <div
              key={`tile-${layerIndex}-${rowIndex}-${columnIndex}`}
              style={this.getImageWrapperStyles(rowIndex, columnIndex)}
            >
            {this.props.renderTile(
              this.getTileData(rowIndex, columnIndex, layers[layerIndex][rowIndex][columnIndex]),
              this.props.src,
              this.getImageStyles(layers[layerIndex][rowIndex][columnIndex]),
            )}
            </div>
          );
        });
        mappedLayers.push(mappedLayer);
      });
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
    const { tileSize, sourceWidth } = this.props;

    const size = scale * tileSize;
    const left = (imageIndex - 1) * size;

    return {
      position: 'absolute',
      height: size,
      width: sourceWidth * scale,
      top: 0,
      left: left * -1,
    };
  }

  getImageWrapperStyles(row, column) {
    const { scale } = this.context;
    const { tileSize } = this.props;

    const size = scale * tileSize;
    const left = column * size;
    const top = row * size;

    return {
      height: size,
      width: size,
      overflow: 'hidden',
      position: 'absolute',
      top,
      left,
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
      <View style={{ ...this.getWrapperStyles(), ...this.props.style }}>
        { layers.map((layer, index) => {
          return (
            <View key={`layer-${index}`} style={this.getLayerStyles()}>
              {layer}
            </View>
          );
        })}
      </View>
    );
  }

}
