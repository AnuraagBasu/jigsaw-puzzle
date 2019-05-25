import { combineReducers } from 'redux';

import { puzzleState } from './puzzleState';

const appReducer = combineReducers({
  puzzleState
});

export default appReducer;
