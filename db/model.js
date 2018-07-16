const mongodb = require('./config')

let Schema = mongodb.Schema

const articleSchema = require('./articleSchema')

// 不同于关系型数据库，MongoDB作为文档型数据库，Scheme、model、collection、document是其中的四大元素。document是MongoDB里的基本存储单位，collection是众多同类document的集合。Schema定义了一类document的模板，让这一类document在数据库中有一个具体的构成、存储模式。而Schema仅仅是定义了Document是什么样子的，至于生成document和对document进行各种操作（增删改查）则是通过相对应的model来进行的。
// 需要说明的是MongoDB中实际上只有collection和document，Schema和model不过是定义和生成前二者过程中的工具而已



// 用户
let adminUser = {
  user: String,
  password: String,
  email: String,
  token: String,
  remark: { type: String, default: '暂无' },
  joinTime: { type: Date, default: Date.now }
}

// 登陆日志
let loginLogs = {
  user: String,
  ip: String,
  message: String,
  loginTime: { type: Date, default: Date.now }
}

// 数据模板
let UserSchema = new mongodb.Schema(adminUser)
let LogSchema = new Schema(loginLogs)
let ArticleSchema = new Schema(articleSchema)


let UserModel = mongodb.model('userModel', UserSchema)
let LogModel = mongodb.model('logModel', LogSchema)
let ArticleModel = mongodb.model('articleModel', ArticleSchema)


module.exports = {
  UserModel,
  LogModel,
  ArticleModel
}