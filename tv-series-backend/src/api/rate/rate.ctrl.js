const Account = require('models/Account');
const Post = require('models/Post');


exports.rate = async (ctx) => {
    // console.log(ctx.request.body);
    const { postId, what, email } = ctx.request.body;

    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch (e) {
        ctx.throw(500, e);
    }

    if (!account) {
        ctx.status = 401;
        return;
    }

    let good = 0;
    let bad = 0;
    if (what === "good") {
        good = 1;
        bad = 0;
    } else {
        good = 0;
        bad = 1;
    }

    let hit = false;

    let prevState = 'initial';

    try {
        // console.log(account.rated.length);
        if (account.rated.length === 0) {
            account = await Account.findByIdAndUpdate(account._id, {
                $push: {
                    rated: {
                        itemId: postId,
                        good,
                        bad
                    }
                }
            });
            hit = true;
        } else {
            let existing = false;
            console.log(account.rated);
            account.rated.map(
                (rate, i) => {
                    // if(rate.good === 0 && rate.hit === 0 && rate.bad === 0 ) {
                    //     prevState = 'initial';
                    // }
                    
                    if (rate.itemId === postId) {
                        existing = true;
                        hit = false;
                        if(rate.good === 1) {
                            prevState = 'good';
                        }
                        else {
                            prevState = 'bad';
                        }
                    }
                }
            );
            if (existing) {
                account = await Account.findByIdAndUpdate(account._id, {
                    $pull: {
                        rated: {
                            itemId: postId
                        }
                    }
                });

            } else {
                hit = true;
            }

            account = await Account.findByIdAndUpdate(account._id, {
                $push: {
                    rated: {
                        itemId: postId,
                        good,
                        bad
                    }
                }
            }, { new: true }).exec();
        }


    } catch (e) {
        ctx.throw(500, e);
    }

    let post = null;

    try {
        post = await Post.findById({ _id: postId }).exec();
        console.log(hit);
        console.log(prevState);
        if (hit && prevState === 'initial') {
            console.log('initial');
            if(good === 1) {
                console.log('initial good');
                post = await Post.findByIdAndUpdate(postId, {
                    hit: post.hit + 1,
                    good: post.good + 1,
                    bad: post.bad
                }).exec();
                ctx.body = account.rated;
                return;
            }
            if(bad === 1) {
                console.log('initial bad');
                post = await Post.findByIdAndUpdate(postId, {
                    hit: post.hit + 1,
                    good: post.good,
                    bad: post.bad + 1
                }).exec();
                ctx.body = account.rated;
                return;
            }
        } else {
            if (good === 1 && prevState !== 'good') {
                post = await Post.findByIdAndUpdate(postId, {
                    hit: post.hit,
                    good: post.good + 1,
                    bad: post.bad - 1
                }).exec();
                ctx.body = account.rated;
                return;
            } 
            if(bad === 1 && prevState !== 'bad') {
                post = await Post.findByIdAndUpdate(postId, {
                    hit: post.hit,
                    good: post.good - 1,
                    bad: post.bad + 1
                }).exec();
                ctx.body = account.rated;
                return;
            }
        }

    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = account.rated;


}

exports.getList = async (ctx) => {
    const { user } = ctx.request;
    const { email } = ctx.params;
    if (user.email !== email) {
        ctx.status = 403;
        return;
    }

    let account = null;

    try {
        account = await Account.findByEmail(email);

    } catch (e) {
        console.log(e);
    }

    if (!account) {
        ctx.status = 401;
        return;
    }

    ctx.body = account.rated;

}

exports.getRating = async (ctx) => {
    const { id } = ctx.params;

    let post = null;
    let hit = null;
    let good = null;
    let bad = null;
    try {
        post = await Post.findById(id).exec();
        hit = post.hit;
        good = post.good;
        bad = post.bad;

    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = {
        hit,
        good,
        bad
    };
}
