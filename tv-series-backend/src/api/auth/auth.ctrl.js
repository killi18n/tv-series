const Account = require('models/Account');
const Joi = require('joi');

exports.register = async (ctx) => {
    
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/),
        passwordCheck: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/)
    });

    if(ctx.request.body.password !== ctx.request.body.passwordCheck) {
        ctx.body = "two passwords are incorrect";
        ctx.status = 400;
        return;
    }


    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    const { email, password, passwordCheck } = ctx.request.body;

    let existing = null;

    try {
        existing = await Account.findByEmailOrUsername(ctx.request.body);
    } catch(e) {
        ctx.throw(500, e);
    }

    if(existing) {
        ctx.status = 409;
        ctx.body = {
            key: existing.email === ctx.request.body.email ? 'email' : 'username'
        };
        return;
    }

    let account = null;

    let count = null;

    try {
        count = await Account.count({}).exec();
    } catch(e) {
        ctx.throw(500, e);
    }

    try {
        account = await Account.register(count, {
            username: email.split("@")[0],
            email,
            password
        });
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.body = account.email;

}

exports.login = async (ctx) => {

    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/)
    });


    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400; // Bad Request
        return;
    }

    const { email, password } = ctx.request.body;

    let account = null;

    try {
        account = await Account.findByEmail(email);
    } catch(e) {
        ctx.throw(500, e);  
    }

    if(!account || !account.validatePassword(password)) {
        ctx.status = 403;
        return;
    }

    let token = null;

    try {
        token = await account.generateToken();
    } catch(e) {
        ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = {
        email: account.email,
        admin: account.admin
    };
    
}

exports.check = async (ctx) => {
    const {user} = ctx.request;
    if(!user) {
        ctx.status = 403;
        return;
    }

    ctx.body = user;
}

exports.logout = async (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0, 
        httpOnly: true
    });
    ctx.status = 204;
}