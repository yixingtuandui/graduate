 //获取应用实例
var app = getApp()
var count = 1;
var counts = 1;
var flge = true;
var flges = true;
// var cx,rq;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color1: '',
    color2:'',
    tyname: [],
    cx:[],
    rq:[],
    stats:'',
    imgUrls: [
      '../../img/rotation_chart/1.jpg',
      '../../img/rotation_chart/2.jpg',
      '../../img/rotation_chart/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
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
  //获取当前滑块的index
  bindchange: function (e) {
    // 获取分类
    const that = this;
    if (e.detail.current==1){
      var list = this;
    wx.request({
      url: 'http://www.tf6boy.vip/showType',
      method: "POST",
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log(res.data)
        list.setData({
          tyname: res.data
        })
      }
    })
    }
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    this.shopp();
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //推荐
  recommend: function (e) {
    var thiss = this
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: '推荐'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiss.setData({
          items: res.data
        })
      }
    })
  },
  //排行
  ranking: function (e) {
    var thiss = this
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: '排行'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiss.setData({
          items: res.data
        })
      }
    })
  },
  //男生
  boy: function (e) {
    var thiss = this
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: '男'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiss.setData({
          items: res.data
        })
      }
    })
  },
  //女生
  girl: function (e) {
    var thiss = this
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: '女'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiss.setData({
          items: res.data
        })
      }
    })
  },
  //首页书籍跳转
  tiaozhuan: function (e) {
    console.log(132)
  },
  // 那个类型的书籍
    thisType: function (e) {
    var tyn = e.currentTarget.dataset.id
    console.log(tyn)
    wx.request({
      url: 'http://www.tf6boy.vip/booksType',
      data: {
        type: tyn,
        pageNum:0
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        var books = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bkdts/bkdts?showBooks=' + books,
        })
        // console.log(books)
      }
    })
  },
  // 畅销
  shopp:function(e){
    var that = this;
    console.log(that.data.cx)
    flge=true
    if (flge == true) {
      // console.log(flge)
      wx.showLoading({
        title: '玩命加载中',
      })
    that.setData({
      color2: '',
      color1: 'red',
      stats: 'c',
    })
    console.log(counts)
    wx.request({
      url: 'http://www.tf6boy.vip/shopp',
      data: { pageNum: counts},
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        counts++
        if (res.data == "") {
          flge = false
        } else {
          if (that.data.cx == '') {
            that.setData({
              cx: res.data
            })
          } else {
            that.setData({
              cx: that.data.cx.concat(res.data)
            })
          }  
        }
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    }
  },
  // 人气
  heat:function(){
    var that = this;
    console.log(that.data.rq)
  if(flges==true){
    wx.showLoading({
      title: '玩命加载中',
    })
    that.setData({
      color2:'red',
      color1:'',
      stats:'r'
    })
  // console.log(count)
  wx.request({
    url: 'http://www.tf6boy.vip/heat',
    data: {
      pageNum: count
    },
    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      // console.log(that.data.stats)
      console.log(res.data)
      count++
      if (res.data == "") {
          flges=false
      } else {
        if (that.data.cx==''){
          that.setData({
            rq: res.data
          })
        }else{
          that.setData({
            rq: that.data.rq.concat(res.data)
          })
        }
      }
      wx.hideLoading();
    },
    fail: function (res) { },
    complete: function (res) { },
    })
    }
  },
  lowers:function(){
    var that=this
   if(that.data.stats=='c'){
     that.shopp()
   }else if(that.data.stats=='r'){
     that.heat()
   }
  },
  xq: function (e) {
    console.log(e.currentTarget.dataset.id)
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
  }
})