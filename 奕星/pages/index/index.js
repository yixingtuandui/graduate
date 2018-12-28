//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tyname: [],
    cx:[],
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
    console.log(e)
    if (e.detail.current==1){
      var list = this;
    wx.request({
      url: 'http://localhost:8080/showType',
      method: "post",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
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
    wx.request({
      url: 'http://localhost:8080/booksType',
      data: {
        type: tyn
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
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
    console.log(e)
    var that=this;
    wx.request({
      url: 'http://localhost:8080/shopp',
      data: '',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        that.setData({
          cx:res.data
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})