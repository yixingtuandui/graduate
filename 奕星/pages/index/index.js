//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
var userinfo;
var count = 1;
var counts = 1;
var flge = true;
var flges = true;
//设置页码
var pages = 1
//设置上拉刷新类型函数
var loadType = ''
//设置触底函数变量防止多次触发触底函数
var canUseReachBottom = true
//用于接收返回数据长度
var lengths = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
    color1: '',
    color2:'',
    tyname: [],
    cx:[],
    rq:[],
    stats:'',
    //设置点击切换时位置函数
    scrollTop: 0,
    //设置书城主导航页面切换函数
    currentData: 0,
    //用于接收后台传递的数据
    items: [],
    //用于判断是否还有新数据函数
    tips: false,
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		this.recommend()
		this.visual_height()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取当前滑块的index
  bindchange: function (e) {
    // 获取分类
    const that = this;
    if (e.detail.current==1){
		var list = this;
		wx.request({
			url: 'http://localhost:8080/showType',
			method: "POST",
			data: {},
			header: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
			success(res) {
				// console.log(res.data)
				list.setData({
				  tyname: res.data
				})
			}
		})
    }
    that.setData({
	//设置swiper中current的值
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    this.shopp();
		const that = this;
    //判断点击标签中的参数与swiper中current值是否一致不一致切换页面
    if (thaz.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  //推荐
  recommend: function (e) {
	 //重置页码
    pages = 1
    let thiz = this
    wx.request({
		url: 'http://localhost:8080/home_page',
		method: 'GET',
		data: {
			type: '推荐',
			pages: pages
		},
		header: {'content-type': 'application/json'},
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
		}
    })
  },
  //排行
  ranking: function (e) {
	pages = 1
    let thiz = this
    wx.request({
      url: 'http://localhost:8080/home_page',
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
      }
    })
  },
  //男生
  boy: function (e) {
	pages = 1
    let thiz = this
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: '男',
        pages: pages
      },
      header: {'content-type': 'application/json'},
      success: function (res) {
        lengths = res.data.length
        thiz.setData({
          items: res.data,
          scrollTop: 0,
          syfl: 2,
          tips: false
        })
        loadType = '男'
      }
    })
  },
  //女生
  girl: function (e) {
    pages = 1
    let thiz = this
    wx.request({
      url: 'http://localhost:8080/home_page',
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
      }
    })
  },
  //首页书籍跳转
  book_: function (e) {
    let obj = JSON.stringify(e.currentTarget.dataset.text)
		// console.log(obj)
     wx.navigateTo({
       url: '../bookdetails/bookdetails?obj='+obj,
     })
  },
  //scroll-view触底事件
  lower: function(e){
    //判断触底函数是否可用
    if (!canUseReachBottom) return
    //关闭触底函数
    canUseReachBottom = false
    let thiz = this
    //判断加载中
    if(thiz.data.tips != true){
      wx.showLoading({
        title: '正在加载数据中'
      })
    }
    //获取数据
    wx.request({
      url: 'http://localhost:8080/home_page',
      method: 'GET',
      data: {
        type: loadType,
        pages: ++pages
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.length > lengths){
          thiz.setData({
            items: res.data,
          })
          //刷新
          lengths = res.data.length
        }else{
          thiz.setData({
            tips: true
          })
        }
        //开启触底函数
        canUseReachBottom = true;
      },
      complete: function (c) {
        //关闭加载图标
        wx.hideLoading();
      }
    })
  },
  //获取可显示书籍详情高度
  visual_height: function (e) {
    let thiz = this
    let query = wx.createSelectorQuery()
    //获取指定设置ID为swiper1的标签
    query.select('#swiper1').boundingClientRect()
    //获取该标签的一些参数方法
    query.exec(function (res) {
			// console.log(res)
      let swheight = res[0]
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
  // 那个类型的书籍
    thisType: function (e) {
    var tyn = e.currentTarget.dataset.id
    // console.log(tyn)
    wx.request({
      url: 'http://localhost:8080/booksType',
      data: {
        type: tyn,
        pageNum:0
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        // console.log(res.data)
        var books = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bkdts/bkdts?showBooks=' + books,
        })
        // console.log(books)
      }
    })
  },
  // 畅销
  shopp:function(e){
    var that = this;
    // console.log(that.data.cx)
    flge=true
    if (flge == true) {
      // console.log(flge)
      wx.showLoading({
        title: '玩命加载中',
      })
    that.setData({
      color2: '',
      color1: 'red',
      stats: 'c',
    })
    // console.log(counts)
    wx.request({
      url: 'http://localhost:8080/shopp',
      data: { pageNum: counts},
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
        counts++
        if (res.data == "") {
          flge = false
        } else {
          if (that.data.cx == '') {
            that.setData({
              cx: res.data
            })
          } else {
            that.setData({
              cx: that.data.cx.concat(res.data)
            })
          }  
        }
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    }
  },
  // 人气
  heat:function(){
    var that = this;
    // console.log(that.data.rq)
  if(flges==true){
    wx.showLoading({
      title: '玩命加载中',
    })
    that.setData({
      color2:'red',
      color1:'',
      stats:'r'
    })
  // console.log(count)
  wx.request({
    url: 'http://localhost:8080/heat',
    data: {
      pageNum: count
    },
    header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
    method: 'POST',
    dataType: 'json',
    responseType: 'text',
    success: function (res) {
      // console.log(that.data.stats)
      // console.log(res.data)
      count++
      if (res.data == "") {
          flges=false
      } else {
        if (that.data.cx==''){
          that.setData({
            rq: res.data
          })
        }else{
          that.setData({
            rq: that.data.rq.concat(res.data)
          })
        }
      }
      wx.hideLoading();
    },
    fail: function (res) { },
    complete: function (res) { },
    })
    }
  },
  lowers:function(){
    var that=this
   if(that.data.stats=='c'){
     that.shopp()
   }else if(that.data.stats=='r'){
     that.heat()
   }
  },
  // 周
  week:function(){
    wx.request({
      url: 'http://localhost:8080/weekCX',
      data: '',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 月
  month:function(){
    wx.request({
      url: 'http://localhost:8080/monthCX',
      data: '',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        // console.log(res.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  xq: function (e) {
    // console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
    wx.request({
      url: 'http://localhost:8080/bookx',
      data: { bid: id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res)
        var bok = JSON.stringify(res.data)
        wx.navigateTo({
          url: '../bookdetails/bookdetails?obj=' + bok,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
	bindGetUserInfo:function(e){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (e.detail.userInfo) {
           app.globalData.userInfo = e.detail.userInfo
          // console.log(app.globalData.userInfo)
          //用户按了允许授权按钮
          var that = this;
          //插入登录的用户的相关信息到数据库
          wx.request({
            url: 'http://localhost:8080/userLogin',
            method: "POST",
            data: {
              username: app.globalData.userInfo.nickName,
              avater: app.globalData.userInfo.avatarUrl,
              sex: app.globalData.userInfo.gender,
              date_reg: util.formatTime(new Date()),
            },
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function (res) {
              // console.log(res.data[0])
              app.globalData.user = res.data[0];
              that.setData({
                userinfo: res.data[0]
              })
              //授权成功后，跳转进入小程序首页
              // wx.switchTab({
              //   url: '/pages/index/index'
              // })
              // console.log(userinfo)
            }
          })
        } else {
          //用户按了拒绝按钮
          wx.showModal({
            title: '警告',
            content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
            showCancel: false,
            confirmText: '返回授权',
            success: function (res) {
              if (res.confirm) {
                // console.log('用户点击了“返回授权”')
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function (e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})