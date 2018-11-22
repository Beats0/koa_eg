const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/koa_eg';
mongoose.connect(DB_URL, {useNewUrlParser: true});
mongoose.connection.on('connected', function () {
  console.log('Mongoose connect ' + DB_URL + ' success')
})
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connect Error:' + err)
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connect disconnected')
})


module.exports = mongoose;
