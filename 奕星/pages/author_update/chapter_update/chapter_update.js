Page({
  //页面的初始数据
  data: {
    //书籍信息
    book: null,
    //文本域高度
    textareaheight: 0,
    //文本域宽
    textareawidth: 0,
    //章节
    chapter: 0,
    //标题
    title: '',
    //内容
    content: ''
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let book = JSON.parse(options.book)
    this.setData({
      book: book[0],
      chapter: book[1]
    })
    this.visual_height()
  },

  //标题
  bindinputbt: function(e){
    this.setData({
      title: e.detail.value
    })
  },

  //内容
  bindinputnr: function(e){
    this.setData({
      content: e.detail.value
    })
  },

  //提交
  tijiao: function(e){
    let thiz = this
    let title = thiz.data.title
    let content = thiz.data.content
    if(title != '' && content != ''){
      wx.request({
        url: 'http://www.tf6boy.vip/bookUpdate',
        method: 'POST',
        data: {
          address: thiz.data.book.addr,
          chapter: ++thiz.data.chapter,
          title: title,
          content: content,
          bid: thiz.data.book.bid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/json'
        },
        success: function (res) {
          if (res.data) {
            wx.showToast({
              title: '更新成功'
            })
            // setTimeout(function () {
            //   wx.redirectTo({
            //     url: '/pages/author_update/update_book/update_book',
            //   })
            // }, 2000)
          }
        }
      })
    }else{
      wx.showToast({
        title: '标题或内容不能为空',
        icon: 'none',
        duration: 2000
      })
    }
  },

  //设置文本域高度
  visual_height: function (e) {
    let thiz = this
    let query = wx.createSelectorQuery()
    //获取指定class的标签
    query.select('.text').boundingClientRect()
    //获取该标签的一些参数方法
    query.exec(function (res) {
      //获取该标签top值
      let swheight = res[0].top
      //获取窗口的一些属性函数
      wx.getSystemInfo({
        success: function (res) {
          //获取窗口可视高度
          let visual_height = res.windowHeight
          //窗口可视宽度
          let visual_width = (res.windowWidth * 0.9)
          //设置文本域随动高度
          thiz.setData({
            textareaheight: (visual_height - swheight-50),
            textareawidth: visual_width
          })
        },
      })
    })
  }
})