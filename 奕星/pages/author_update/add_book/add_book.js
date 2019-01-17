Page({
  //页面的初始数据
  data: {
    //作者
    author: '',
    //书名
    bookname: '',
    //类型
    lx: '',
    //类型对应id
    lxint: 0,
    //全部类型
    lxq: [],
    //类别
    lb: '男',
    //简介
    jj: '',
    //标题
    title: '',
    //内容
    content: '',
    //类型展示
    lxzs: false,
    //类别展示
    lbzs: false,
    //字数限制
    countjj: false,
    countnr: false,
    minjj: 20,
    minnr: 20
  },

  //监听页面加载
  onLoad: function (options) {
    let thiz = this
    let author = JSON.parse(options.author)
    wx.request({
      url: 'http://localhost:8080/booktypes',
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        thiz.setData({
          lxq: res.data,
          author: author,
          lx: res.data[0].typename,
          lxint: res.data[0].tid
        })
      }
    })
  },

  //类型展示
  lxzs: function(e){
    if (!this.data.lxzs){
      this.setData({
        lxzs: true
      })
    }else{
      this.setData({
        lxzs: false
      })
    }
  },

  //类型取值
  lxzsfz: function(e){
    this.setData({
      lx: e.currentTarget.dataset.text,
      lxint: e.currentTarget.dataset.id,
      lxzs: false
    })
  },

  //类别展示
  lbzs: function (e) {
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

  //类别取值
  lbzsfz: function(e){
    this.setData({
      lb: e.currentTarget.dataset.text,
      lbzs: false
    })
  },

  //书名
  bookname: function(e){
    this.setData({
      bookname: e.detail.value
    })
  },
  
  //简介
  jianjie: function(e){
    let number = parseInt(e.detail.value.length)
    this.setData({
      jj: e.detail.value,
      numberjj: number,
      countjj: false
    })
    if (number >= this.data.minjj){
      this.setData({
        countjj: true
      })
    }
  },

  //标题
  title: function(e){
    this.setData({
      title: e.detail.value
    })
  },

  //内容
  neirong: function(e){
    let number = parseInt(e.detail.value.length)
    this.setData({
      content: e.detail.value,
      numbernr: number,
      countnr: false
    })
    if (number >= this.data.minnr) {
      this.setData({
        countnr: true
      })
    }
  },

  //提交申请
  addbook: function(e){
    let thiz = this
    let author = this.data.author
    let bookname = this.data.bookname
    let lxint = this.data.lxint
    let lb = this.data.lb
    let jj = this.data.jj
    let title = this.data.title
    let content = this.data.content
    let countjj = this.data.countjj
    let countnr = this.data.countnr
    if (bookname != '' && jj !='' && title != '' && content != '' && countjj && countnr){
      wx.request({
        url: 'http://localhost:8080/addbook',
        method: 'POST',
        data: {
          author: author,
          bookname: bookname,
          lxint: lxint,
          lb: lb,
          jj: jj,
          title: title,
          content: content
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Accept': 'application/json'
        },
        success: function (res) {
          if(res.data[0] == 0){
            wx.showToast({
              title: '添加失败',
              icon: 'none',
              duration: 2000
            })
          }else if(res.data[0] == -1){
            wx.showToast({
              title: '已有该书籍了',
              icon: 'none',
              duration: 2000
            })
          }else{
            wx.showToast({
              icon: 'loading'
            })
            let obj = JSON.stringify(res.data)
            wx.navigateTo({
              url: 'uploadImg/uploadImg?obj=' + obj + ''
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '请补全数据',
        icon: 'none'
      })  
    }
  }
})