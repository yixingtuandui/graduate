// pages/read/read.js
var app = getApp()
var flag = true//控制目录
var flag1 =""//控制上一章按钮
var flag2 = true//控制文章内容和章节按钮
var flag3=""//控制下一章按钮
var a =[]//接受页面跳转数据
var b =1//获取input的内容
var read=""//文章内容
var djz = ""//章节名称
Page({

  /**
   * 页面的初始数据
   */
  data: {
    read:"",
    a:[],
    flag:false,
    flag2:true,
    flag1:"",
    flag3:"",
    b:1,
    directory:[],
    djz:"第1章",
    flagx:false,
    flags:false,
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
    this.setData({
      flag1: true,
      djz:this.data.djz,
    })
    var thiz=this
    a =  JSON.parse(e.url)
    if(wx.getStorageSync(a.id+"")!=""){
      thiz.setData({
        djz:wx.getStorageSync(a.id+""),
        flag1:false
      })
      wx.request({
        url: app.globalData.url+'zjnr',
        data: {
          bid: a.id,
          djz: thiz.data.djz,
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
    }else{
      wx.request({
        url: app.globalData.url+'zjnr',
        data: {
          bid: a.id,
          djz: thiz.data.djz,
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
  //上一章
  syz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
      wx.request({
        url: app.globalData.url+'read',
        data: {
          bid: a.id,
          djz: thiz.data.djz,
          flag:false
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          thiz.setData({
            read: res.data.stringBuffer,
            djz: res.data.djz1,
            flag3:false
          })
          wx.setStorageSync(a.id+"",thiz.data.djz)
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    wx.setStorageSync(a.id+"",thiz.data.djz)
      if(this.data.djz=="第2章"){
        this.setData({
          flag1: true
        })
      }else{
        this.setData({
          flag1: false
        })
    }
  },
  //下一章
  xyz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
      wx.request({
        url: app.globalData.url+'read',
        data: {
          bid:a.id,
          djz: thiz.data.djz,
          flag:true
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          if(res.data!=""){
            thiz.setData({
              read: res.data.stringBuffer,
              djz: res.data.djz1
            })
            wx.setStorageSync(a.id + "", thiz.data.djz)
          }else{
            console.log(123)
            thiz.setData({
              read:"已完结",
              flag3:true,
              djz: thiz.data.djz
            })
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    thiz.setData({
      flag1: false
    })

  },
  //点击目录
  ml:function(){
    if (this.data.b==1) {
      this.setData({
        flags: true
      })
    }
    var that = this
    that.setData({
      flag2:false,
      flag:true
    })
    wx.request({
      url: app.globalData.url+'zj',
      data: {
        bid:a.id,
        pages:b
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var list = []
        for (var i = 0; i<res.data.length-1; i++) {
          list.push(res.data[i])
        }
        that.setData({
          directory:list
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //获取input内容
  sss:function(e){
    this.setData({
      b:e.detail.value
    })
  },
  //点击目录列表
  djml:function(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      flag:false,
      flag2:true,
      djz:e.currentTarget.dataset.id
    })
    var that =this
    wx.request({
      url: app.globalData.url+'zjnr',
      data: {
        bid:a.id,
        djz: that.data.djz
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          read:res.data
        })
        wx.setStorageSync(a.id + "", that.data.djz)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    if (e.currentTarget.dataset.id=="第1章"){
      that.setData({
        flag1: true
      })
    }else{
      that.setData({
        flag1:false
      })
    }
  },
  //上一页
  syy:function(){
    if(this.data.b<=2){
     this.setData({
       flags:true
     })
    }
    console.log(this.data.b)
    this.setData({
      b: this.data.b - 1
    })
    var that = this
    wx.request({
      url: app.globalData.url+'zj',
      data: {
        bid: a.id,
        pages: this.data.b
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var list = []
        for (var i = 0; i<res.data.length-1; i++) {
          list.push(res.data[i])
        }
        if (res.data != '') {
          that.setData({
            directory: list,
            flagx:false
          })
        } else {
          that.setData({
            flagx: true
          })
        }

      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //下一页
  xyy:function(){
    this.setData({
      b: Number(this.data.b) + 1,
      flags:false
    })
    var that = this
    wx.request({
      url: app.globalData.url+'zj',
      data: {
        bid: a.id,
        pages: that.data.b
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var list = []
        for (var i = 0; i<res.data.length-1; i++) {
          list.push(res.data[i])
        }
        console.log(that.data.b)
        if(res.data!=''){
          that.setData({
            directory: list
          })
        }else{
          that.setData({
            flagx:true,
            b:that.data.b-1
          })
          console.log(that.data.b)
          wx.showToast({
            title: '没有更多了',
            duration: 1000,
            mask: true
          })
        }
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //跳转
  tz:function(){
    var that = this
    if(that.data.b)
    wx.request({
      url: app.globalData.url+'zj',
      data: {
        bid: a.id,
        pages: that.data.b
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data.length - 1)
        console.log(res.data)
        
          var list=[]
          for(var i=0 ;i<res.data.length-1;i++){
            console.log(111)
            list.push(res.data[i]) 
          }
          that.setData({
            directory: list,
            flags:false,
            flagx:false
          })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})