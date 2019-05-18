// pages/customer-info/edit_info/edit_info.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: "",
        customer: {},
        typeIndex: "",
        type: ["试用阶段", "已购买"],
        firstDesc: ''
    },
    bindDateChange: function(e) {
        this.setData({
          date: e.detail.value
        })
    },
    bindPickerChange: function(e) {
        this.setData({
            typeIndex: e.detail.value
        })
    },
    bindTextareaBlur: function(e) {
        this.setData({
            firstDesc: e.detail.value
        })
    },
    formSubmit: function(e) {
      var id = this.data.customer.cliId;
        wx.request({
            method: 'put',
            url: app.globalData.url.url + "/client/" + this.data.customer.cliId,
            data: {
                'advisor.empId': app.globalData.user.empId,
                'cliType.typeId': parseInt(this.data.typeIndex) + 1,
                cliPurchaseDate: this.data.date,
                cliFirstDesc: this.data.firstDesc
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                if (res.statusCode == 201) {
                    // 修改成功
                    wx.showToast({
                        title: '修改成功',
                        icon: 'none',
                        duration: 1000
                    });
                  setTimeout(function () {
                    wx.redirectTo({
                      url: "/pages/customer-info/customer_info?cliId=" + id
                    })
                  }, 1000)
                } else {
                    wx.showToast({
                        title: '服务器出现错误',
                        icon: 'none',
                        duration: 1000
                    })
                }
            },
            fail: function(res) {
                wx.showToast({
                    title: res.errMsg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            customer: {
                cliId: options.cliId,
                cliType: options.cliType,
                cliPurchaseDate: options.cliPurchaseDate,
                cliFirstDesc: options.cliFirstDesc
            },
            typeIndex: options.cliType - 1,
            firstDesc: options.cliFirstDesc,
            date: options.cliPurchaseDate
        })
    }
})