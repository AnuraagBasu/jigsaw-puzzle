import {
  SET_PUZZLE_TILES,
  SET_PUZZLE_SOLVED,
  RESET_PUZZLE_SOLVED
} from '../actions';

const initialState = {
  puzzleTiles: [],
  isSolved: false
};

export const puzzleState = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUZZLE_TILES:
      return Object.assign({}, state, {
        puzzleTiles: action.puzzleTiles
      });
    case SET_PUZZLE_SOLVED:
      return Object.assign({}, state, {
        isSolved: true
      });
    case RESET_PUZZLE_SOLVED:
      return Object.assign({}, state, {
        isSolved: false
      });
    default:
      return state;
  }
};
