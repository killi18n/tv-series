require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const koaBody = require('koa-body');
const mount = require('koa-mount');
const serve = require('koa-static');

const uploadDirPath = '../uploads';
const { jwtMiddleware } = require('lib/token');
const path = require('path');
const mongoose = require('mongoose');

const api = require('./api');
const ssr = require('./ssr');

const buildPath = path.join(__dirname, '../../tv-series-frontend/build');

const {
  PORT: port = 4000,
  MONGO_URI: mongoURI,
  COOKIE_SIGN_KEY: signKey,
} = process.env;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(e => console.error(e));

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());
router.get('/', ssr);

app.use(koaBody({ multipart: true }));
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(mount('/uploads', serve(path.join(__dirname, uploadDirPath))));

const sessionConfig = {
  maxAge: 1000 * 60 * 60 * 24,
};

app.use(session(sessionConfig, app));
app.keys = [signKey];

app.use(router.routes()).use(router.allowedMethods());
// app.use((ctx, next) => {
//   if (ctx.cookies.get('access_token')) {
//     return next();
//   }
// }, fallback());
// app.use(fallback());
app.use(serve(buildPath));
app.use(ssr);

app.listen(port, () => {
  console.log('app is listening port', port);
});
