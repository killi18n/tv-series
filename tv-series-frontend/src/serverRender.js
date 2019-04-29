import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import transit from 'transit-immutable-js';
import App from 'components/App';
import configure from 'store/configure';
import routes from './routeConfig';

const serverRender = async ctx => {
  // console.log('ctx.cookies.access_token', ctx.cookies.get('access_token'));

  const store = configure();
  const { url, origin, cookies } = ctx;
  const accessToken = cookies.get('access_token');
  axios.defaults.baseURL = origin;

  if (accessToken) {
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    );
    return {
      html,
      isLoggedIn: true,
    };
  }

  const preloads = [];

  routes.forEach(route => {
    const match = matchPath(url, route);
    if (!match) return;
    const { preload } = route;
    if (!preload) return;

    const promise = preload(store, match.params);
    preloads.push(promise);
  });

  let error = null;

  try {
    await Promise.all(preloads);
  } catch (e) {
    error = e;
    console.log(e);
  }

  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = JSON.stringify(
    transit.toJSON(store.getState())
  ).replace(/</g, '\\u003c');

  return {
    html,
    preloadedState,
    error,
    isLoggedIn: false,
  };
};

export default serverRender;
