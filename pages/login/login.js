// pages/login/login.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        disabled: false,
        no: 'tutor',
        pwd: '***',
        noinput: false,
        pwdinput: false,
        items: [{
                name: 'manager',
                value: '店长'
            },
            {
                name: 'employee',
                value: '美容导师',
                checked: 'true'
            },
            {
                name: 'admin',
                value: '管理员'
            }
        ]
    },
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
    noinput: function(e) {
        this.setData({
            no: e.detail.value
        });
        this.setData({
            noinput: true
        });
        if (this.data.noinput == true && this.data.pwdinput == true) {
            this.setData({
                disabled: false
            });
        }

    },
    pwdinput: function(e) {
        this.setData({
            pwd: e.detail.value
        });
        this.setData({
            pwdinput: true
        });
        if (this.data.noinput == true && this.data.pwdinput == true) {
            this.setData({
                disabled: false
            });
        }
    },
    formSubmit: function(e) {
        wx.showLoading({
            title: '登录中...',
        })
        this.setData({
            disabled: true
        });
        wx.request({
            method: 'post',
            url: app.globalData.url.url + "/login",
            data: {
                empName: e.detail.value.no,
                empPassword: e.detail.value.pwd
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 表单
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    app.globalData.user = res.data;
                    var cookie = res.header["Set-Cookie"];
                    cookie = cookie.replace("HttpOnly,", "HttpOnly;");
                    wx.setStorageSync('cookies', cookie);

                    setTimeout(function() {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }, 1000)

                } else if (res.statusCode == 401) {
                    wx.showToast({
                        title: '账号或密码错误',
                        icon: 'none',
                        duration: 1000
                    })
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
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            disabled: false
        });
        wx.request({
            method: 'post',
            url: app.globalData.url.url + '/login',
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    app.globalData.user = res.data;
                    wx.showToast({
                        title: '登陆成功，正在跳转',
                        icon: 'none',
                        duration: 1000
                    })
                    setTimeout(function() {
                        wx.switchTab({
                            url: '../index/index',
                        })
                    }, 1000)
                }
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
        if (this.data.no == '' || this.data.pwd == '') {
            this.setData({
                disabled: true
            });
        } else {
            this.setData({
                disabled: false
            });
        }
    }
})