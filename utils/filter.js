const _ = require('lodash')


function isEmpty(val) {
  if (_.isEmpty(val)) {
    return true;
  }
  return false;
}

function isEmail(val) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (reg.test(val.toLowerCase())) {
    return true;
  }
  return false;
}

function isBlank(val) {
  const reg = /^\s*$/
  if (reg.test(val)) {
    return true;
  }
  return false;
}

function hasBlank(val) {
  const reg = /\s/
  if (reg.test(val)) {
    return true;
  }
  return false;
}

function len(val, len) {
  if (val && val.length === len) {
    return true;
  }
  return false;
}

function min(val, len) {
  if (val && val.length >= len) {
    return true;
  }
  return false;
}

function max(val, len) {
  if (val && val.length <= len) {
    return true;
  }
  return false;
}

module.exports = {
  isEmpty,
  isEmail,
  isBlank,
  hasBlank,
  len,
  min,
  max
}
