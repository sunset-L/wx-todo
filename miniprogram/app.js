import config from 'config/config'

App({
  globalData: {
    isIos: false,
    openid: ''
  },
  onLaunch: function () {
    // 初始化云函数环境
    this.cloudInit()
    // 获取系统配置
    this.getSystemInfo()
    // 获取openId
    // this.getOpenid()
  },

  getOpenid: function() {
    // 调用云函数
    wx.showLoading({
      icon: 'none',
      title: '正在登录'
    })
    wx.cloud.callFunction({
      name: 'login',
      data: {},
    }).then(res => {
      console.log('[云函数] [login] user openid: ', res.result.openid)
      this.globalData.openid = res.result.openid
      wx.hideLoading()
    })
  },
  // 获取系统配置
  getSystemInfo () {
    wx.getSystemInfo().then(res => {
      let platform = res.platform.toUpperCase()
      this.globalData.isIos = platform == 'IOS'
    })
  },
  cloudInit() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: config.cloudEnv,
        traceUser: true,
      })
    }
  }
})
