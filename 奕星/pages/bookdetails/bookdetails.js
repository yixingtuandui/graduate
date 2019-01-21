var boksxq;
var app = getApp()
const util = require('../../utils/util.js');
var bid,uid,boks,bindblurs,flge;
Page({
  data:{
		ico:'../../img/icon/xia.png',
    dian:5,
    boksxq:[],
    type:[],
		buy:'购买此书',
  },
  onPullDownRefresh:function(){
    var that=this
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.url+'bookx',
      data: { bid: that.data.boksxq.id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        that.setData({
          boksxq: res.data
        })
        wx.hideNavigationBarLoading()
        that.type();
      }
    })
  },
  onLoad:function(option){
    var ty=this
    var boks=JSON.parse(option.obj);
		app.globalData.book=boks
		
		this.setData({
      boksxq:boks,
    })
    ty.type();
  },
  type:function(){
    var ty = this
    wx.request({
      url: app.globalData.url+'type',
      data: { id: ty.data.boksxq.type },
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        ty.setData({
          type: res.data
        })
      }
    })
  },
	
	//在线阅读
  read1:function(option){
    wx.redirectTo({
      url: '../read/read?url='+JSON.stringify(this.data.boksxq),
      success: function(res) {
      }
    }) 
		this.historyread();
  },
	//加入书架
	addbookshelf:function(e){
		wx.showModal({
      title: '确认',
      content: "是否添加书架",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
					var that=this
							wx.request({
								url:app.globalData.url+'addshelf',
								data:{
								name: app.globalData.user.name,
								bookid:e.currentTarget.dataset.data.id},
								method:'post',
								header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
								'Accept':'application/json'},
								success:function(result){
									 if(result.data=="请先购买该书籍"){
										wx.showToast({
											title: "请先购买该书籍",
											icon: 'loading',
											duration: 2000,
											mask: true
										})
									}else{
										if(result.data){
											wx.showToast({
												title: '添加成功',
												icon: 'success',
												duration: 1000,
												mask: true
											})
										}else{
											wx.showToast({
												title: '书架已有该书籍',
												icon: 'success',
												duration: 1500,
												mask: true
											})
										}
									}
								},
							})
        } else {
					wx.showToast({
						title: '添加失败',
						image:'/img/bookshelf/error.png',
						duration: 1000,
						mask: true
					})
          console.log('用户点击取消')
        }

      }
    })
	},
	buy: function (e) {
    console.log(e)
		var that=this
    wx.request({
      url: app.globalData.url +'join',
      data: { id:that.data.boksxq.id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) { 
			},
      fail: function (res) { },
      complete: function (res) { },
    })
  },
	// 查询评论 
  comment:function(){
    var that=this;
    wx.request({
      url: app.globalData.url+'lesscomment',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: that.data.boksxq.id
      },
      success: function (result) {
        console.log(result);
        for (var index in result.data) {
          result.data[index].time = util.formatTime(new Date(result.data[index].time));
        };
        that.setData({
          pl_list: result.data,
        })
      },
      fail: res => {
        wx.showToast({
          title: '网络不好哟',
          image: '/img/wrong.jpg',
          duration: 3000
        })
      }
    })
  },
  //用户留言 
  btn_send: function () {
    var that = this
    //添加评论 
    // console.log('文本输入框: input_value :', bindblur); 
    wx.request({
      url: app.globalData.url+'setcomment',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: that.data.boksxq.id,
        uid: app.globalData.user.id,
        context: bindblurs,
        belong: 0,
        time: util.formatTime(new Date()),
        parentid: 0,
      },
      success: function (result) {
				for (var index in result.data) {
					result.data[index].time = util.formatTime(new Date(result.data[index].time));
				};
        that.setData({
          pl_list: result.data,
          input_value: "",
        }),
          wx.showToast({
            title: '评论成功',
            duration: 3000
          })
      },
      fail: res => {
        wx.showToast({
          title: '网络不好哟',
          image: '/image/wrong.jpg',
          duration: 3000
        })
      }
    })
  },
  //更多评论
  btn_send_more:function(){
    wx.navigateTo({
      url: '../comment/comment',
    })
  },
  //购买本书籍
  buybook:function(){
    var that = this
    wx.request({
      url: app.globalData.url+'buybook',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: that.data.boksxq.id,
        uids: app.globalData.user.id,
        time: util.formatTime(new Date()),
      },
      success: function (result) {
          wx.showToast({
            title: result.data,
            duration: 3000
          })
      }
	})
	this.buy()
s	},
	bindblur: function (e) {
    bindblurs = e.detail.value;
  },
	//历史阅读
	historyread:function(e){
		wx.request({
			url:app.globalData.url+'addrecently',
			data: { uname: app.globalData.user.name, bookid:app.globalData.book.id },
			header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			method: 'post',
			success: function (res) {
				
			}
		})
	},
	 // 收缩文本
  dian:function(){
    if(flge){
      this.setData({
        dian: 0,
        ico:'../../img/icon/shang.png'
      })
      flge=false
    }else{
      this.setData({
        dian: 5,
        ico: '../../img/icon/xia.png'
      })
      flge = true
    }
  },
})