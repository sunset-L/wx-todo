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
  addTodo() {
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'add',
        content: ''
      },
    }).then(res => {
    })
  }
})