import { SET_PUZZLE_TILES } from '../actions';

const initialState = {
  puzzleTiles: []
};

export const puzzleState = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUZZLE_TILES:
      return {
        puzzleTiles: action.puzzleTiles
      };
    default:
      return state;
  }
};
