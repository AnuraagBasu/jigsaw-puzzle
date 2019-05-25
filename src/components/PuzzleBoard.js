import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';

import { TILE_COUNT, CANVAS_WIDTH } from '../utils/constants';

class PuzzleBoard extends Component {
  state = {
    isSolved: false
  };

  componentDidMount() {
    this.drawBoard();

    const canvasElement = this.canvasReference;
    canvasElement.addEventListener('click', this.handleBoardClick);
  }

  componentDidUpdate(prevProps) {
    const { puzzleTiles } = this.props;
    if (!_isEqual(puzzleTiles, prevProps.puzzleTiles)) {
      this.drawBoard();
    }
  }

  storeCanvasReference = node => {
    if (!this.canvasReference) {
      this.canvasReference = node;
    }
  };

  drawBoard = () => {
    const {
      image: puzzleImage,
      puzzleTiles,
      emptyTileLocation,
      onPuzzleSolved
    } = this.props;

    const canvasElement = this.canvasReference;
    const context = canvasElement.getContext('2d');
    const boardSize = canvasElement.width;

    context.clearRect(0, 0, boardSize, boardSize);
    const tileWidth = CANVAS_WIDTH / TILE_COUNT;
    for (let i = 0; i < TILE_COUNT; ++i) {
      for (let j = 0; j < TILE_COUNT; ++j) {
        if (!(i === emptyTileLocation.x && j === emptyTileLocation.y)) {
          const { x, y } = puzzleTiles[i][j];
          context.drawImage(
            puzzleImage,
            x * tileWidth,
            y * tileWidth,
            tileWidth,
            tileWidth,
            i * tileWidth,
            j * tileWidth,
            tileWidth,
            tileWidth
          );
          context.strokeStyle = '#4a4a4a';
          context.strokeRect(
            i * tileWidth,
            j * tileWidth,
            tileWidth,
            tileWidth
          );
        }
      }
    }

    const isSolved = this.checkSolved(puzzleTiles, TILE_COUNT);
    isSolved && onPuzzleSolved();
  };

  calculateDistance = (fromLocation, toLocation) => {
    const { x: x1, y: y1 } = fromLocation;
    const { x: x2, y: y2 } = toLocation;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  handleBoardClick = e => {
    const { isSolved } = this.state;
    if (!isSolved) {
      const { emptyTileLocation, onSlideTile } = this.props;
      const tileWidth = CANVAS_WIDTH / TILE_COUNT;
      const clickLocation = {
        x: Math.floor(e.offsetX / tileWidth),
        y: Math.floor(e.offsetY / tileWidth)
      };

      if (this.calculateDistance(clickLocation, emptyTileLocation) === 1) {
        onSlideTile(clickLocation, emptyTileLocation);
      }
    }
  };

  checkSolved = (boardParts, tileCount) => {
    let isSolved = true;
    for (let i = 0; i < tileCount; ++i) {
      for (let j = 0; j < tileCount; ++j) {
        if (boardParts[i][j].x !== i || boardParts[i][j].y !== j) {
          isSolved = false;
        }
      }
    }

    return isSolved;
  };

  render() {
    return (
      <canvas
        ref={this.storeCanvasReference}
        width={CANVAS_WIDTH}
        height={CANVAS_WIDTH}
      />
    );
  }
}

PuzzleBoard.propTypes = {
  image: PropTypes.object,
  puzzleTiles: PropTypes.array,
  emptyTileLocation: PropTypes.object,
  onSlideTile: PropTypes.func,
  onPuzzleSolved: PropTypes.func
};

export default PuzzleBoard;
