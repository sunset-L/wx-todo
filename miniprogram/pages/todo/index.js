const globalData = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchList()
  },

  // 查列表
  fetchList() {
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'list'
      },
    }).then(res => {
      this.setData({
        todoList: res.result.data
      })
    })
  },
  // 添加一条记录
  addTodo() {
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'add',
        content: ''
      },
    }).then(res => {
    })
  },
  // 处理完成事件
  handleComplete(e) {
    const complete = e.currentTarget.dataset.checked
    const _id = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'update',
        _id: _id,
        body: {
          complete: !complete
        }
      },
    }).then(() => {
      this.fetchList()
    })
  }
})