const mongoose = require('mongoose');

const { Schema } = mongoose;
const crypto = require('crypto');
const { generateToken } = require('lib/token');

function hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
}

const rated = new Schema({
    itemId: String,
    good: Number,
    bad: Number
});

const account = new Schema({
    email: String,
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    rated: [rated]
});


account.statics.findByEmailOrUsername = function ({ username, email }) {
    return this.findOne({
        $or: [
            { username },
            { email }
        ]
    }).exec();
}

account.statics.findByEmail = function (email) {
    return this.findOne({ email }).exec();
}



account.methods.validatePassword = function (password) {
    const hashed = hash(password);
    return this.password === hashed;
}

account.statics.register = function (count, { username, email, password }) {


    let account = null;

    if (count === 0) {
        account = new this({
            email,
            username,
            password: hash(password),
            admin: true
        });
    } else {
        account = new this({
            email,
            username,
            password: hash(password)
        });
    }


    return account.save();
}

account.methods.generateToken = function () {
    const payload = {
        _id: this._id,
        email: this.email,
        admin: this.admin
    };

    return generateToken(payload, 'account');
}



module.exports = mongoose.model('Account', account);
