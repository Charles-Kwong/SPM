// pages/tracing/tracing_list.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        customerList: [{
                text: '杨美丽',
                url: '/pages/customer-info/customer_info'
            },
            {
                text: '客户B',
                url: ''
            }
        ]
    },
    bindSearch: function() {
        wx.navigateTo({
            url: '../search/search'
        })
    },
    upper: function() {
        wx.showNavigationBarLoading()
        this.refresh();
        console.log("刷新");
        setTimeout(function() {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }, 2000);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: app.globalData.url.url + '/client/list/' + app.globalData.user.empId,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                var customerList = res.data;
                //更新数据
                that.setData({
                    customerList: customerList
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})