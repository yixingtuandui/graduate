Page({
  //页面的初始数据
  data: {
    book: [],
    img: '',
    tj: true
  },

  //生命周期函数--监听页面加载 
  onLoad: function (options) {
    let author = JSON.parse(options.obj)
    console.log(author)
    this.setData({
      book: author
    })
  },

  //展示图片
  uploadImg: function(){
    let thiz = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        thiz.setData({
            img: res.tempFilePaths
        })
      }
    })
  },

  //上传
  upload: function(){
    let thiz = this
    if(thiz.data.img !== ''){
      if (thiz.data.tj){
        wx.uploadFile({
          url: 'http://localhost:8080/uploadimg?id=' + thiz.data.book[0] + '&imgaddr=' + thiz.data.book[1] + '',
          filePath: thiz.data.img[0],
          name: 'img',
          success: function (res) {
            if(res.data){
              thiz.setData({
                tj: false
              })
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function() {
                wx.navigateBack({
                  delta: 2
                })
              }, 2000)
            }
          }
        })
      }else{
        wx.showToast({
          title: '图片已添加',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '请添加图片',
        icon: 'none',
        duration: 2000
      })
    }
  }
})