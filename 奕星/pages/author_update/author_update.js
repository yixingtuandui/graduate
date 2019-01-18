var app = getApp()

Page({
  data: {
    //用于接收跳转页面传递过来的数据
    user: [],
    //用于判断显示特定窗口函数
    details: false,
    //查询参数
    type: '',
    //书籍信息
    items: [],
    left: 0
  },

  //页面加载
  onLoad: function(){
    this.visual_width()
  },

  //页面显示
  onShow: function () {
    this.setData({
      user: app.globalData.user.name
      // user: '数钱手抽筋'
    })
  },

  //显示展示书籍视图
  details: function(e){
    if(this.data.details == false){
      this.bookdetails('')
      this.setData({
        details: true
      })
    }else{
      this.setData({
        details: false
      })
    }
  },

  //获取书籍
  bookdetails: function(e){
    let thiz = this
    wx.showLoading({
    })
    wx.request({
      url: 'http://www.tf6boy.vip/bookdetails',
      method: 'GET',
      data: {
        //author: thiz.data.user.pen_name,
        author: app.globalData.user.name,
        type: e
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        if(res.data.length == 0){
          wx.showToast({
            title: '没有找到相应书籍',
            icon: 'none',
            duration: 2000
          })
        }
        thiz.setData({
          items: res.data
        })
      },
      fail: function () {
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  //书籍详情跳转
  authors: function(e){
    //获取书籍类型id
    let book = e.currentTarget.dataset.text
    //查询对应类型
    wx.request({
      url: 'http://www.tf6boy.vip/booktype',
      method: 'GET',
      data: {
        id: book.type
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
				console.log([book, res.data])
        let obj = JSON.stringify([book, res.data])
        wx.navigateTo({
          url: 'update_book/update_book?obj=' + obj + ''
        })
      }
    })
  },

  //获取input值到data的type
  assignment:function(e){
    this.setData({
      type: e.detail.value
    })
  },

  //搜索
  query(e) {
    this.bookdetails(this.data.type)
  },

  //删除
  remove: function(e){
    let thiz = this
    //获取该书在数组中的下标
    let index = e.target.dataset.index
    let book = e.currentTarget.dataset.text
    wx.showModal({
      title: '下架书籍',
      content: '书籍下架后将无法恢复！！',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://www.tf6boy.vip/bookremove',
            method: 'GET',
            data: {
              id: book.id,
              addr: book.addr
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              if (res.data) {
                //删除数组中下架的书籍
                thiz.data.items.splice(index, 1)
                //重新赋值书籍数组不然页面无法实时更新
                thiz.setData({
                  items: thiz.data.items
                })
                wx.showToast({
                  title: '书籍下架成功',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '书籍下架失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function () {
              wx.showToast({
                title: '书籍下架异常',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      }
    })
  },

  //添加新书
  addbook: function(e){
		
    let author = JSON.stringify(app.globalData.user.name)
    // let author = JSON.stringify(this.data.user)
    wx.navigateTo({
      url: 'add_book/add_book?author=' + author +''
    })
  },

  visual_width: function (e) {
    let thiz = this
    wx.getSystemInfo({
      success: function (res) {
        let visual_width = res.windowWidth
        thiz.setData({
          left: visual_width*0.96 -28
        })
      },
    })
  }
})