const Router = require('koa-router');
const editorCtrl = require('./editor.ctrl.js');


const editors = new Router();

// auths.post('/login', authCtrl.login);
// auths.get('/check', authCtrl.check);
// auths.post('/logout', authCtrl.logout);
// auths.post('/register', authCtrl.register);
editors.post('/upload', editorCtrl.checkAdmin, editorCtrl.uploadImage);
editors.post('/filter', editorCtrl.checkAdmin ,editorCtrl.deleteImage);

module.exports = editors; 