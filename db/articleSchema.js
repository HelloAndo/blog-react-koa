const articleSchema = {
  time: { type: Date, default: Date.now },
  title: String,
  abstract: String,
  author: String,
  tag: [
    {
      tagId: { type: Number, default: 0 },
      tagName: String
    }
  ],
  content: String,
  markdown: String,
  imgUrl: [String],
  classic: String,
  show: { type: Number, default: 0 },
  pv: { type: Number, default: 0 },
  markNum: { type: Number, default: 0 },
  markList: [
    {
      userName: String,
      userEmail: String,
      markShow: { type: Number, default: 1 },
      markTime: { type: Date, default: Date.now },
      markContent: String,
      likeNum: { type: Number, default: 0 },
      like: [ String ],
      replyList: [
        {
          replyName: String,
          replyEmail: String,
          replyShow: { type: Number, default: 1 },
          replyUser: String,
          replyTime: { type: Date, default: Date.now },
          replyContent: String
        }
      ]
    }
  ]
}

module.exports = articleSchema