let db = require('mongoose')
const DB_URL = `mongodb://localhost:27017/my_blog_database`
db.Promise = global.Promise

db.connect(DB_URL, {
  // useMongoClient: true
})

db.connection.once('connected', () => {
  console.log('connected mongoodb!')
})

db.connection.on('error', () => {
  console.log('连接错误：')
})

db.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected')
})

module.exports = db