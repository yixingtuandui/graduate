// pages/search/search.js
var count = 1
var s=""
var flag = true
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if(flag==true){
      console.log(flag)
      wx.showLoading({
        title: '玩命加载中',
        mask: true,
        success: function (res) {
          wx.stopPullDownRefresh()
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      var thiz = this
      wx.request({
        url: 'http://www.tf6boy.vip/booksearch',
        data: {
          book: s,
          pageNums: ++count
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          thiz.setData({
            dat:res.data
          })
          if (res.data == "") {
            flag = false
          } else {
            thiz.setData({
              book: thiz.data.book.concat(res.data),
            })
          }
          wx.hideLoading()
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 searchBtn: function (e) {
 
     s=e.detail.value
     
   this.qq(s)
  },
  qq:function(s){
    var thiz = this
    wx.request({
      url: 'http://www.tf6boy.vip/booksearch',
      data: {
        book: s,
        pageNums: count
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        thiz.setData({
          book: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   xq: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: 'http://www.tf6boy.vip/bookx',
      data: { bid: id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res)
        var bok = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bookdetails/bookdetails?obj=' + bok,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})