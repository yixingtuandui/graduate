var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user: []
  },

  onLoad: function (options) {
    let user = app.globalData.user
    if(user.sex == '男'){
      this.setData({
        nan: true,
        nv: false
      })
    }else{
      this.setData({
        nan: false,
        nv: true
      })
    }
    this.setData({
      user: user,
    })
  },

  //手机号码
  goiphone: function (e) {
    wx.navigateTo({
      url: '../ihuawei/ihuawei',
    })
  },

  flag: function(){
    wx.showToast({
      title: '此选项不可修改',
      icon: 'none',
      duration: 2000
    })
  },

  sex: function(e){
    let thiz = this
    if (e.type == 'tap') {
      let sex = e.target.dataset.text
      wx.request({
        url: app.globalData.url+'sexupdate',
        method: 'GET',
        data: {
          id: thiz.data.user.id,
          sex: sex
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data != null){
            app.globalData.user = res.data
            wx.showToast({
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  }
})
