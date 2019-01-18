Page({

  /**
   * 页面的初始数据
   */
	var app = getApp()
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
    let pho=this
    console.log('发送获取验证码')
    this.setData({
      alreadySend: true,
      send: false
    })
    wx.request({
      url: app.globalData.url+'ali',
      data: {
        sends:pho.data.phoneNum
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
      }
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
      clearInterval(setTimer)
    })
  },

  // 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
  },

  // 按钮
  activeButton: function () {
    //let{} es6的解构赋值。大括号中的key对应item的key  其值也是相对应的
    let { phoneNum, code } = this.data
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
      url: app.globalData.url+'ali',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          Industry: res.data.data.forecast
        })
      },
      complete: function () {
        that.setData({
          isshow: false
        })
      }
    })
  }
})