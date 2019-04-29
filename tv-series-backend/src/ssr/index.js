const render = require('./render').default;
const manifest = require('../../../tv-series-frontend/build/asset-manifest.json');

function buildHtml({ html, preloadedState, error, isLoggedIn }) {
  // const { title, meta } = helmet;
  if (error) {
    throw new Error(error);
  }
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <link href="/${manifest['app.css']}" rel="stylesheet">
  </head>
  
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${!isLoggedIn ? html : ''}</div>
    ${
      !isLoggedIn
        ? `<script>
      window.__PRELOADED_STATE__ = ${preloadedState};
      window.shouldCancel = true;
    </script>`
        : ''
    }
    <script type="text/javascript" src="/${manifest['vendor.js']}"></script>
    <script type="text/javascript" src="/${manifest['app.js']}"></script>
  </body>
  
  </html>`;
}

module.exports = async ctx => {
  try {
    const rendered = await render(ctx);
    ctx.body = buildHtml(rendered);
  } catch (e) {
    console.log(e);
    ctx.body = buildHtml({});
  }
};
