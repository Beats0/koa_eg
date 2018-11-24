const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 判断token是否可用
 */
module.exports = function () {
  return async function (ctx, next) {
    try {
      // 获取jwt
      const token = ctx.header.authorization
      if (token) {
        try {
          // 解密payload，获取用户名和ID
          let payload = await verify(token.split(' ')[1], jwtConfig.secret);
          console.log('payload', payload)
          ctx.state = {
            uid: payload.uid
          };
        } catch (err) {
          // token过期
          ctx.status = 401;
          ctx.body = {
            type: 'error',
            msg: 'token已过期'
          };
        }
      }
      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = {
          type: 'error',
          msg: '认证失败'
        };
      }
    }
  }
}
