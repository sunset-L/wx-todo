// pages/todo/components/todo-item/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    showSlide: String,
    item: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideOptions: [
      { key: 'delete', type: 'warn', text: '删除' },
    ],
    showInput: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 输入完成
    todoConfirm(e) {
      const content = e.detail
      if (!content.trim()) {
        this.switchInputModal()
        this.removeItem()
        return
      }
      this.editTodo({content}).then(() => {
        this.switchInputModal()
        this.triggerEvent('refresh')
      })
    },
    // 切换输入框弹层展示
    switchInputModal() {
      this.setData({
        showInput: !this.data.showInput
      })
    },
    // 处理完成事件
    handleComplete() {
      const complete = this.properties.item.checked
      this.editTodo({
        complete: !complete
      }).then(() => {
        this.triggerEvent('refresh')
      })
    },
    // 编辑请求
    editTodo(body) {
      wx.showNavigationBarLoading()
      const id = this.properties.item._id
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
    slideShow() {
      this.triggerEvent('showSlide', this.properties.item._id)
    },
    removeItem() {
      const id = this.properties.item._id
      wx.showNavigationBarLoading()
      wx.cloud.callFunction({
        name: 'todo',
        data: {
          action: 'remove',
          _id: id,
        },
      }).then(() => {
        wx.hideNavigationBarLoading()
        this.triggerEvent('refresh')
      })
    }
  }
})
