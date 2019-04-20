// pages/my/my_info.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    meList: [
      {
        text: '个人资料',
        icon:'/image/icon/info.png',
        url:'/pages/my/my_detail/info_detail'
      },
      
      {
        text: '我的绩效',
        icon: '/image/icon/performance.png',
        url: '/pages/my/my_performance/performance'
      },
      {
        text: '修改密码',
        icon: '/image/icon/modifyPwd.png',
        url: '/pages/my/modify_pwd/modify_pwd'
      }
    ]
  },

  onLoad: function () {
    this.setData({
      userInfo : app.globalData.userInfo
    })
    // console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  }
})
