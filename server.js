const koa = require('koa')
const koaBody = require('koa-body')
const koaJwt = require('koa-jwt')
const router = require('./routes')
const api = require('./api')
const tokenCheck = require('./middleware/tokenCheck')
const { jwtConfig }  = require('./config')


const app = new koa()

// koa body
app.use(koaBody({
  multipart: true
}))

// ejs
const views = require('koa-views');
app.use(views('views', {extension: 'ejs'}));

// jwt middleware
app.use(tokenCheck())
// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 === err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});

app.use(koaJwt({secret: jwtConfig.secret}).unless({
  path: [
    /^\/api\/user\/login/,
    /^\/api\/user\/register/,
    /^((?!\/api).)*$/,
    // api部分, 设置除了私有接口外的其它资源，可以不需要认证访问,
    /^\/user\/login/,
  ]
}))

app.use(router.routes()).use(router.allowedMethods())
app.use(api.routes()).use(api.allowedMethods())

app.listen(3000, () => {
  console.log('app listening 3000...')
})
