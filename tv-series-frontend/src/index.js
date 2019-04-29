import React from 'react';
import ReactDOM from 'react-dom';
import { matchPath } from 'react-router-dom';
import Root from './Root';
import 'styles/main.scss';
import routes from './routeConfig';
// import registerServiceWorker from './registerServiceWorker';

const render = async () => {
  if (process.env.NODE_ENV === 'development') {
    ReactDOM.render(<Root />, document.getElementById('root'));
    return;
  }

  const getComponents = [];
  const { pathname } = window.location;

  routes.forEach(route => {
    const match = matchPath(pathname, route);
    if (!match) return;
    const { getComponent } = route.component;
    if (!getComponent) return;
    getComponents.push(getComponent());
  });

  await Promise.all(getComponents);
  ReactDOM.hydrate(<Root />, document.getElementById('root'));
};

render();

// registerServiceWorker();
