const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')

function jwtSign(uid, uname) {
  const payload = {
    uid,
    uname
  }
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

module.exports = {
  jwtSign
}
