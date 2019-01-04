// bookdetails.wxml

Page({
  data:{
    boksxq:[],
    type:[]
  },
  onPullDownRefresh:function(){
    wx.showNavigationBarLoading()
  },
  onLoad:function(option){
    var ty=this
    var boks=JSON.parse(option.obj); 
    console.log(boks)
    this.setData({
      boksxq:boks
    })
    wx.request({
      url: 'http://localhost:8080/type',
      data: { id: boks.type},
      header: {},
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.addr)
        ty.setData({
          type:res.data,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    console.log(boks.type)
  },
  read1:function(){
    wx.redirectTo({
      url: '../read/read?url=' + this.data.boksxq.addr,
      success: function(res) {
      },
      fail: function (res) { console.log(123)},
      complete: function (res) { console.log(222)},
    }) 
  }
})