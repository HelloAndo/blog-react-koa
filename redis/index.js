const redis = require('redis')
const redisStore = require('koa-redis')

const bluebird = require('bluebird')

const conf = require('./config')

let client = redis.createClient(conf)

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

// redis链接监听start
client.on('error', err => {
  console.log('redis错误', err)
})

client.on('connect', err => {
  err && console.log('redis_connect错误')
})

client.on('reconnecting', err => {
  err && console.log('redis_reconnecting错误')
})

client.on('end', err => {
  err && console.log('redis_end错误')
})
// redis链接监听end

client.setToken = async function setToken (user) {
  let arr = []

  for (const key in user) {
    arr.push(key)
    arr.push(!!user[key] ? user[key] : '')
  }

  // 延时清除token
  setTimeout(() => {
    client.deleteToken(user)
  }, 1000 * 5);
  // await client.deleteToken(user.user)
  // client.hsetAsync(user.token, ...arr)
  client.hsetAsync(user.user, ...arr)
    .then(res => {
      console.log('设置redis', res)
    })
    .catch(err => {
      console.log('设置redis失败', err)
    })
}

client.getToken = async function getToken (user) {
  
}

client.deleteToken = async function deleteToken (user) {
  client.keysAsync(user.user)
    .then(res => {
      console.log('get all keys of username', res)
      client.delAsync(user.user)
    })
    .catch(err =>{
      console.log('获取所有keys失败', err)
    })
}

module.exports = client