// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // flag: true,
    // modalHidden: true
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
  onLoad: function (options) {
   
  },

  // buttonTap: function () {
  //   this.setData({
  //     modalHidden: false
  //   })
  // },
  
  previewImage: function (e) {
    var imgurl = e.currentTarget.dataset.imgurl;
    var urls = new Array();
    urls.push(imgurl);
    console.log(imgurl);
    wx.previewImage({
      urls: urls
    });
  },

  // callzou: function () {
  //   this.setData({ flag: false })
  // },
  // closeMask: function () {
  //   this.setData({ flag: true })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  

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

  }
})