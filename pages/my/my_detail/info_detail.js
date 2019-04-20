// pages/my/my_detail/info_detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  goToModifyPage: function() {
    console.log("点击了按钮");
    wx.navigateTo({
      url: '/pages/my/modify_info/modify_info',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})