const router = require('koa-router')()

const { USER_REGISTER, USER_LOGIN } = require('../api/user.js')

router.prefix('/users')

router.all('/register', USER_REGISTER)

router.all('/login', USER_LOGIN)

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })

// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

module.exports = router
