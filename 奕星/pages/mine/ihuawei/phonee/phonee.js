
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    buttonType: 'default',
    phoneNum: '',
    code: '',
  },

  
  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
        console.log('phoneNum=' + this.data.phoneNum)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        phoneNum: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      return false
    }
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },

  sendMsg: function () {
    console.log(this.data.xx)
    let pho=this
    console.log('发送获取验证码')
    this.setData({
      alreadySend: true,
      send: false
    })
    wx.request({
      url: 'http://www.tf6boy.vip/ali',
      data: {
        sends:pho.data.phoneNum
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    
    this.timer()
  },

  timer: function () {
    //Promise:ES6将其写进了语言标准 获取异步操作的消息
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            // resolve异步操作成功
            resolve(setTimer)
          }
        }
        , 1000)
    })
    // 将Promise对象的状态从“未完成”变为“成功”
    promise.then((setTimer) => {
      console.log('resolve异步操作成功')
      clearInterval(setTimer)
    })
  },

  // 验证码
  addCode: function (e) {
    console.log('验证码-addCode')
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  // 按钮
  activeButton: function () {
    //let{} es6的解构赋值。大括号中的key对应item的key  其值也是相对应的
    let { phoneNum, code } = this.data
    console.log(this.data)
    if (phoneNum) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
    }
  },
  // 提交
  onSubmit: function () {
    console.log('onSubmit')
    //模拟校验验证码
    if (this.data.code == '123456') {
      wx.showToast({
        title: '验证成功',
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '验证失败',
        icon: 'none'
      })
    }
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (res) {
    var that = this
    wx.request({
      url: 'http://www.tf6boy.vip/ali',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.forecast)
        that.setData({
          Industry: res.data.data.forecast
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        that.setData({
          isshow: false
        })
      }
    })
  },

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