const Router = require('koa-router');
const editorCtrl = require('./editor.ctrl.js');


const editors = new Router();

// auths.post('/login', authCtrl.login);
// auths.get('/check', authCtrl.check);
// auths.post('/logout', authCtrl.logout);
// auths.post('/register', authCtrl.register);
editors.post('/upload', editorCtrl.uploadImage);
editors.post('/filter', editorCtrl.deleteImage);

module.exports = editors; 