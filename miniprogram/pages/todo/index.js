const globalData = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: [
      {content: 1},
      {content: 1},
      {content: 1},
      {content: 1},
      {content: 1},
      {content: 1},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('todo loaded')
    // globalData.onLoad = this.onLoad
  },
  onShow() {
    console.log('todo show')
  }
})