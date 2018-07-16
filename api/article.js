const Basic = require('./basic')
const jwt = require('jsonwebtoken')
const { ArticleModel } = require('../db/model.js')

function packResult (code, msg, data, ...args) {
  return {
    code,
    msg,
    data
  }
}

class Article extends Basic {
  constructor () {
    super()
  }

  async ADD_ARTICLE (ctx, next) {
    console.log(ctx.request)
    let _article = ctx.request.body
    let addData = new ArticleModel(_article)
    let data = await addData.save()
    ctx.body = packResult(0, '提交成功', data)
  }

  async FIND_ARTICLE_LIST (ctx, next) {
    let {query, body, header: { authorization }} = ctx.request
    if (!authorization) {
      return ctx.body = packResult(-1, '请先登录')
    }

    // token没法获取用户名，用户名被加密了
    // let hh = jwt.verify(authorization, 'handsomeboy')

    let res = await ArticleModel.find(body || {})
    ctx.body = packResult(0, '获取成功', res)
  }

  async FIND_ARTICLE (ctx, next) {
    let query = ctx.request.query
    let res = await ArticleModel.find({_id: query._id} || {})
    console.log(res)
    ctx.body = packResult(0, '获取成功', res)
  }
}

module.exports = new Article()