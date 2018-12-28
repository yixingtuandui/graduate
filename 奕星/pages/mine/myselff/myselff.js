Page({
  data: {
    tempFilePaths: '',
    nickName: '',
    userInfoAvatar: '',
    province: '',
    city: '',
    array: ['GG', 'MM'],
    objectArray: [
      {
        id: 0,
        name: 'GG'
      },
      {
        id: 1,
        name: 'MM'
      },
    ],
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          userInfoAvatar: res.tempFilePaths
        })
      },
      radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
      },
    })
  },
  //地址
  goindexx:function(e){
    wx.navigateTo({
      url: '../indexx/indexx',
    })
  },
  
  //手机号码
  goiphone:function(e){
    wx.navigateTo({
      url: '../phonee/phonee',
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })
      },
      fail: function () {
        // fail
        console.log("获取失败！")
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！")
        console.log(this.province)
      }
    })
  }
})
