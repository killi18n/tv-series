const Router = require('koa-router');
const authCtrl = require('./auth.ctrl.js');

const auths = new Router();

auths.post('/login', authCtrl.login);
auths.get('/check', authCtrl.check);
auths.post('/logout', authCtrl.logout);
auths.post('/register', authCtrl.register);


module.exports = auths; 