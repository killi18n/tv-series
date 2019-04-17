const Account = require('models/Account');
const Joi = require('joi');
const token = require('lib/token');

exports.register = async ctx => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/),
    passwordCheck: Joi.string().regex(
      /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/
    ),
  });

  if (ctx.request.body.password !== ctx.request.body.passwordCheck) {
    ctx.body = 'two passwords are incorrect';
    ctx.status = 400;
    return;
  }

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { email, password } = ctx.request.body;

  let existing = null;

  try {
    existing = await Account.findByEmailOrUsername(ctx.request.body);

    if (existing) {
      ctx.status = 409;
      ctx.body = {
        key: existing.email === ctx.request.body.email ? 'email' : 'username',
      };
      return;
    }

    let account = null;

    let count = null;
    count = await Account.count({}).exec();
    account = await Account.register(count, {
      username: email.split('@')[0],
      email,
      password,
    });

    const generatedToken = await token.generateToken({
      _id: account._id,
      email: account.email,
    });
    ctx.cookies.set('access_token', generatedToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
    });
    ctx.request.user = {
      _id: account._od,
      email: account.email,
    };

    ctx.body = {
      email: account.email,
      isAdmin: account.admin,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.login = async ctx => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,30}$/),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400; // Bad Request
    return;
  }

  const { email, password } = ctx.request.body;

  let account = null;

  try {
    account = await Account.findByEmail(email);

    if (!account || !account.validatePassword(password)) {
      ctx.status = 403;
      return;
    }

    const generatedToken = await account.generateToken();

    ctx.cookies.set('access_token', generatedToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    ctx.request.user = {
      _id: account._id,
      email: account.email,
    };
    ctx.body = {
      email: account.email,
      isAdmin: account.admin,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.check = async ctx => {
  const { user } = ctx.request;
  if (!user) {
    ctx.status = 403;
    return;
  }

  ctx.body = user;
};

exports.logout = async ctx => {
  ctx.cookies.set('access_token', '', {
    maxAge: 0,
    httpOnly: true,
  });
  ctx.request.user = undefined;
  ctx.status = 204;
};
