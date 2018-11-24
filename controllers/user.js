const User = require('../models/User')
const { jwtSign } = require('../utils/helper')
const filter = require('../utils/filter')
const { hash } = require('../libs/hash')
const mongoose = require('mongoose')


// get userInfo
const userInfo = async (ctx) => {
  const { uid } = ctx.state
  if (!uid) {
    return ctx.body = {
      type: 'error',
      msg: '未登录'
    }
  }
  const session = (await sessionByUid(uid))[0]
  ctx.body = {
    session
  }
}

// render login.ejs
const login = async (ctx) => {
  await ctx.render('login')
}

// login
const postLogin = async (ctx) => {
  const req = ctx.request.body
  console.log(req)
  if(!req.email) {
    return ctx.body = {
      type: 'error',
      msg: '邮箱不能为空'
    }
  }
  const { pwd } = (await getPwdByEmail(req.email))[0]
  if (hash(req.pwd) === pwd) {
    const session = (await sessionByEmail(req.email))[0]
    ctx.body = {
      type: 'success',
      msg: '登陆成功',
      session,
      token: jwtSign(session._id, session.uname)
    }
  } else {
    ctx.body = {
      type: 'error',
      msg: '密码错误'
    }
  }
}

// render register ejg
const register = async (ctx) => {
  await ctx.render('register')
}

// register
const postRegister = async (ctx) => {
  const req = ctx.request.body
  const hasUname = await User.findOne({uname: req.uname}).exec()
  if (hasUname) {
    return ctx.body = {
      type: 'error',
      msg: '该昵称已被注册'
    }
  }
  const hasEmail = await User.findOne({"email": {$regex: `${req.email}`, $options: "$i"}}).exec()
  if (hasEmail) {
    return ctx.body = {
      type: 'error',
      msg: '该邮箱已被注册'
    }
  }
  if (filter.isEmpty(req.pwd)) {
    return ctx.body = {
      type: 'error',
      msg: '密码为空'
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
  try {
    await user.save()
    ctx.body = {
      type: 'success',
      msg: '注册成功',
      session: (await sessionByEmail(user.email))[0],
      token: jwtSign(user._id, user.uname)
    }
  } catch (err) {
    ctx.body = {
      type: 'error',
      msg: err.message
    }
  }
}

// get session by uid
const sessionByUid = async (uid) => {
  const filter = { "_id": mongoose.Types.ObjectId(uid) }
  return session = await User
    .find(filter)
    .select('_id uname avatar')
    .exec()
}

// get session by email
const sessionByEmail = async (email) => {
  const filter = { email }
  return session = await User
    .find(filter)
    .select('_id uname avatar')
    .exec()
}

// get password by email
const getPwdByEmail = async (email) => {
  const filter = { email }
  return pwd = await User
    .find(filter)
    .select('pwd')
    .exec()
}

module.exports = {
  userInfo,
  login,
  postLogin,
  register,
  postRegister
}
