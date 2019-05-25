import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import * as serviceWorker from './serviceWorker';
import App from './App';
import reducer from './reducers';

import './index.css';

let enhancedMiddleware = applyMiddleware();
if (process.env.REACT_APP_ENV !== 'production') {
  enhancedMiddleware = applyMiddleware(createLogger());
}
const store = createStore(reducer, enhancedMiddleware);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
