import { createSelector } from 'reselect';

export const getPuzzleTiles = state => {
  return state.puzzleState.puzzleTiles;
};
export const IsPuzzleSolved = state => {
  return state.puzzleState.isSolved;
};

export const getEmptyTileLocation = createSelector(
  [getPuzzleTiles],
  puzzleTiles => {
    let emptyTileLocation = {
      x: 0,
      y: 0
    };
    if (puzzleTiles.length) {
      puzzleTiles.forEach((puzzleColumn, columnIndex) => {
        const cellIndex = puzzleColumn.findIndex(cell => cell.empty);
        if (cellIndex !== -1) {
          emptyTileLocation = { x: columnIndex, y: cellIndex };
        }
      });
    }
    return emptyTileLocation;
  }
);
