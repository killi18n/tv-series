import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'components/App';
import configure from 'store/configure';
// import routes from './routeConfig';

const serverRender = async () => {
  const store = configure();
  // const { url } = ctx;

  // routes.forEach(route => {

  // })

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter>
        <App />
      </StaticRouter>
    </Provider>
  );

  return {
    html,
  };
};

export default serverRender;
