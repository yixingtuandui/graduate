var app = getApp()
Page({
  data:{
    phone: 0,
    flag: false
  },
  phone: function(e){
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (myreg.test(e.detail.value)){
      this.setData({
        val: '手机号格式正确',
        phone: e.detail.value,
        flag: true
      })
    }else{
      this.setData({
        val: '手机号格式不正确',
        flag: false
      })
    }
  },

  sbm: function () {
    if(this.data.flag){
      wx.request({
        url: app.globalData.url+'phoneupdate',
        method: 'GET',
        data: {
          id: thiz.data.user.id,
          phone: this.data.phone
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data != null){
            app.globalData.user = res.data
            wx.showToast({
              title: '修改成功',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 2
              })
            }, 2000)
          }else{
            wx.showToast({
              title: '手机号已绑定',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '手机格式不正确',
        icon: 'none',
        duration: 2000
      })
    }
  }
})