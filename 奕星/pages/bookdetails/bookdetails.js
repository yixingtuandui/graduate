// bookdetails.wxml
Page({
  data:{
    boksxq:[],
    type:[]
  },
  onPullDownRefresh:function(){
    var that=this
    wx.showNavigationBarLoading()
    console.log(that.data.boksxq.id)
    wx.request({
      url: 'http://www.tf6boy.vip/bookx',
      data: { bid: that.data.boksxq.id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        that.setData({
          boksxq: res.data
        })
        wx.hideNavigationBarLoading()
        that.type();
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad:function(option){
    var ty=this
    var boks=JSON.parse(option.obj);
    this.setData({
      boksxq:boks
    })
    console.log(ty.data.boksxq.type)
    ty.type();
  },
  type:function(){
    var ty = this
    wx.request({
      url: 'http://www.tf6boy.vip/type',
      data: { id: ty.data.boksxq.type },
      header: {},
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        ty.setData({
          type: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  read1:function(){
    wx.redirectTo({
      url: '../read/read',
      success: function(res) {
      },
      fail: function (res) { console.log(123)},
      complete: function (res) { console.log(222)},
    }) 
  }
})