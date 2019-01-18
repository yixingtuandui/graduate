var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  pressView: function (e) {
    var viewId = e.target.id
    var viewDataSet = e.target.dataset
    var viewText = viewDataSet.text
  },
	// 页面加载
 onLoad: function (options) {
	 
 },
 
  //手机号码
  goiphone: function (e) {
    wx.navigateTo({
      url: '../ihuawei/ihuawei',
    })
  },

  touxiang:function(e){
    var viewId = e.target.id
    var viewDataSet = e.target.dataset
    var viewText = viewDataSet.text
  },

  mname: function (e) {
    var thiz = this
    wx.request({
      url: app.globalData.url+'',
      data: {
      },
      header: {
        'Content-Type': 'application/json'
      },
    })
  }
})
