const User = require('../models/User')
const { jwtSign } = require('../utils/helper')
const filter = require('../utils/filter')
const { hash } = require('../libs/hash')

const someData = async (ctx) => {
  ctx.body = {
    data: 'some data'
  }
}

// home
const userHome = async (ctx) => {
  const {uid, uname} = ctx.state
  ctx.body = {
    uid,
    uname
  }
}

// get userInfo
const userInfo = async (ctx) => {
  const {uid, uname} = ctx.state
  ctx.body = {
    uid,
    uname
  }
}

// get
const login = async (ctx) => {
  await ctx.render('login')
}

// post
const postLogin = async (ctx) => {
  const req = ctx.request.body
  const { pwd } = (await getPwdByEmail(req.email))[0]
  if (hash(req.pwd) === pwd) {
    const session = (await sessionByEmail(req.email))[0]
    ctx.body = {
      type: 'success',
      msg: '登陆成功',
      session,
      token: jwtSign(session.uid, session.uname)
    }
  } else {
    ctx.body = {
      type: 'error',
      msg: '密码错误'
    }
  }
}

// get
const register = async (ctx) => {
  await ctx.render('register')
}

const postRegister = async (ctx) => {
  const req = ctx.request.body
  if (filter.isEmpty(req.pwd)) {
    return ctx.body = {
      type: 'error',
      msg: '密码为空'
    }
  }
  if (!filter.isEmail(req.email)) {
    return ctx.body = {
      type: 'error',
      msg: '邮箱格式错误'
    }
  }
  if (!filter.max(req.pwd, 20) || !filter.min(req.pwd, 8)) {
    return ctx.body = {
      type: 'error',
      msg: '密码长度错误'
    }
  }
  const user = new User({
    uname: req.uname,
    email: req.email,
    pwd: hash(req.pwd)
  })
  const total = await User.findOne({email: user.email}).exec()
  if (total) {
    return ctx.body = {
      type: 'error',
      msg: '邮箱已被注册'
    }
  }
  try {
    await user.save()
  } catch (err) {
    console.log(err)
    ctx.throw(400, err.message)
  }
  ctx.body = {
    type: 'success',
    msg: '注册成功',
    session: (await sessionByEmail(user.email)),
    token: jwtSign(user.uid, user.uname)
  }
}

// find
const sessionByEmail = async (email) => {
  const filter = {email}
  return session = await User
    .find(filter)
    .select('uid uname avatar')
    .exec()
}

const getPwdByEmail = async (email) => {
  const filter = {email}
  return pwd = await User
    .find(filter)
    .select('pwd')
    .exec()
}

module.exports = {
  someData,
  userHome,
  userInfo,
  login,
  postLogin,
  register,
  postRegister
}
