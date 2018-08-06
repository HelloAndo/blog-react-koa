const jwt = require('jsonwebtoken')

const { secret } = require('../tools/const')

const { UserModel, LogModel } = require('../db/model')

const redis = require('../redis/index')

let resObj = (code, msg, token, resData) => ({
  status: code,
  msg,
  token,
  data: resData
})

let logObj = (user, ip, msg) => ({
  user,
  ip,
  message: msg
})


exports.USER_REGISTER = async (ctx, next) => {
  // if (ctx.method === 'OPTIONS') {
  //   ctx.status = 204
  //   add_header 'Access-Control-Allow-Origin' '*';
  //   add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';

  //   add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,authorization';

  //   add_header 'Access-Control-Max-Age' 1728000;
  //   add_header 'Content-Type' 'text/plain; charset=utf-8';
  //   add_header 'Content-Length' 0;
  //   return 204
  // }
  console.log(ctx)
  let { body, ip } = ctx.request
  let { user, password } = body
  if (!user || !password) {
    ctx.status = 200
    ctx.body = resObj(-1, '参数不全')
    return
  }
  let userObj = { user }
  // const userIp = ip.match(/\d+.\d+.\d+.\d+/)[0]
  // let logInfo = logObj(user, userIp, '注册账号')
  try {
    await UserModel.find(userObj).exec()
      .then(data => {
        if (data.length) {
          ctx.body = resObj(2, '用户名已存在')
        } else {
          // body.token = jwt.sign({
          //   user_id: user
          // }, secret, {
          //   expiresIn: '1h'
          // })
          let newUser = new UserModel(body)
          newUser.save()
          // 日志服务
          // let logRegister = new LogModel(logInfo)
          // logRegister.save()
          
          ctx.status = 200
          ctx.body = resObj(0, '注册成功', undefined, { user, password })
        }
      })
      .catch(e => {
        ctx.body = resObj(1, '发生错误', e.toString())
      })
  } catch (e) {
    ctx.body = resObj(3, '数据库错误', e.toString())
  }
}

exports.USER_LOGIN = async (ctx, next) => {
  let { user, password } = ctx.query
  if (!user || !password) {
    ctx.status = 200
    ctx.body = resObj(-1, '参数不全')
    return
  }
  let userObj = { user }
  try {
    await UserModel.find(userObj).exec()
      .then(data => {
        if (data.length == 1) {
          if (data[0].password === password) {
            const token = jwt.sign({
              user_id: data[0]._id
            }, secret, {
              expiresIn: '10h'
            })
            userObj.password = password
            UserModel.findOneAndUpdate(userObj, {
              token
            }).exec()
            // 跨域，无法设置cookie
            // ctx.cookies.set('blogreactkoa', token, {
            //   domain: 'localhost',
            //   path: '/',
            //   maxAge: 1000 * 60 * 60
            // })

            redis.setToken(Object.assign(userObj, { token }))

            ctx.body = resObj(1, '登陆成功', token, { user, password })
          } else {
            ctx.body = resObj(2, '不存在用户名')
          }
        } else {
          ctx.body = resObj(0, '发生错误', e.toString())
        }
      })
  } catch (e) {
    ctx.body = resObj(0, '数据库错误', e.toString())
  }
}

exports.USER_LOGOUT = async (ctx, next) => {
  let { user } = ctx.query
  debugger
}