const Router = require('koa-router');
const rateCtrl = require('./rate.ctrl.js');

const rates = new Router();

rates.post('/', rateCtrl.rate);
rates.get('/:email', rateCtrl.getList);
rates.get('/rating/:id', rateCtrl.getRating);
// posts.get('/:id', postCtrl.checkObjectId, postCtrl.read);
// // posts.delete('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.remove);
// // posts.patch('/:id', postCtrl.checkLogin, postCtrl.checkObjectId, postCtrl.update);


module.exports = rates;