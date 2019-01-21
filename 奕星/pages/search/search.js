// pages/search/search.js
var count = 1//控制搜索结果页码 
var s= ""//搜索的值
var book= []//搜索结果返回数据
var flag= true//判断加载图标
var app = getApp()
var remen = []
var pages = 1
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag2:true,//判断补全开启
    flag1:true,//判断历史开启
    search: '',//输入框内容
    bindSource:[], //控制自动补全
    dat: '',//控制没有更多了 
    history: [],//历史搜索缓存
    remen: [],//热门搜索内容
    pages: 1,//热门搜索分页
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
    var that = this
    wx.request({
      url: app.globalData.url +'Popular',
      data: {
        pages:this.data.pages
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        if(res.data==""){
          that.setData({
            pages:1
          })
          that.onShow()
        }else{
          that.setData({
            remen: res.data
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

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
        url: app.globalData.url+'booksearch',
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
      url: app.globalData.url+'booksearch',
      data: {
        book: s,
        pageNums: count
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if(res.data==""){
          wx.showToast({
            title: '没有更多了',
            duration: 1000,
            mask: true
          })
        }
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
      url: app.globalData.url+'bookx',
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
        url: app.globalData.url+'booksearch',
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
            flag1:false,
            flag2:true
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      
    }else{
      this.setData({
        flag2:false,
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
  //清除搜索历史
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
        wx.setStorageSync("serachData", this.data.history)
      }
      // console.log(this.data.history)
    }
  },

  //点击历史搜索重新搜索
  lsss:function(e){
    this.qq(e.currentTarget.dataset.id)
    this.setData({
      search: e.currentTarget.dataset.id,
      flag1:false
    })
    this.history()
  },
  //点击热门搜索进行搜索
  rmdj:function(e){
    this.qq(e.currentTarget.dataset.id.bookName)
    this.setData({
      search: e.currentTarget.dataset.id.bookName,
      flag1: false
    })
    this.history()
  },
  //换一批
  hyp:function(){
    this.setData({
      pages:Number(this.data.pages)+1
    })
    this.onShow()
  }
})