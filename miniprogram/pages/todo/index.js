const globalData = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todoList: [],
    showInput: false, // 输入弹窗
    initTodo: {},
    slideOptions: [
      { key: 'delete', type: 'warn', text: '删除' },
    ],
    showSlide: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        todoList: res.result.data
      })
    })
  },
  // 处理完成事件
  handleComplete(e) {
    const complete = e.currentTarget.dataset.checked
    const id = e.mark.id
    this.editTodo(id, {
      complete: !complete
    }).then(() => {
      this.fetchList()
    })
  },
  // 编辑一条记录
  onEditTodo(e) {
    this.setData({
      initTodo: {
        ...e.mark
      },
      showInput: true
    })
  },
  // 切换输入框弹层展示
  switchInputModal() {
    this.setData({
      showInput: !this.data.showInput
    }, () => {
      if (!this.data.showInput) {
        this.setData({
          initTodo: {}
        })
      }
    })
  },
  // 输入完成
  todoConfirm(e) {
    const {content, id} = e.detail
    if (id) { // 有id去编辑
      this.editTodo(id, {content}).then(() => {
        this.switchInputModal()
        this.fetchList()
      })
    } else {
      this.addTodo(content)
    }
  },
  // 新增请求
  addTodo(content) {
    wx.showNavigationBarLoading()
    return wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'add',
        content
      },
    }).then(() => {
      wx.hideNavigationBarLoading()
      this.switchInputModal()
      this.fetchList()
    })
  },
  // 编辑请求
  editTodo(id, body) {
    wx.showNavigationBarLoading()
    return wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'update',
        _id: id,
        body: body
      },
    }).then(() => {wx.hideNavigationBarLoading()})
  },
  // 控制要显示的项
  slideShow(e) {
    this.setData({
      showSlide: e.mark.id
    })
  },
  slideTap(e) {
    const id = e.mark.id
    wx.showNavigationBarLoading()
    wx.cloud.callFunction({
      name: 'todo',
      data: {
        action: 'remove',
        _id: id,
      },
    }).then(() => {
      wx.hideNavigationBarLoading()
      this.fetchList()
    })
  }
})