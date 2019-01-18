var app = getApp();

Page({
  data: {
    //书籍信息
    book: [],
    //文本域高度
    textareaheight: 0,
    //章节
    chapter: 0,
    //判断提交
    flag: true,
    //标题
    title: '',
    //内容
    content: ''
  },

  //监听页面加载
  onLoad: function (options) {
    let book = JSON.parse(options.book)
    this.setData({
      book: book,
      chapter: app.globalData.chapter
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
    let number = parseInt(e.detail.value.length)
    this.setData({
      content: e.detail.value,
      number: number
    })
  },

  //提交
  tijiao: function(e){
    let thiz = this
    let title = thiz.data.title
    let content = thiz.data.content
    if(title != '' && content != ''){
      if(thiz.data.flag){
        wx.request({
          url: app.globalData.url+'bookUpdate',
          method: 'POST',
          data: {
            address: thiz.data.book.addr,
            chapter: ++thiz.data.chapter,
            title: title,
            content: content,
            id: thiz.data.book.id
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Accept': 'application/json'
          },
          success: function (res) {
            thiz.setData({
              flag: false
            })
            if (res.data) {
              wx.showToast({
                title: '更新成功',
                duration: 2000
              })
              //更新全局章节数
              app.globalData.chapter = thiz.data.chapter
              //跳转页面
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 2000)
            }else{
              wx.showToast({
                title: '更新失败',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '已提交该章节',
          icon: 'none',
          duration: 2000
        })
      }
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
          //设置文本域随动高度
          thiz.setData({
            textareaheight: (visual_height - swheight-55)
          })
        }
      })
    })
  }
})