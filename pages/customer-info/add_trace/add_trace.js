// pages/customer-info/add_trace/add_trace.js
const app = getApp();
var util = require('/../../../utils/util.js');
Page({
    data: {
        date: "",
        today: "",
        cliId: ""
    },

    onLoad: function(options) {
        var today = util.formatDate(new Date());
        this.setData({
            today: today,
            date: today,
            cliId: options.cliId
        })
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        })
    },
    formSubmit: function(e) {
        wx.request({
            method: 'post',
            url: app.globalData.url.url + "/record",
            data: {
                "client.cliId": this.data.cliId,
                "advisor.empId": app.globalData.user.empId,
                recTrackDate: new Date(e.detail.value.date),
                recTrackDesc: e.detail.value.desc,
                recRecipeChangeDesc: e.detail.value.adjustment
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                if (res.statusCode == 201) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'none',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        })
                    }, 1000)
                } else {
                    wx.showToast({
                        title: '服务器出现错误',
                        icon: 'none',
                        duration: 2000
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
    }
})