import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import transit from 'transit-immutable-js';
import configure from 'store/configure';
import App from 'components/App';

const preloadedState =
  typeof window !== 'undefined' &&
  window.__PRELOADED_STATE__ &&
  transit.fromJSON(window.__PRELOADED_STATE__);

const store = configure(preloadedState);

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default Root;
