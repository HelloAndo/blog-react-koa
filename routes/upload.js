const router = require('koa-router')()
const multer = require('koa-multer')

const upload = multer({ dest: 'uploads/' })

let resObj = (code,msg,data) => {
  return {
    status: code,
    msg: msg,
    data: data
  }
}

router.post('/upload', upload.single('articleImage'), async (ctx, next) => {
  console.log(ctx)
  try {
    let fileName = ctx.req.file.filename
    let resData = {}
    resData.fileName = fileName
    resData.filePath = 'uploads/' + fileName
    ctx.body = resObj(1,'上传成功',resData)
  } catch (e){
      ctx.body = resObj(0,'上传出错',e.toString())
  }
})

module.exports = router