const fs = require('fs');
const path = require('path');
const uploadDirPath = '../../../uploads';

exports.checkAdmin = async (ctx, next) => {
    const token = ctx.cookies.get('access_token');

    const decoded = await decodeToken(token);

    const { admin } = decoded;

    if (!admin) {
        ctx.status = 401;
        return;
    }

    return next();

}

exports.uploadImage = async (ctx) => {
    if(!ctx.request.body.files.image) {
        ctx.status = 204;
        return;
    }
    const file = ctx.request.body.files.image;
    const storageFileName = Math.random().toString();
    const reader = fs.createReadStream(file.path);
    const stream = fs.createWriteStream(path.join(__dirname + uploadDirPath, storageFileName + ".jpg"));
    reader.pipe(stream);
    ctx.body = {
        storedFileName: storageFileName + ".jpg",
        localFileName: file.name
    };
}

exports.deleteImage = async (ctx) => {
    const {image} = ctx.request.body;
    if(!fs.existsSync(path.join(__dirname + uploadDirPath, image))) {
        ctx.status = 204;
        return;
    }
    fs.unlinkSync(path.join(__dirname + uploadDirPath, image));
    ctx.status = 204;
    return;
}