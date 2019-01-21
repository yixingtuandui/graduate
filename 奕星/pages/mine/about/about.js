Page({
  /**
   * 页面的初始数据
   */
  data: {
    mHidden:true
  },
  changeModel:function(){
    this.setData({
      mHidden:true
    });
  },
  modelCancel:function(){
    this.setData({
      mHidden:true
    });
  },
  btnTap:function(){
    this.setData({
      mHidden:false
    });
  },
  changeModel:function(){
    this.setData({
      mHidden:true
    })
  },
  
  previewImage: function (e) {
    var imgurl = e.currentTarget.dataset.imgurl
    var urls = new Array()
    urls.push(imgurl)
    wx.previewImage({
      urls: urls
    })
  }
})