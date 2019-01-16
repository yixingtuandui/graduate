// bookdetails.wxml
var boksxq;
const app = getApp();
const util = require('../../utils/util.js');
var bid, uid,boks;
Page({
  data:{
    boksxq:[],
    type:[],
		buy:'购买此书'

		// addbook:true
  },
  onPullDownRefresh:function(){
    var that=this
    wx.showNavigationBarLoading()
    console.log(that.data.boksxq.id)
    wx.request({
      url: 'http://localhost:8080/bookx',
      data: { bid: that.data.boksxq.id },
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      method: 'post',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data)
        that.setData({
          boksxq: res.data
        })
        wx.hideNavigationBarLoading()
        that.type();
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad:function(option){
    var ty=this
    var boks=JSON.parse(option.obj);
    // console.log(boks.id)
		wx.request({
			url:'http://localhost:8080/addrecently',
			data: { uname: app.globalData.user.name, bookid:boks.id },
			header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			method: 'post',
			success: function (res) {
				
			}
		})
		this.setData({
      boksxq:boks,
    })
    ty.type();
  },
  type:function(){
    var ty = this
    wx.request({
      url: 'http://localhost:8080/type',
      data: { id: ty.data.boksxq.type },
      method: 'post',
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        // console.log(res.data)
        ty.setData({
          type: res.data
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
	
	//在线阅读
  read1:function(option){
    wx.redirectTo({
      url: '../read/read?url='+option.currentTarget.dataset.url,
      success: function(res) {
				
      },
      fail: function (res) { console.log(123)},
      complete: function (res) { console.log(222)},
    }) 
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
								url:'http://localhost:8080/addshelf',
								data:{
								name: app.globalData.user.name,
								bookid:e.currentTarget.dataset.data.id},
								method:'post',
								header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
								'Accept':'application/json'},
								success:function(result){
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
											duration: 5000,
											mask: true
										})
									}
									console.log(result.data)
// 									that.setData({
// 										addbook:result.data.addbookshelf
// 									})
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
		console.log(e.currentTarget.dataset.data.id)
// 		
	},
	// 查询评论 
  comment:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/lesscomment',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: boks.id
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
    console.log(12655219856)
    var that = this
    //添加评论 
    // console.log('文本输入框: input_value :', bindblur); 
    wx.request({
      url: 'http://localhost:8080/setcomment',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: boks.id,
        uid: uid.id,
        context: bindblurs,
        belong: 0,
        time: util.formatTime(new Date()),
        parentid: 0,
      },
      success: function (result) {
        that.setData({
          pl_list: result.data.reverse(),
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
      url: 'http://localhost:8080/buybook',
      method: 'POST',
      header: {
        'content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        bid: boks.id,
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
	}
})