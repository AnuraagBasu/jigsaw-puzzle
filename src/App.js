import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _cloneDeep from 'lodash/cloneDeep';

import PuzzleBoard from './components/PuzzleBoard';

import { setPuzzleTiles, setPuzzleSolved, resetPuzzleSolved } from './actions';

import {
  getPuzzleTiles,
  getEmptyTileLocation,
  IsPuzzleSolved
} from './selectors';

import { TILE_COUNT, CANVAS_WIDTH } from './utils/constants';

class App extends Component {
  state = {
    showHint: false
  };

  componentDidMount() {
    this.puzzleImage = new Image();
    this.puzzleImage.src = '/assets/images/monks.jpg';
    this.puzzleImage.addEventListener('load', this.setBoard, false);
  }

  componentWillUnmount() {
    this.toggleHintTimeout && clearTimeout(this.toggleHintTimeout);
  }

  toggleHint = () => this.setState({ showHint: !this.state.showHint });

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

  onPuzzleSolved = () => {
    const { dispatch } = this.props;
    dispatch(setPuzzleSolved());
  };

  onShowHint = () => {
    console.log('hehehe');
    this.toggleHint();
    this.toggleHintTimeout = setTimeout(this.toggleHint, 2000);
  };

  onResetPuzzle = () => {
    this.setBoard();
    this.props.dispatch(resetPuzzleSolved());
  };

  render() {
    const { puzzleTiles, emptyTileLocation, isPuzzleSolved } = this.props;
    const { showHint } = this.state;

    return (
      <div id="playGround">
        <div>
          <div
            className={`preview ${showHint ? 'show' : ''}`}
            style={{ width: CANVAS_WIDTH, height: CANVAS_WIDTH }}
          />
          {puzzleTiles && puzzleTiles.length ? (
            <PuzzleBoard
              image={this.puzzleImage}
              puzzleTiles={puzzleTiles}
              emptyTileLocation={emptyTileLocation}
              onSlideTile={this.onSlideTile}
              onPuzzleSolved={this.onPuzzleSolved}
            />
          ) : null}
        </div>
        <button
          type="button"
          className={`actionBtn ${isPuzzleSolved ? 'reset' : 'hint'} ${
            showHint ? 'disable' : ''
          }`}
          onClick={!isPuzzleSolved ? this.onShowHint : this.onResetPuzzle}
        >
          {isPuzzleSolved ? 'Reset' : 'Hint'}
        </button>
      </div>
    );
  }
}

App.propTypes = {
  puzzleTiles: PropTypes.array,
  emptyTileLocation: PropTypes.object,
  isPuzzleSolved: PropTypes.bool,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    puzzleTiles: getPuzzleTiles(state),
    emptyTileLocation: getEmptyTileLocation(state),
    isPuzzleSolved: IsPuzzleSolved(state)
  };
};
const mapDispatchToProps = dispatch => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
