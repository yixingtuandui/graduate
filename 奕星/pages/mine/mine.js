var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iAuthor: false,
    user:null

  },

  //关于我们
  goAbout: function () {
    wx.navigateTo({
      url: '../mine/about/about'
    })
  },

  name: function(e){
    wx.showToast({
      title: '该项不可修改',
      icon: 'none',
      duration: 2000
    })
  },

  //意见反馈
  goFeedback: function () {
    wx.navigateTo({
      url: `../mine/feedback/feedback`
    })
  },

  //签到
  signing: function () {
		wx.request({
			url:app.globalData.url+'sign',
			data:{uname:app.globalData.user.name},
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			method:'POST',
			success:function(result) {
				wx.navigateTo({
					url: '../mine/signingg/signingg?res='+JSON.stringify(result.data),
				})
			},
		})
  },

  //个人资料
  myself: function () {
    wx.navigateTo({
      url: `../mine/myselff/myselff`,
    })
  },

  //充值
  rechargee:function(){
    wx.navigateTo({
      url: `../mine/rechargeee/rechargeee`,
    })
  },

  //我的购买
  buybook:function(){
    wx.navigateTo({
      url: `../mine/buybookk/buybookk`,
    })
  },

 //作者
  iAuthor:function(){
    if(this.data.iAuthor){
      this.setData({
        iAuthor: false
      })
    }else{
      this.setData({
        iAuthor: true
      })
    }
  },

  //我是作者
  bea: function () {
    let thiz = this
    if (app.globalData.user.penName != ''){
      wx.navigateTo({
        url: '/pages/author_update/author_update'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '你还不是作者,成为作者点击确认',
        success: function (res) {
          if(res.confirm){
            thiz.ima()
          }
        }
      })
    }
  },

  //成为作者
  ima: function () {
    let thiz = this
    if (app.globalData.user.penName == ''){
      wx.navigateTo({
        url: '/pages/mine/author/author'
      })
    }else{
      wx.showToast({
        title: '你已经是作者了',
        icon: 'none',
        duration: 2000
      })
    }
  },

  //我的消息
  iinformation:function(){
    wx.navigateTo({
      url: `../mine/iinformationn/iinformationn`,
    })
  },


  //监听页面加载
  onLoad: function () {
    console.log(app.globalData.user)
		var that=this
    that.setData({
      userInfo:app.globalData.user
    })
  }
})