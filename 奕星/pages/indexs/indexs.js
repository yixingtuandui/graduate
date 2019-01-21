// pages/index/index.js
const app = getApp();
const util = require('../../utils/util.js');
var userss;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userss:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息

              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bindGetUserInfo: function (e) {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (e.detail.userInfo) {
          app.globalData.userInfo = e.detail.userInfo
          console.log(app.globalData.userInfo)
          //用户按了允许授权按钮
          //插入登录的用户的相关信息到数据库
          wx.request({
            url: app.globalData.url+'userLogin',
            method: "POST",
            data: {
              username: app.globalData.userInfo.nickName,
              avater: app.globalData.userInfo.avatarUrl,
              sex: app.globalData.userInfo.gender,
              date_reg: util.formatTime(new Date()),
            },
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              //console.log(res.data[0])
              app.globalData.user = res.data[0];
              that.setData({
                userss: app.globalData.user
              })
              userss=app.globalData.user
              console.log(userss)
              //授权成功后，跳转进入小程序首页
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        } else {
          //用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击了“返回授权”')
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})