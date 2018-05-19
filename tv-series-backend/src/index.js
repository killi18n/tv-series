require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { jwtMiddleware } = require('lib/token');
const session = require('koa-session');

const koaBody = require('koa-body');
const mount = require('koa-mount');
const serve = require('koa-static');
const uploadDirPath = '/uploads';
const path = require('path');

const api = require('./api');

const mongoose = require('mongoose');

const {
    PORT: port = 4000,
    MONGO_URI: mongoURI,
    COOKIE_SIGN_KEY: signKey
} = process.env;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).then(() => {
    console.log('connected to mongodb');
}).catch((e) => {
    console.error(e);
});

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(koaBody({multipart: true}));
app.use(mount('/uploads', serve(path.join(__dirname + uploadDirPath))));

const sessionConfig = {
    maxAge: 1000 * 60 * 60 * 24
};

app.use(session(sessionConfig, app));
app.keys= [signKey];

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log("app is listening port", port);
});