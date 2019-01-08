Page({
  //页面的初始数据
  data: {
    //作者
    author: '',
    //书名
    bookname: '',
    //类型
    lx: '点击选择类型',
    //类别
    lb: '点击选择类别',
    //简介
    jj: '',
    //标题
    title: '',
    //内容
    content: '',
    //类型展示
    lxzs: false,
    //类别展示
    lbzs: false
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let author = JSON.parse(options.author)
    this.setData({
      author: author
    })
  },

  //类型展示
  lxzs: function(e){
    let thiz = this
    if(!this.data.lxzs){
      this.setData({
        lxzs: true
      })
    }else{
      this.setData({
        lxzs: false
      })
    }
  },

  //类别展示
  lbzs: function (e) {
    let thiz = this
    if (!this.data.lbzs) {
      this.setData({
        lbzs: true
      })
    } else {
      this.setData({
        lbzs: false
      })
    }
  },

  //类别展示
  lbzsfz: function(e){
    this.setData({
      lb: e.currentTarget.dataset.text,
      lbzs: false
    })
  }

})