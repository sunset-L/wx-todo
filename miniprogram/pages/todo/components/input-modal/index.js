Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean,
    // 从外部控制样式
    extClass: String,
    // 初始化内容
    initContent: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    keyBoardHeight: 0,
    focus: false,
    content: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('close')
    },
    confirm() {
      this.triggerEvent('confirm', this.data.content)
    },
    empty() {},
    onShow() {
      this.setData({
        focus: true,
        content: this.properties.initContent || ''
      })
      wx.onKeyboardHeightChange(res => {
        console.log(res)
        this.setData({
          keyBoardHeight: res.height
        })
      })
    },
    onHide() {
      this.setData({
        keyBoardHeight: 0
      })
      wx.offKeyboardHeightChange()
    },
    handleInput(e) {
      this.data.content = e.detail.value
    }
  },
  observers: {
    show(val) {
      if (val) {
        this.onShow()
      } else {
        this.onHide()
      }
    }
  }
})
