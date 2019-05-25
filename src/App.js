import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _cloneDeep from 'lodash/cloneDeep';

import PuzzleBoard from './components/PuzzleBoard';

import { setPuzzleTiles } from './actions';

import { getPuzzleTiles, getEmptyTileLocation } from './selectors';

import { TILE_COUNT } from './utils/constants';

class App extends Component {
  componentDidMount() {
    this.puzzleImage = new Image();
    this.puzzleImage.src = '/assets/images/monks.jpg';
    this.puzzleImage.addEventListener('load', this.setBoard, false);
  }

  setBoard = () => {
    const { dispatch } = this.props;
    const puzzleTiles = [];
    for (let i = 0; i < TILE_COUNT; i++) {
      puzzleTiles[i] = [];
      for (let j = 0; j < TILE_COUNT; j++) {
        puzzleTiles[i][j] = {
          x: TILE_COUNT - 1 - i,
          y: TILE_COUNT - 1 - j,
          empty: i === 0 && j === 0
        };
      }
    }

    dispatch(setPuzzleTiles(puzzleTiles));
  };

  onSlideTile = (fromLocation, toLocation) => {
    const { puzzleTiles, dispatch } = this.props;
    const newPuzzleTiles = _cloneDeep(puzzleTiles);
    const temp = _cloneDeep(puzzleTiles[toLocation.x][toLocation.y]);
    newPuzzleTiles[fromLocation.x][fromLocation.y] = temp;
    newPuzzleTiles[fromLocation.x][fromLocation.y].empty = true;
    newPuzzleTiles[toLocation.x][toLocation.y] = _cloneDeep(
      puzzleTiles[fromLocation.x][fromLocation.y]
    );
    newPuzzleTiles[toLocation.x][toLocation.y].empty = false;

    dispatch(setPuzzleTiles(newPuzzleTiles));
  };

  render() {
    const { puzzleTiles, emptyTileLocation } = this.props;

    return (
      <div className="App">
        {puzzleTiles && puzzleTiles.length ? (
          <PuzzleBoard
            image={this.puzzleImage}
            puzzleTiles={puzzleTiles}
            emptyTileLocation={emptyTileLocation}
            onSlideTile={this.onSlideTile}
          />
        ) : null}
      </div>
    );
  }
}

App.propTypes = {
  puzzleTiles: PropTypes.array,
  emptyTileLocation: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    puzzleTiles: getPuzzleTiles(state),
    emptyTileLocation: getEmptyTileLocation(state)
  };
};
const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
