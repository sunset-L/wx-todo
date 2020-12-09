// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const todosDB = db.collection('todos')

// 处理发来的请求
const actionMapping = {
  list: () => {
    return todosDB.where({
      openId: this.wxContext.OPENID
    }).get()
  },
  // 添加一条记录
  add: (req) => {
    return todosDB.add({
      data: {
        openId: this.wxContext.OPENID,
        content: req.content,
        complete: false
      }
    })
  },
}

// 云函数入口函数
exports.main = async (event, context) => {
  // 直接在全局获取会拿不到
  const wxContext = cloud.getWXContext()
  this.wxContext = wxContext
  return actionMapping[event.action](event, context)
}