var app = getApp()

Page({
  data: {
    //书籍数据
    book: [],
    //书籍类型
    type: [],
    //判断显示修改函数
    showss: true,
    //判断显示书籍状态下拉框
    valb: false,
    //书籍价格
    price: 0,
    //书籍状态
    status: '',
    //最新章节
    chapter: 0,
    //修改图片
    img: '',
    //备份价格状态值
    priceq: 0,
    statusq: ''
  },

  //监听页面加载
  onLoad: function (options) {
    let thiz = this
    let obj = JSON.parse(options.obj)
    thiz.setData({
      book: obj[0],
      type: obj[1],
      //初始化书籍状态及价格
      price: obj[0].price,
      status: obj[0].status,
      priceq: obj[0].price,
      statusq: obj[0].status
    })
    //获取最新章节
    wx.request({
      url: 'http://www.tf6boy.vip/chapter',
      method: 'GET',
      data: {
        bid: obj[0].id
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //设置全局章节变量
        app.globalData.chapter = res.data
        thiz.onShow()
      }
    })
  },

  //页面显示
  onShow: function(){
    this.setData({
      chapter: app.globalData.chapter
    })
  },

  //书籍状态下拉框
  showbox: function (e) {
    this.setData({
      valb: !this.data.valb
    })
  },

  //修改书籍状态
  vals: function (e) {
    let val = e.currentTarget.dataset.name
    this.setData({
      status: val,
      valb: false
    })
  },

  //修改书籍价格
  bindinputprice: function (e) {
    if (!e.detail.value == ''){
      this.setData({
        price: e.detail.value
      })
    }
  },

  //调整
  modify:function(e){
    let thiz = this
    if (!thiz.data.showss){
      let price = 'book.price'
      let status = 'book.status'
      thiz.setData({
        //修改数组中的价格状态值
        [price]: thiz.data.price,
        [status]: thiz.data.status,
        valb: false
      })
      wx.request({
         url: 'http://www.tf6boy.vip/author_update',
        method: 'GET',
        data: {
          id: thiz.data.book.id,
          price: thiz.data.price,
          status: thiz.data.status
        },
        header: {
          'content-type': 'application/json'
        },
         success: function (res) {
          if (res.data) {
            thiz.setData({
              //修改成功更新备份值
              priceq: thiz.data.price,
              statusq: thiz.data.status,
              showss: !thiz.data.showss
            })
            wx.showToast({
              title: '修改成功',
              duration: 2000
            })
          } else {
            thiz.setData({
              //修改失败取备份值
              [price]: thiz.data.priceq,
              status: thiz.data.statusq,
              [status]: thiz.data.statusq,
              showss: !thiz.data.showss
            })
            wx.showToast({
              title: '修改失败',
              duration: 2000
            })
          }
        }
      })
    }else{
      thiz.setData({
        showss: !thiz.data.showss
      })
    }
  },

  //更新章节
  update: function (e) {
    let book = JSON.stringify(this.data.book)
    wx.navigateTo({
      url: '/pages/author_update/chapter_update/chapter_update?book=' + book + ''
    })
  },

  //跳转阅读
  read: function (e) {
    let book = JSON.stringify(this.data.book)
    wx.navigateTo({
      url: '/pages/read/read?url=' + book + ''
    })
  },

  //图片修改
  imgupdate: function(e){
    let thiz = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        thiz.setData({
          img: res.tempFilePaths
        })
        wx.uploadFile({
          url: 'http://www.tf6boy.vip/updateimg?id=' + thiz.data.book.id + '&addr=' + thiz.data.book.addr + '&bookname=' + thiz.data.book.bookName +'',
          filePath: res.tempFilePaths[0],
          name: 'img',
          success: function (res) {
            if(res.data != ''){
              thiz.setData({
                ['book.bookImg']: res.data
              })
              wx.showToast({
                title: '图片修改成功',
                icon: 'none',
                duration: 2000
              })
            }else{
              wx.showToast({
                title: '图片修改失败',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '图片修改失败',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  }
})