Page({
  
  //页面的初始数据 
  data: {
    //书籍数据
    book: [],
    //书籍类型
    type: [],
    //判断显示更新按钮
    shows: '完本',
    //判断显示修改函数
    showss: true,
    //判断显示书籍状态下拉框
    valb: false,
    //书籍价格
    price: 0,
    //书籍状态
    status: '',
    //最新章节
    chapter: 0
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let thiz = this
    let obj = JSON.parse(options.obj)
    thiz.setData({
      book: obj[0],
      type: obj[1],
      //初始化书籍状态及价格
      price: obj[0].price,
      status: obj[0].status
    })
    //获取最新章节
    wx.request({
      url: 'http://www.tf6boy.vip/chapter',
      method: 'GET',
      data: {
        bid: obj[0].bid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiz.setData({
          chapter: res.data[0]
        })
      }
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
    thiz.setData({
      showss: !this.data.showss
    })
    if (thiz.data.showss){
      let price = 'book.price'
      let status = 'book.status'
      thiz.setData({
        [price]: thiz.data.price,
        [status]: thiz.data.status
      })
      wx.request({
        url: 'http://www.tf6boy.vip/author_update',
        method: 'GET',
        data: {
          id: thiz.data.book.bid,
          price: thiz.data.price,
          status: thiz.data.status
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if(res.data){
            wx.showToast({
              title: '修改成功',
              duration: 1000
            })
          }
        }
      })
    }
  },

  //更新章节
  update: function (e) {
    let val = [this.data.book, this.data.chapter]
    let book = JSON.stringify(val)
    wx.navigateTo({
      url: '/pages/author_update/chapter_update/chapter_update?book=' + book + '',
    })
  },

  //跳转阅读
  read: function (e) {
    let book = JSON.stringify(this.data.book)
    wx.navigateTo({
      url: '/pages/read/read?book=' + book + '',
    })
  }
})