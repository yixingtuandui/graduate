var url
var num = 0
var app = getApp()
Page({
  //加载完成
  onLoad:function(e){
    var thiz=this
    num = 0
    url = e.url 
    wx.request({
      url: app.globalData.url+'read',
      data: {
        url: url+ '/' + num + '.txt'
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        thiz.setData({
          read:res.data
        })
       }
    })
  },
  //上一章
  syz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
    
    if(num>0){
      --num
      wx.request({
        url: app.globalData.url+'read',
        data: {
          url: url + '/' + num + '.txt'
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {

          thiz.setData({
            read: res.data
          })
        }
      })
    }
  },
  //下一章
  xyz:function(){
    wx.pageScrollTo({
      scrollTop: 0
    })
    var thiz = this
    
    if(num>=0){
      ++num
      wx.request({
        url: app.globalData.url+'read',
        data: {
          url: url + '/' + num + '.txt'
        },
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          thiz.setData({
            read: res.data
          })
        }
      })
    }
    

  },
  //目录
  ml:function(){

  }
})