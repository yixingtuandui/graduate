// pages/search/search.js
var count = 1
var s=""
var flag = true
var book = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    inputValue:'',
    bindSource:[],
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
        url: 'http://localhost:8080/booksearch',
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
  //点击软键盘enter搜索
 searchBtn: function (e) {
    count=1
     s=e.detail.value
     this.setData({
       bindSource:[],
       search:s
     })
   this.qq(s)
  },
  //搜索请求
  qq:function(s){
    var thiz = this
    book=[]
    wx.request({
      url: 'http://localhost:8080/booksearch',
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
        console.log(res.data)
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
   xq: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: 'http://localhost:8080/bookx',
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
  //实时获取input实时数据并补全
  bindinput:function(e){
    var thiz = this
    var search = e.detail.value
    var list = []
    thiz.setData({
      book:[]
    })
    if(search!=""){
      wx.request({
        url: 'http://localhost:8080/booksearch',
        data: {
          book: search,
          pageNums: 1
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          for (var i = 0; i < res.data.length; i++) {
            list.push(res.data[i].bookName)
          }
          thiz.setData({
            bindSource: list,
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      
    }
    if(search==''){
      this.setData({
        bindSource: [],
        book: []
      })
    }else{
      this.setData({
        bindSource: list
      })
    }
  },
  //点击补全搜索
  itemtap:function(e){
    this.qq(e.target.id)
    var thiz=this
    thiz.setData({
      search:e.target.id,  
      bindSource:[],
    })
  }
})