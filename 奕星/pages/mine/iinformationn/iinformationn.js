var app=getApp()
Page({
  data:{
    ts: false,
    news: []
  },

  onLoad: function () {
    let thiz = this
    wx.showLoading({
    })
    wx.request({
      url: app.globalData.url+'inews',
      method: 'GET',
      data: {
        uid: app.globalData.user.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.length > 0){
          wx.hideLoading()
          thiz.setData({
            news: res.data,
            ts: false
          })
        }else{
          wx.hideLoading()
          thiz.setData({
            news: res.data,
            ts: true
          })
        }
      }
    })
  },

  //删除全部消息
  des:function(e){
    this.delate(-1)
  },

  //删消消息
  de:function(e){
    let id = e.target.dataset.id
    let index = e.target.dataset.index
    this.delate(id, index)
  },

  delate: function(id,index){
    let thiz = this
    wx.request({
      url: app.globalData.url+'delatenews',
      method: "GET",
      data: {
        uid:app.globalData.user.id,
        id: id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data) {
          if (id == -1) {
            thiz.setData({
              news: []
            })
          } else {
            thiz.data.news.splice(index, 1)
            thiz.setData({
              news: thiz.data.news
            })
          }
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
          })
          if (!(thiz.data.news.length > 0)) {
            thiz.setData({
              ts: true
            })
          }
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})