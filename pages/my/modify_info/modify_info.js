const app = getApp();
Page({
    data: {
        user: {},
        focus: false,
        inputValue: '',
        address:'',
        genderItem: ['男', '女'],
        index: -1
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindKeyInput: function(e) {
        console.log('输入内容触发input事件', e.detail)
        this.setData({
            inputValue: e.detail.value
        })
    },
  bindblurEvent: function(e) {
        console.log("失去焦点时", e.detail);
    },
    bindReplaceInput: function(e) {
        var value = e.detail.value
        var pos = e.detail.cursor
        var left
        if (pos !== -1) {
            // 光标在中间
            left = e.detail.value.slice(0, pos)
            // 计算光标的位置
            pos = left.replace(/11/g, '2').length
        }

        // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
        return {
            value: value.replace(/11/g, '2'),
            cursor: pos
        }

        // 或者直接返回字符串,光标在最后边
        // return value.replace(/11/g,'2'),
    },
    bindHideKeyboard: function(e) {
        if (e.detail.value === '123') {
            // 收起键盘
            wx.hideKeyboard()
        }
    },
    bindTextareaBlur: function (e) {
      this.setData({
        address: e.detail.value
      })
    },
    onLoad: function() {
        var user = app.globalData.user;
        this.setData({
            user: user,
            inputValue: user.empPhone,
            address: user.empAddress,
            index: user.empGender == '男' ? 0 : 1
        })
    }
})