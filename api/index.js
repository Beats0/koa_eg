const Router = require('koa-router')
const user = require('./user')

const router = new Router({
  prefix: 'api'
})

router.get('/', async (ctx) => {
  ctx.throw(403, '403 Forbidden')
});


router.use(user.routes(), user.allowedMethods())

module.exports = router
