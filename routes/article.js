const router = require('koa-router')()

const article = require('../api/article')

router.prefix('/article')

router.post('/add', article.ADD_ARTICLE)
router.get('/getArticle', article.FIND_ARTICLE)
router.get('/getArticleList', article.FIND_ARTICLE_LIST)

module.exports = router