const Post = require('models/Post');
const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = async (ctx, next) => {
    const { id } = ctx.params;
    if(!ObjectId.isValid(id)){
        ctx.status = 400;
        return;
    }
    return next();

}

exports.create = async (ctx) => {
    const { name, teasers, actors, story, thumbnail, genre, startYear, endYear } = ctx.request.body;
    console.log(ctx.request.body.startYear);
    let post = null;

    try {
        
        post = new Post(ctx.request.body);

        post.save();
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.body = post;
}

exports.list = async (ctx) => {
    const page = parseInt(ctx.query.page || 1, 10);


    if(page < 1){
        ctx.status = 400;
        return;
    }

    try {
        const posts = await Post.find()
                                .sort({_id: -1})
                                .limit(10)
                                .skip((page - 1) * 10)
                                .lean()
                                .exec();
        const postCount = await Post.count().exec();
        const limitStoryLength = post => ({
            ...post,
            actors: post.actors.slice(0, 2),
            story: post.story.length < 200 ? post.story : `${post.story.slice(0, 200)}...`
        });
        ctx.body = posts.map(limitStoryLength);
        ctx.set('Last-Page', Math.ceil(postCount / 10));
    } catch(e) {
        ctx.throw(500, e);
    }
}

exports.read = async (ctx) => {
    const { id } = ctx.params; 

    try {
        const post = await Post.findById(id).exec();
        if(!post) {
            ctx.stauts = 404;
            return;
        }

        ctx.body = post;
    } catch(e) {
        ctx.throw(500, e);
    }
}

exports.getTop4Rated = async (ctx) => {
    const posts = await Post.find()
                        .sort({good: -1, _id: -1})
                        .limit(4)
                        .exec();
    ctx.body = posts;
}

exports.get4Brandnew = async (ctx) => {
    const posts = await Post.find()
                            .sort({firstBroadcasted: -1, _id: -1})
                            .limit(4)
                            .exec();
    ctx.body = posts;
}