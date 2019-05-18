// pages/my/my_performance/performance.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        performanceList: {},
        tabTxt: ["期间"],
        tab: [true],
        period: [],
        period_id: 0,
        period_txt: "",
        markList: []
    },
    // 选项卡
    filterTab: function(e) {
        var tabData = [true, true],
            index = e.currentTarget.dataset.index;
        tabData[index] = !this.data.tab[index];
        this.setData({
            tab: tabData
        })
    },

    //筛选项点击操作
    filter: function(e) {
        console.log(e);
        var self = this,
            id = e.currentTarget.dataset.id,
            txt = e.currentTarget.dataset.txt,
            tabTxt = this.data.tabTxt;
        var index = e.currentTarget.dataset.index;
        switch (e.currentTarget.dataset.index) {
            case '0':
                tabTxt[0] = txt;
                self.setData({
                    tab: [true],
                    tabTxt: tabTxt,
                    period_id: id,
                    period_txt: txt
                });
                break;
        }
        //数据筛选
        self.getDataList();

    },
    //加载数据
    getDataList: function() {
        //调用数据接口，获取数据
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        wx.request({
            url: app.globalData.url.url + '/performance/list/' + app.globalData.user.empId,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'Cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                var performanceList = res.data;
                var monthSet = new Set();
                for (var i in performanceList) {
                    monthSet.add(performanceList[i].pfmPeriodYear + '-' + formatMonth(performanceList[i].pfmPeriodMonth));
                }
                var period = [];
                var monthList = Array.from(monthSet).sort().reverse();
                for (var i in monthList) {
                    period.push({
                        id: parseInt(i) + 1,
                        title: monthList[i]
                    });
                }
                var markList = [];
                performanceList.sort(sortByMonth);
                for (var i in performanceList) {
                    markList.push({
                        id: parseInt(i) + 1,
                        month: performanceList[i].pfmPeriodYear + '-' + formatMonth(performanceList[i].pfmPeriodMonth),
                        mMark: performanceList[i].pfmManagerScore,
                        cMark: performanceList[i].pfmCliScore,
                        total: performanceList[i].pfmTotalScore
                    });
                }
                //更新数据
                that.setData({
                    period: period,
                    markList: markList,
                    performanceList: performanceList
                })
            }
        })
    },
    onReady: function() {
        this.dialog = this.selectComponent('#dialog');
    },
    tapDialog: function(e) {
        var index = e.currentTarget.dataset.id;
        var detail = this.data.markList[index - 1];
        this.dialog.setData({
            title: detail.month,
            content: "店长评分：" + detail.mMark + "\n客户评分：" + detail.cMark,
            cancelText: '',
            okText: '确定'
        });
        this.dialog.show();
    },
    okEvent: function() {
        console.log(this.dialog.data.okText);
        this.dialog.close();
    }
})

function formatMonth(str) {
    var i = parseInt(str);
    if (i < 10) {
        return '0' + str;
    }
    return str;
}

function sortByMonth(o1, o2) {
    var s1 = o1.pfmPeriodYear + '-' + formatMonth(o1.pfmPeriodMonth);
    var s2 = o2.pfmPeriodYear + '-' + formatMonth(o2.pfmPeriodMonth);
    return s1 < s2;
}