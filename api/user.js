const Router = require('koa-router')
const user = require('../controllers/user')

const router = new Router({
  prefix: '/user'
})

router
  .get('/', user.someData)
  .post('/login', user.postLogin)
  .post('/register', user.postRegister)

module.exports = router
