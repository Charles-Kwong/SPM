// pages/customer-info/add_trace/add_trace.js
var util = require('/../../../utils/util.js');
Page({
  data: {
    date:"",
    today:"",
    cliId:""
  },

  onLoad: function (options) {
    var today = util.formatDate(new Date());
    this.setData({
      today: today,
      date: today,
      cliId:options.cliId
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
})