import { puzzleState } from './puzzleState';
import { SET_PUZZLE_SOLVED, RESET_PUZZLE_SOLVED } from '../actions/index';

describe('puzzleState reducer', () => {
  it('should return the initial state', () => {
    expect(puzzleState(undefined, {})).toEqual({
      puzzleTiles: [],
      isSolved: false
    });
  });

  it('should set puzzle state as solved', () => {
    expect(
      puzzleState([], {
        type: SET_PUZZLE_SOLVED
      })
    ).toEqual({
      isSolved: true
    });
  });

  it('should reset puzzle state as solved', () => {
    expect(
      puzzleState([], {
        type: RESET_PUZZLE_SOLVED
      })
    ).toEqual({
      isSolved: false
    });
  });
});
