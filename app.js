//app.js
App({
    globalData: {
        url: {
          url: "http://139.199.187.67:8080/spms"
        },
        user: {
        },
        userInfo: {
            eid: "RF001",
            name: "张三",
            position: "美容导师",
            enterDate: "2018-01-01",
            state: "在职",
            gender: "女",
            age: "27",
            phone: "15626123600",
            addr: "深圳市南山区",
            password: "123456",
        }
    },
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    }
})