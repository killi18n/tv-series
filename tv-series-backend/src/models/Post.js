const mongoose = require('mongoose');

const { Schema } = mongoose;

const teaser = new Schema({
    name: String,
    videoId: String
});

const actor = new Schema({
    name: String,
    img: String
});

const post = new Schema({
    name: String,
    teasers: [teaser],
    actors: [actor],
    story: String,
    thumbnail: String,
    genre: [String],
    startYear: String,
    endYear: {
        type: String,
        default: "Running"
    },
    hit: {
        type: Number,
        default: 0
    },
    good: {
        type: Number,
        default: 0
    },
    bad: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    firstBroadcasted: Date
});

module.exports = mongoose.model('Post', post);
