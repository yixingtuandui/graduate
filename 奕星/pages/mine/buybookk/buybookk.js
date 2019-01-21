// pages/buybookk/buybookk.js
const app = getApp();
const util = require('../../../utils/util.js');
var users, bid, listData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    users = app.globalData.user;
    var that = this;
    // 查询购买书籍 
    wx.request({
      url: app.globalData.url+'mybooks',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        uid: users.id
      },
      success: function (result) {
        console.log(result)
        that.setData({
          listData: result.data,
        })
        listData = result.data
      }})
  },

  gointo:function(e){
    bid = listData[e.currentTarget.dataset.go];
    console.log(bid)
    wx.navigateTo({
      url: '/pages/bookdetails/bookdetails?obj=' +JSON.stringify(bid),
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})