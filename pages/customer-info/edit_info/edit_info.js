// pages/customer-info/edit_info/edit_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    customer:{},
    typeIndex:"",
    type:["试用阶段","已购买"]
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  }, 
  bindPickerChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      customer: {
        cliId: options.cliId,
        cliType: options.cliType,
        cliPurchaseDate: options.cliPurchaseDate,
        cliFirstDesc: options.cliFirstDesc
      },
      typeIndex:options.cliType
    })
  }
})