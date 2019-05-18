// pages/mgr-index/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        gridList: [{
                url: '/pages/mgr-index/client_management/client_list/client_list',
                title: '客户管理',
                iconUrl: '/image/icon/cm.png',
                openType: 'navigate'
            },
            {
                url: '/pages/mgr-index/client_management/employee_list/employee_list',
                title: '员工管理',
                iconUrl: '/image/icon/em.png',
                openType: 'navigate'
            },
            {
                url: '',
                title: '客户分配',
                iconUrl: '/image/icon/fp.png',
                openType: 'navigate'
            },
            {
                url: '',
                title: '员工绩效',
                iconUrl: '/image/icon/ep.png',
                openType: 'navigate'
            },
            {
                url: '',
                title: '我的资料',
                iconUrl: '/image/icon/myinfo.png',
                openType: 'navigate'
            },
            {
                url: '/pages/login/login?logout=true',
                title: '退出登录',
                openType: 'redirect'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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