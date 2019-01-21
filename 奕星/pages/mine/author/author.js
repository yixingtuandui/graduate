var app = getApp()
Page({
  data: {
    bms: false,
    dhs: false,
    penname: '',
    phone: '',
    sex: '',
    falg: true
  },

  bm: function(e){
    let thiz = this
    if (e.detail.value != '') {
      wx.request({
        url: app.globalData.url+'inspectpenname',
        method: 'GET',
        data: {
          penname: e.detail.value
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data){
            thiz.setData({
              bm: '别名可以使用',
              penname: e.detail.value,
              bms: true
            })
          }else{
            thiz.setData({
              bm: '别名已被注册',
              bms: false
            })
          }
        }
      })
    } else {
      thiz.setData({
        bm: '别名不能为空',
        bms: false
      })
    }
  },

  dh:function(e){
    let thiz = this
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
    if (myreg.test(e.detail.value)) {
      thiz.setData({
        dh: '手机号格式正确'
      })
      wx.request({
        url: app.globalData.url+'inspectphone',
        method: 'GET',
        data: {
          phone: e.detail.value
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.data) {
            thiz.setData({
              dh: '手机号可以使用',
              phone: e.detail.value,
              dhs: true
            })
          } else {
            thiz.setData({
              dh: '手机号已被注册',
              dhs: false
            })
          }
        }
      })
    } else {
      thiz.setData({
        dh: '手机号格式不正确',
        dhs: false
      })
    }
  },

  sex:function(e){
    this.setData({
      sex: e.target.dataset.text
    })
  },

  tj:function(e){
    let thiz = this
    if(thiz.data.bms && thiz.data.dhs && thiz.data.sex != ''){
      if(thiz.data.falg){
        wx.request({
          url: app.globalData.url+'applyauthor',
          method: 'GET',
          data: {
            id: app.globalData.user.id,
            penname: thiz.data.penname,
            phone: thiz.data.phone,
            sex: thiz.data.sex
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.data) {
              thiz.setData({
                falg: false
              })
              wx.showToast({
                title: '提交申请成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            } else {
              wx.showToast({
                title: '提交申请失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '申请正在提交中',
          icon: 'none',
          duration: 1000
        })
      }
    }else{
      wx.showToast({
        title: '你的信息存在错误',
        icon: 'none',
        duration: 2000
      })
    }
  }
})