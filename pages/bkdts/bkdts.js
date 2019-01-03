// bkdts.wxml
Page({
  data:{
    bookslst:[]
  },
  onLoad: function (options){
    var lit = JSON.parse(options.showBooks);
    this.setData({
      bookslst:lit
    })
    console.log(lit)
  },
  xq:function(e){
    console.log(e.currentTarget.dataset.id)
    var id=e.currentTarget.dataset.id
    wx.request({
      url: 'http://localhost:8080/bookx',
      data: {bid:id},
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res)
        var bok=JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bookdetails/bookdetails?obj='+bok,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})