import { TILE_COUNT } from './constants';

export const getOriginalTiles = () => {
  const originalTiles = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    originalTiles[i] = [];
    for (let j = 0; j < TILE_COUNT; j++) {
      originalTiles[i][j] = {
        x: i,
        y: j
      };
    }
  }

  return originalTiles;
};

export const randomiseTiles = originalTiles => {
  const randomisedTiles = [...originalTiles];
  const randomEmptyTileIndex = Math.floor(Math.random() * TILE_COUNT);
  for (let i = 0; i < TILE_COUNT; i++) {
    randomisedTiles[i] = [];
    for (let j = 0; j < TILE_COUNT; j++) {
      randomisedTiles[i][j] = {
        x: TILE_COUNT - 1 - i,
        y: TILE_COUNT - 1 - j,
        empty: i === randomEmptyTileIndex && j === randomEmptyTileIndex
      };
    }
  }

  return randomisedTiles;
};

export const checkIfPuzzleSolved = puzzleTiles => {
  for (let i = 0; i < TILE_COUNT; ++i) {
    for (let j = 0; j < TILE_COUNT; ++j) {
      if (puzzleTiles[i][j].x !== i || puzzleTiles[i][j].y !== j) {
        return false;
      }
    }
  }

  return true;
};
