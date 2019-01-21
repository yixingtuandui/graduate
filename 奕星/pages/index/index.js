const app = getApp();
//首页设置页码
var pages = 1
//首页设置上拉刷新类型函数
var loadType = ''
//首页设置触底函数变量防止多次触发触底函数
var canUseReachBottom = true
//首页用于接收返回数据长度
var lengths = 0
//分类排行
var count = 1
var counts = 1
var count2
var flge=true
var flges =true
var flge2
var weekb

Page({
  data: {
    //书城导航页面切换函数
    currentData: 0,
    //首页接收后台传递的数据
    items: [],
    //首页用于判断是否还有新数据函数
    tips: false,
    //分类排行
    color1: '',
    color2: '',
    color3: '',
    tyname: [],
    cx: [],
    rq: [],
    heights: '',
    stats: '',
    //轮播图
    imgUrls: [
      '../../img/rotation_chart/1.jpg',
      '../../img/rotation_chart/2.jpg',
      '../../img/rotation_chart/3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },

  //页面加载
  onLoad: function (options) {
    this.visual_height()
    this.recommend()
  },

  //滑动切换页面
  bindchange: function (e) {
    // 获取分类
    var list = this
    if (e.detail.current == 1) {
      wx.request({
        url: app.globalData.url+'showType',
        method: "POST",
        data: {

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          list.setData({
            tyname: res.data
          })
        },
        fail: function (res) {
          wx.showLoading({
            title: '加载失败，请重试',
          })

        },
        complete: function (res) {
          wx.hideLoading 
        }
      })
    }
    list.setData({
      currentData: e.detail.current
    })
  },

  //点击切换
  checkCurrent: function (e) {
    const that = this
    if (e.target.dataset.current == 2) {
      that.shopp()
    }
    if (that.data.currentData === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  //获取显示书籍信息可变高度
  visual_height: function (e) {
    let thiz = this
    let query = wx.createSelectorQuery()
    //获取指定设置ID为swiper1的标签
    query.select('#swiper1').boundingClientRect()
    //获取该标签的一些参数方法
    query.exec(function (res) {
      let swheight = res[0].top
      //获取窗口的一些属性函数
      wx.getSystemInfo({
        success: function (res) {
          //获取窗口可视高度
          let visual_height = res.windowHeight
          //设置展示图书scroll-view的随动高度
          thiz.setData({
            heights: (visual_height - swheight)
          })
        },
      })
    })
  },

  //推荐
  recommend: function (e) {
    //重置页码
    pages = 1
    let thiz = this
    //加载图标
    wx.showLoading({
    })
    wx.request({
      url: app.globalData.url+'home_page',
      method: 'GET',
      data: {
        type: '推荐',
        pages: pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //用于获取数据长度
        lengths = res.data.length
        thiz.setData({
          //添加数据到items数组
          items: res.data,
          //跳转标签时返回顶部
          scrollTop: 0,
          //设置分类属性绑定
          syfl: 0,
          //设置属性绑定用于显示是否还有新数据加载
          tips: false
        })
        //设置触底函数调取数据条件
        loadType = '推荐'
        //关闭加载图标
        wx.hideLoading()
      },
      fail: function(){
        //关闭加载图标
        wx.hideLoading()
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },

  //排行
  ranking: function (e) {
    pages = 1
    let thiz = this
    wx.showLoading({
    })
    wx.request({
      url: app.globalData.url+'home_page',
      method: 'GET',
      data: {
        type: '排行',
        pages: pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        lengths = res.data.length
        thiz.setData({
          items: res.data,
          scrollTop: 0,
          syfl: 1,
          tips: false
        })
        loadType = '排行'
        wx.hideLoading()
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

  //男生
  boy: function (e) {
    pages = 1
    let thiz = this
    wx.showLoading({
    })
    wx.request({
      url: app.globalData.url+'home_page',
      method: 'GET',
      data: {
        type: '男',
        pages: pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        lengths = res.data.length
        thiz.setData({
          items: res.data,
          scrollTop: 0,
          syfl: 2,
          tips: false
        })
        loadType = '男'
        wx.hideLoading()
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

  //女生
  girl: function (e) {
    pages = 1
    let thiz = this
    wx.showLoading({
    })
    wx.request({
      url: app.globalData.url+'home_page',
      method: 'GET',
      data: {
        type: '女',
        pages: pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        lengths = res.data.length
        thiz.setData({
          items: res.data,
          scrollTop: 0,
          syfl: 3,
          tips: false
        })
        loadType = '女'
        wx.hideLoading()
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

  //首页点击书籍跳转详情页
  book_: function (e) {
    let obj = JSON.stringify(e.currentTarget.dataset.text)
     wx.navigateTo({
       url: '../bookdetails/bookdetails?obj='+obj+'',
     })
  },

  //首页上拉加载
  lower: function(e){
    let thiz = this
    //判断触底函数是否可用
    if (!canUseReachBottom) {
      return
    }
    //关闭触底函数
    canUseReachBottom = false
    //判断加载中
    if(thiz.data.tips != true){
      wx.showLoading({
      })
    }
    //获取数据
    if (lengths % 5 == 0){
      wx.request({
        url: app.globalData.url+'home_page',
        method: 'GET',
        data: {
          type: loadType,
          pages: ++pages
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          thiz.setData({
            //将加载数据追加到数组中
            items: thiz.data.items.concat(res.data)
          })
          //获取数组最新长度
          lengths = thiz.data.items.length
          //开启触底函数
          canUseReachBottom = true
          //关闭加载图标
          wx.hideLoading()
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
    }else{
      //显示无数据文本
      thiz.setData({
        tips: true
      })
      //关闭加载图标
      wx.hideLoading()
      //开启触底函数
      canUseReachBottom = true
    }
  },

  //那个类型的书籍
  thisType: function (e) {
    var tyn = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.url+'booksType',
      data: {
        type: tyn,
        pageNum: 0
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        var books = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bkdts/bkdts?showBooks=' + books,
        })
      }
    })
  },

  //畅销
  shopp: function (e) {
    var that = this;
    counts = 1
    weekb = 'shopp'
    that.setData({
      color2: '',
      color1: 'red',
      stats: 'c',
			flgeo:true,
      flgez:false,
      flgey:false,
    })
    wx.request({
      url: app.globalData.url+'' + weekb,
      data: { 
        pageNum: counts 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          cx: res.data
        })
				flge =true
        wx.hideLoading();
      }
    })
  },

  //人气
  heat: function () {
    var that = this;
    weekb = 'heat'
    count = 1
    that.setData({
      color2: 'red',
      color1: '',
      stats: 'r',
      flgeo: true,
      flgez: false,
      flgey: false,
			flg1: true,
      flg2: false
    })
    wx.request({
      url: app.globalData.url+'' + weekb,
      data: {
        pageNum: count
      },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          rq: res.data
        })
				flges = true
        wx.hideLoading();
      }
    })
  },

  // 排行上拉刷新
  lowers: function () {
    var that = this
    switch (weekb) {
      case 'weekCX':
        if (flge2) {
          wx.request({
            url: app.globalData.url+'weekCX',
            data: {
              pageNum: ++count2
            },
            header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == '') {
                flge2 = false;
              } else {
                that.setData({
                  cx: that.data.cx.concat(res.data)
                })
              }
            }
          })
        }
        break;
      case 'weekRQ':
        console.log("weekRQ")
        if (flge2) {
          wx.request({
            url: app.globalData.url+'weekRQ',
            data: {
              pageNum: ++count2
            },
            header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == '') {
                flge2 = false;
              } else {
                that.setData({
                  rq: that.data.rq.concat(res.data)
                })
              }
            }
          })
        }
        break;
      case 'monthCX':
        if (flge2) {
          wx.request({
            url: app.globalData.url+'monthCX',
            data: {
              pageNum: ++count2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == '') {
                flge2 = false;
              } else {
                that.setData({
                  cx: that.data.cx.concat(res.data)
                })
              }
            }
          })
        }
        break;
      case 'monthRQ':
        if (flge2) {
          wx.request({
            url: app.globalData.url+'monthRQ',
            data: {
              pageNum: ++count2
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == '') {
                flge2 = false
              } else {
                that.setData({
                  cx: that.data.rq.concat(res.data)
                })
              }
            }
          })
        }
        break;
      case "shopp":
        if (flge == true) {
          wx.showLoading({
            title: '玩命加载中',
          })
          wx.request({
            url: app.globalData.url+'shopp',
            data: {
              pageNum: ++counts
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            method: 'post',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              if (res.data == "") {
                flge = false
              } else {
                that.setData({
                  cx: that.data.cx.concat(res.data)
                })
              }
              wx.hideLoading()
            }
          })
        }
        break;
      case "heat":
        if (flges == true) {
          wx.showLoading({
            title: '玩命加载中',
          })
          wx.request({
            url: app.globalData.url+'heat',
            data: {
              pageNum: ++count
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
              count++
              if (res.data == "") {
                flges = false
              } else {
                that.setData({
                  rq: that.data.rq.concat(res.data)
                })
              }
              wx.hideLoading()
            }
          })
        }
        break
    }
  },

  //总
  total: function () {
    var that = this
    if (that.data.stats == 'c') {
      that.shopp()
      that.setData({
        color3: 'red'
      })
    } else if (that.data.stats == 'r') {
      that.heat()
      that.setData({
        color3: 'red'
      })
    }
  },

  //周
  week: function () {
    var that = this
    count2 = 1
    if (that.data.stats == 'c') {
      weekb = 'weekCX'
      that.setData({
        cx: [],
        flgeo: false,
        flgez: true,
        flgey: false,
      })
    } else {
      weekb = 'weekRQ'
      that.setData({
        rq: [],
        flgeo: false,
        flgez: true,
        flgey: false,
				flg1: true,
				flg2: false
      })
    }
    wx.request({
      url: app.globalData.url+'' + weekb,
      data: {
        pageNum: count2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        flge2 = true;
        if (weekb == 'weekCX') {
          that.setData({
            cx: res.data
          })
        } else {
          that.setData({
            rq: res.data
          })
        }
      }
    })
  },

  //月
  month: function () {
    var that = this
    count2 = 1
    if (that.data.stats == 'c') {
      weekb = 'monthCX'
      that.setData({
        cx: [],
        flgeo: false,
        flgez: false,
        flgey: true,
      })
    } else {
      weekb = 'monthRQ'
      that.setData({
        rq: [],
        flgeo: false,
        flgez: false,
        flgey: true,
				flg1: false,
        flg2: true
      })
    }
    wx.request({
      url: app.globalData.url+'' + weekb,
      data: {
        pageNum: count2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        flge2 = true;
        if (weekb == 'monthCX') {
          that.setData({
            cx: res.data
          })
        } else {
          that.setData({
            rq: res.data
          })
        }
      }
    })
  },

  xq: function (e) {
    var id = e.currentTarget.dataset.id
    wx.request({
      url: app.globalData.url+'bookx',
      data: {
        bid: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var bok = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bookdetails/bookdetails?obj=' + bok,
        })
      }
    })
  },
})