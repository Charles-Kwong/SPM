//index.js
//获取应用实例
var util = require('/../../utils/util.js');
const app = getApp();
Page({
    data: {
        tabTxt: ["跟踪日期", "完成状态"],
        tab: [true, true],
        tracingDate: [{
            id: 1,
            title: "2019-04-01"
        }, {
            id: 2,
            title: "2019-04-02"
        }],
        tDate_id: 0,
        tDate_txt: "",
        tracingState: [{
            id: 1,
            title: "未完成"
        }, {
            id: 2,
            title: "已完成"
        }],
        tState_id: 0,
        tState_txt: "",
        taskList: [],
        taskCompleteCount: 0
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
        var self = this,
            id = e.currentTarget.dataset.id,
            txt = e.currentTarget.dataset.txt,
            tabTxt = this.data.tabTxt;
        var index = e.currentTarget.dataset.index;
        switch (e.currentTarget.dataset.index) {
            case '0':
                tabTxt[0] = txt;
                self.setData({
                    tab: [true, true],
                    tabTxt: tabTxt,
                    tDate_id: id,
                    tDate_txt: txt
                });
                console.log("点击了跟踪日期，" + self.data.tDate_txt);
                break;
            case '1':
                tabTxt[1] = txt;
                self.setData({
                    tab: [true, true],
                    tabTxt: tabTxt,
                    tState_id: id,
                    tState_txt: txt
                });
                console.log("点击了完成状态，" + self.data.tState_txt);
                break;
        }
        //数据筛选
        self.getDataList();
    },
    //加载数据
    getDataList: function() {
        //调用数据接口，获取数据


    },
    onLoad: function() {
        var that = this;

        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var date = util.formatDate(new Date());
        //计算列表中已完成的数量
        var finishCount = 0;
        wx.request({
            url: app.globalData.url.url + '/task/list/' + app.globalData.user.empId,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': wx.getStorageSync("cookies")
            },
            success: function(res) {
                var taskList = res.data;
                for (var index in taskList) {
                    if (taskList[index].taskCompleted == true) {
                        finishCount++;
                    }
                }
                //更新数据
                that.setData({
                    user: app.globalData.user,
                    today: date,
                    taskCompleteCount: finishCount,
                    taskList : taskList
                })
            }
        })
    }
})