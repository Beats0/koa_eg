const crypto = require('crypto')

const secret = 'some secret words'

function hash(val) {
  return crypto.createHmac('sha256', secret).update(val).digest('hex');
}

function randomHash() {
  const random = Date.now() + Math.random()
  return hash(random)
}

module.exports = {
  hash,
  randomHash
}
