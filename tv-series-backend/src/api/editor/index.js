const Router = require("koa-router");
const editorCtrl = require("./editor.ctrl.js");

const editors = new Router();

editors.post("/upload", editorCtrl.checkAdmin, editorCtrl.uploadImage);
editors.post("/filter", editorCtrl.checkAdmin, editorCtrl.deleteImage);

module.exports = editors;
