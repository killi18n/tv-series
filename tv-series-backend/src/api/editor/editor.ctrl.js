const fs = require('fs');
const path = require('path');
const uploadDirPath = '../../../uploads';

exports.uploadImage = async (ctx) => {
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