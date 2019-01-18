var count=1
var flge=true
var app = getApp()
Page({
  data:{
    bookslst:[],
    flge: true
  },
  onLoad: function (options){
    var lit = JSON.parse(options.showBooks);
    this.setData({
      bookslst:lit
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    var that=this
    wx.request({
      url: app.globalData.url+'booksType',
      data: {
        type: that.data.bookslst[0].type,
        pageNum: 0
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
       that.setData({
         bookslst:res.data
       })
        wx.hideNavigationBarLoading()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(flge==true){
      wx.showLoading({
        title: '拼命加载中',
      })
    count++
    var that = this
    wx.request({
      url: app.globalData.url+'booksType',
      data: {
        type: that.data.bookslst[0].type,
        pageNum: count
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        console.log(res.data)
        console.log(that.data.flge)
        if(res.data==''){
          flge=false
          that.setData({
            flge:false
          })
        }else{
          that.setData({
            bookslst: that.data.bookslst.concat(res.data)
          })
        }
        wx.hideLoading()
      }
    })
    }
  },
  xq:function(e){
    var id=e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.url+'bookx',
      data: {bid:id},
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var bok=JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bookdetails/bookdetails?obj='+bok,
        })
      }
    })
  }
})