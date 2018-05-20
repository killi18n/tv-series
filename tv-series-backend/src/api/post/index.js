const Router = require('koa-router');
const postCtrl = require('./post.ctrl.js');

const posts = new Router();

posts.post('/', postCtrl.checkAdmin, postCtrl.create);
posts.get('/', postCtrl.list);
posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);
posts.delete('/:id', postCtrl.checkAdmin, postCtrl.checkObjectId, postCtrl.remove);
// posts.patch('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.update);
posts.get('/home/top4', postCtrl.getTop4Rated);
posts.get('/home/brand4', postCtrl.get4Brandnew);
posts.patch('/:id', postCtrl.checkAdmin, postCtrl.checkObjectId, postCtrl.update);
posts.post('/trash/files', postCtrl.checkAdmin, postCtrl.trash);

module.exports = posts;