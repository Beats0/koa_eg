const mongoose = require('../config/db')
const mongoosePaginate = require('mongoose-paginate')
const filter = require('../utils/filter')

const userSchema = mongoose.Schema({
  uname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  pwd: {
    type: String,
    required: true
  },
  sex: {
    type: Number,
    default: 0
  },
  avatar: {
    type: String,
    default: 'https://avatars1.githubusercontent.com/u/42090849?s=200&v=4'
  },
  date: {
    type: Number,
    default: Date.now()
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  collection: 'User'
})

userSchema.plugin(mongoosePaginate)

userSchema.pre('validate', function(next) {
  console.log(this)
  console.log(!filter.min(this.uname, 1))
  if (!filter.min(this.uname, 1)) {
    next(new Error('昵称长度至少为1'))
  } else if (!filter.max(this.uname, 20)) {
    next(new Error('昵称长度最长为20'))
  } else if (filter.hasBlank(this.uname)) {
    next(new Error('昵称不合法'))
  } else if (!filter.isEmail(this.email)) {
    next(new Error('邮箱格式错误'))
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
