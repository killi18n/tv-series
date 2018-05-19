const Router = require('koa-router');

const api = new Router();

const post = require('./post');
const auth = require('./auth');
const rate = require('./rate');
const editor = require('./editor');

api.use('/post', post.routes());
api.use('/auth', auth.routes());
api.use('/rate', rate.routes());
api.use('/editor', editor.routes());



module.exports = api;