// pages/customer-info/customer_info.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        customer: {},
        tracingRecord: [{
            date: "2019-04-01",
            desc: "干燥脱皮，泛红",
            adjustment: "无",
            advisor: "张三"
        }]
    },
    //swiper切换时会调用
    pagechange: function(e) {
        if ("touch" === e.detail.source) {
            let currentPageIndex = this.data.currentIndex
            currentPageIndex = (currentPageIndex + 1) % 2
            this.setData({
                currentIndex: currentPageIndex
            })
        }
    },
    //用户点击tab时调用
    titleClick: function(e) {
        let currentPageIndex =
            this.setData({
                //拿到当前索引并动态改变
                currentIndex: e.currentTarget.dataset.idx
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        Date.prototype.toLocaleString = function() {
            function addZero(num) {
                if (num < 10)
                    return "0" + num;
                return num;
            }
            return this.getFullYear() + "/" + addZero(this.getMonth() + 1) + "/" + addZero(this.getDate());
        };

        var that = this;
        this.setData({
            cliId: options.cliId
        })
        wx.request({
            url: app.globalData.url.url + '/client/' + that.data.cliId,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                var customer = res.data;
                customer.cliPurchaseDate = new Date(customer.cliPurchaseDate).toLocaleString();
                //更新数据
                that.setData({
                    customer: customer
                })
            }
        })
    },
    adddetial: function() {   
        wx.navigateTo({ 
            url: '/pages/customer-info/add_trace/add_trace?cliId=' + this.data.customer.cliId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    editInfo: function() {
        wx.navigateTo({
            url: '/pages/customer-info/edit_info/edit_info?cliId=' + this.data.customer.cliId + "&cliType=" + this.data.customer.cliType.typeId + "&cliPurchaseDate=" + this.data.customer.cliPurchaseDate + "&cliFirstDesc=" + this.data.customer.cliFirstDesc,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
})