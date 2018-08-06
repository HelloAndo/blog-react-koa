const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const logger = require('koa-logger')
const cors = require('koa-cors')

const redis = require('./redis/index')

var debug = require('debug')('demo:server');
var http = require('http');

const jwt = require('jsonwebtoken')
const { secret, codes } = require('./tools/const')

const API_PREFIX = '/api'

// bin/www
const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const article = require('./routes/article')

var server = http.createServer(app.callback());
server.listen(3001);
// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(__dirname + '/uploads'))
// app.use(require('koa-static')(__dirname + 'uploads'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(async (ctx, next) => {
  ctx.url = ctx.url.replace(API_PREFIX, '')
  console.log(ctx.url)
  await next()
})
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

app.use(async (ctx, next) => {
  const { authorization } = ctx.header
  if (authorization) {
    try {
      ctx.tokenPass = jwt.verify(authorization, secret)
      await next()
    } catch (e) {
      let errorType = e.name.toLowerCase()
      // redis.
      if (errorType === 'tokenexpirederror') {
        ctx.body = {
          code: codes.jwtExpired,
          msg: 'token过期了'
        }
      } else if (errorType === 'jsonwebtokenerror') {
        ctx.body = {
          code: codes.invalidSign,
          msg: 'token签名错误'
        }
      }
    }
  } else {
    // ctx.tokenPass = false
    ctx.body = {
      code: codes.noLogin,
      msg: '请先登录'
    }
  }
})

app.use(upload.routes(), upload.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
