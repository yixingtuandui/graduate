// pages/search/search.js
var count = 1//控制搜索结果页码 
var s= ""//搜索的值
var book= []//搜索结果返回数据
var flag= true//判断加载图标
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag1:true,//判断历史开启
    search: '',//输入框内容
    bindSource:[], //控制自动补全
    dat: '',//控制没有更多了 
    history: []//历史搜索缓存
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var num = wx.getStorageSync("serachData")||[]
    console.log(num)
    this.setData({
      history:num
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
    if(flag==true){
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
  //点击软键盘enter搜索
 searchBtn: function (e) {
    count=1
     s=e.detail.value
     this.setData({
       bindSource:[],
       search:s,
     })
   this.qq(s)
   this.history()
  },
  //搜索请求
  qq:function(s){
    var thiz = this
    book=[]
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
        // console.log(res.data)
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
  //实时获取input实时数据并补全
  bindinput:function(e){
    var thiz = this
    var search = e.detail.value
    // console.log(search)
    var list = []
    thiz.setData({
      book:[],
    })
    if(search!=""){
      wx.request({
        url: 'http://www.tf6boy.vip/booksearch',
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
            flag1:false
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      
    }else{
      this.setData({
        flag1:true,
        bindSource: [],
        book: []
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
    this.history()
  },
  delect:function(){
    wx.removeStorageSync("serachData")
    this.setData({
      history:[]
    })
  }, 


  //历史记录
  history:function(){
    var f = true
    if (this.data.history == "") {
      this.data.history.push(this.data.search)
      this.setData({
        history: this.data.history
      })
    } else {
      for (var i = 0; i < this.data.history.length; i++) {
        if (this.data.search == this.data.history[i]) {
          f = false
        }
      }
      if (f) {
        this.setData({
          history: this.data.history.concat(this.data.search)
        })
      }
      // console.log(this.data.history)
    }
    wx.setStorageSync("serachData", this.data.history)
  },

  //点击历史搜索重新搜索
  lsss:function(e){
    this.qq(e.currentTarget.dataset.id)
    this.setData({
      search: e.currentTarget.dataset.id,
      flag1:false
    })
  },
})