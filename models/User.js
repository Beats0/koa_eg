const mongoose = require('../config/db')
const mongoosePaginate = require('mongoose-paginate')
const filter = require('../utils/filter')

const userSchema = mongoose.Schema({
  uid: {
    type: String,
    index: {
      unique: true
    }
  },
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
  timerecord: {
    type: [Number],
    default: [0, 0, 0, 0, 0]
  },
  iprecord: {
    type: [String],
    default: ['', '', '', '', '']
  },
  status: {
    type: Number,
    default: 1
  }
}, {
  collection: 'User'
})

userSchema.plugin(mongoosePaginate)

userSchema.pre('validate', function (next) {
  if (!filter.min(this.uname, 1)) {
    next(new Error('昵称长度至少为1'))
  } else if (!filter.max(this.uname, 20)) {
    next(new Error('昵称长度最长为20'))
  } else {
    next()
  }
})

module.exports = mongoose.model('User', userSchema)
