// pages/my/my_performance/performance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ["期间"],
    tab: [true],
    period: [{ id: 1, title: "2019-04" }, { id: 2, title: "2019-03"}],
    period_id: 0,
    period_txt: "",
    markList: [
      {
        id:'0',
        month: '2019-04',
        mMark: '80',
        cMark:'90',
        total: '85'
      },
      {
        id:'1',
        month: '2019-03',
        mMark: '88',
        cMark: '80',
        total: '84'
      }
    ]
  },
  // 选项卡
  filterTab: function (e) {
    var tabData = [true, true],
      index = e.currentTarget.dataset.index;
    tabData[index] = !this.data.tab[index];
    this.setData({
      tab: tabData
    })
  },

  //筛选项点击操作
  filter: function (e) {
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
  getDataList: function () {
    //调用数据接口，获取数据
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onReady: function () {
    this.dialog = this.selectComponent('#dialog');
  },
  tapDialog: function (e) {
    var index = e.currentTarget.dataset.id;
    var detail = this.data.markList[index];
    this.dialog.setData({
      title: detail.month,
      content: "店长评分：" + detail.mMark + "\n客户评分：" + detail.cMark,
      cancelText:'',
      okText: '确定'
    });
    this.dialog.show();
  },
  okEvent: function () {
    console.log(this.dialog.data.okText);
    this.dialog.close();
  }
})