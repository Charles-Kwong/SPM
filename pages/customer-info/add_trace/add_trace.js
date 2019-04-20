// pages/customer-info/add_trace/add_trace.js
var util = require('/../../../utils/util.js');
Page({
  data: {
    date:"",
    today:""
  },

  onLoad: function (options) {
    var today = util.formatDate(new Date());
    this.setData({
      today: today,
      date: today
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})