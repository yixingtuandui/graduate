var app=getApp
Page({
  data:{
    tyname:[]
  },
  onLoad:function(){
    var list = this;
    wx.request({
      url: app.globalData.url+'wuxingbookcity_war_exploded/showType',
      method: "post",
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        list.setData({
          tyname: res.data
        })
      }
    })
  },
  thisType:function(e){
    var tyn=e.currentTarget.dataset.id
    wx.request({
      url:app.globalData.url+'wuxingbookcity_war_exploded/booksType',
      data:{
        type:tyn
      },
      method:"post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success:function(res){
        wx.navigateTo({
          url: '../bkdts/bkdts',
        })
      }
    })
  }
})