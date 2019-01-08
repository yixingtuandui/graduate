Page({
  data: {
    //用于接收跳转页面传递过来的数据
    user: null,
    //用于判断显示特定窗口函数
    details: false,
    //查询参数
    type: ''
  },

  //初始加载
  onLoad: function (options) {
    // var user = JSON.parse(options.obj)
    // this.setData({
    //   user: user
    // })
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
    wx.request({
      url: 'http://www.tf6boy.vip/bookdetails',
      method: 'GET',
      data: {
        //author: thiz.data.user.pen_name
        author: "凯里酸汤鱼",
        type: e
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiz.setData({
          items: res.data
        })
      }
    })
  },

  //书籍详情跳转
  authors: function(e){
    let obj = JSON.stringify(e.currentTarget.dataset.text)
    wx.navigateTo({
      url: 'update_book/update_book?obj='+obj+''
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

  //添加新书
  addbook: function(e){
    //let author = JSON.stringify(this.data.user)
    let author = JSON.stringify('凯里酸汤鱼')
    wx.navigateTo({
      url: 'add_book/add_book?author=' + author +''
    })
  }
})