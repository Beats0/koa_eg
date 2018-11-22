const Router = require('koa-router')
const router = new Router()
const user = require('./user')

router
  .get('/', (ctx) => {
    ctx.body = 'Hello koa-jwt'
  })

router.use(user.routes(), user.allowedMethods())

module.exports = router
