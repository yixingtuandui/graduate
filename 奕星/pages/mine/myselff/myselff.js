Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  pressView: function (e) {
    var viewId = e.target.id;
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    console.log(e.target); //输出点击的view的id，第二种情况就不重复写了
    console.log(viewText); //输出该文本
  },

  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../myselff/myselff'
  //   })
  // },
  onLoad: function (e) {
    console.log(e)
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  },
  //手机号码
  goiphone: function (e) {
    wx.navigateTo({
      url: '../ihuawei/ihuawei',
    })
  },
  mi:function(e){
    console.log(e)
  },
  touxiang:function(e){
    var viewId = e.target.id;
    var viewDataSet = e.target.dataset;
    var viewText = viewDataSet.text;
    console.log(viewId); 
    console.log(viewText);
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },

  mname: function (e) {
    console.log(e.data)
    var thiz = this
    wx.request({
      url: 'http://www.tf6boy.vip/',
      data: {
        
      },
      header: {
        'Content-Type': 'application/json'
      },
    })
  },
})
