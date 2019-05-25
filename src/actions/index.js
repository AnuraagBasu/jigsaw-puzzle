export const SET_PUZZLE_TILES = 'SET_PUZZLE_TILES';
export const SET_PUZZLE_SOLVED = 'SET_PUZZLE_SOLVED';
export const RESET_PUZZLE_SOLVED = 'RESET_PUZZLE_SOLVED';

export const setPuzzleTiles = puzzleTiles => ({
  type: SET_PUZZLE_TILES,
  puzzleTiles
});

export const setPuzzleSolved = () => ({
  type: SET_PUZZLE_SOLVED
});

export const resetPuzzleSolved = () => ({
  type: RESET_PUZZLE_SOLVED
});
