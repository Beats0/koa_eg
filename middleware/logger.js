// 记录访问日志
module.exports = function () {
  return async (ctx, next) => {
    const start = Date.now()
    // 错误日志
    try {
      await next()
      let ms = Date.now() - start
      console.log(`${ctx.request.method} ${ctx.url} ${ms} ms`)
    } catch (err) {
      console.error(err)
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        type: 'error',
        msg: err.message
      }
    }
  }
}
