const Router = require('koa-router')
const user = require('../controllers/user')

const router = new Router({
  prefix: '/user'
})

router
  .get('/', user.userHome)
  .get('/info', user.userInfo)
  .get('/login', user.login)
  .post('/login', user.postLogin)
  .get('/register', user.register)
  .post('/register', user.postRegister)

module.exports = router
