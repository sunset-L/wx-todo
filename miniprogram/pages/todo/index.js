Page({
  data: {
    incompleteTodo: [],
    completeTodo: [],
    showInput: false, // 输入弹窗
    showSlide: ''
  },
  onLoad: function () {
    this.fetchList()
  },

  onShareAppMessage() {
    return {
      imageUrl: '/assets/img/share.jpg'
    }
  },

  // 查列表
  fetchList() {
    wx.showNavigationBarLoading()
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'list'
      },
    }).then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        incompleteTodo: res.result.incomplete,
        completeTodo: res.result.complete
      })
    })
  },
  // 切换输入框弹层展示
  switchInputModal() {
    this.setData({
      showInput: !this.data.showInput
    })
  },
  // 新增请求
  addTodo(e) {
    const content = e.detail
    if (!content.trim()) { // 没有内容直接关闭
      this.switchInputModal()
      return
    }
    wx.showNavigationBarLoading()
    return wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'add',
        content: content
      },
    }).then(() => {
      wx.hideNavigationBarLoading()
      this.switchInputModal()
      this.fetchList()
    })
  },
  // 控制要显示的项
  slideShow(e) {
    this.setData({
      showSlide: e.detail
    })
  },
})