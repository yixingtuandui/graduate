// pages/user/user.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //关于我
  goAbout: function () {
    wx.navigateTo({
      url: '../mine/about/about'
    });
    
  },
  //意见反馈
  goFeedback: function () {
    wx.navigateTo({
      url: `../mine/feedback/feedback`
    });
  },
// 签到
  signing: function () {
		wx.request({
			url:'http://localhost:8080/sign',
			data:{uname:"江"},
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			method:'POST',
			success:function(result) {
				console.log(result.data)
				wx.navigateTo({
					url: '../mine/signingg/signingg?res='+JSON.stringify(result.data),
				});
			},
		})
  },
  // 个人资料
  myself: function () {
    wx.navigateTo({
      url: `../mine/myselff/myselff`,
    });
  },
  //余额
  mymoneyy: function(){
    wx.navigateTo({
      url: `../mine/mymoneyy/mymoneyy`,
    });
  },
  //充值
  rechargee:function(){
    wx.navigateTo({
      url: `../mine/rechargeee/rechargeee`,
    });
  },
  //绑定手机
  phone:function(){
    wx.navigateTo({
      url: `../mine/ihuawei/ihuawei`,
    });
  },
  //我的购买
  buybook:function(){
    wx.navigateTo({
      url: `../mine/buybookk/buybookk`,
    });
  },
  //我是作者
  iAuthor:function(){
    wx.navigateTo({
      url: `../mine/iauthorr/iauthorr`,
    });
  },
  //我的消息
  iinformation:function(){
    wx.navigateTo({
      url: `../mine/iinformationn/iinformationn`,
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  bindViewTap: function () {
    wx.navigateTo({
      url: '../mine/myselff/myselff'
    })
  },
  onLoad: function () {
		var that=this
		wx.request({
			data:{id:1},
			url:'http://localhost:8080/member',
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			method:'POST',
			success:function(result){
				console.log(result.data)
				that.setData({
					role:result.data
				});
			}
		})
		if (app.globalData.userInfo) {
			console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })}})