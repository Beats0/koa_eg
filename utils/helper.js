const jwt = require('jsonwebtoken')
const { jwtConfig } = require('../config')

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;

function ms(num, option) {
  switch (option) {
    case 's':
      return num * s;
    case 'm':
      return num * m;
    case 'h':
      return num * h;
    case 'd':
      return num * d;
    default:
      throw new Error('option case error')
  }
}

function jwtSign(uid, uname) {
  const payload = {
    uid,
    uname
  }
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

module.exports = {
  ms,
  jwtSign
}
