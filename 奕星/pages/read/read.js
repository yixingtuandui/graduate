// pages/read/read.js
var url
var num = 0
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //加载完成
  onLoad:function(e){
    console.log(e.url)
    var thiz=this
    num = 0
    url = e.url 
    wx.request({
      url: 'http://localhost:8080/read',
      data: {
        url: url+ '/' + num + '.txt'
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        thiz.setData({
          read:res.data
        })
       },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //上一章
  syz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
    
    if(num>0){
      --num
      wx.request({
        url: 'http://localhost:8080/read',
        data: {
          url: url + '/' + num + '.txt'
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {

          thiz.setData({
            read: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })

    }
  },
  //下一章
  xyz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
    
    if(num>=0){
      ++num
      wx.request({
        url: 'http://localhost:8080/read',
        data: {
          url: url + '/' + num + '.txt'
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {

          thiz.setData({
            read: res.data
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    

  },
  //目录
  ml:function(){

  }
})