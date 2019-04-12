import React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import './index.css';
import App from './App';

const store = configureStore();

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
}

