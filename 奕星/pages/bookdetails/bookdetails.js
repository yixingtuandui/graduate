var boksxq;
const app = getApp();
const util = require('../../utils/util.js');
var bid,uid,boks,bindblurs;
Page({
  data:{
    boksxq:[],
    type:[],
		buy:'购买此书',
		// addbook:true
  },
  onPullDownRefresh:function(){
    var that=this
    wx.showNavigationBarLoading()
    wx.request({
      url: 'http://www.tf6boy.vip/bookx',
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
		wx.request({
			url:'http://www.tf6boy.vip/addrecently',
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
      url: 'http://www.tf6boy.vip/type',
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
      url: '../read/read?url='+option.currentTarget.dataset.url,
      success: function(res) {
      }
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
								url:'http://www.tf6boy.vip/addshelf',
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
		// console.log(e.currentTarget.dataset.data.id)
// 		
	},
	// 查询评论 
  comment:function(){
    var that=this;
    wx.request({
      url: 'http://www.tf6boy.vip/lesscomment',
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
      url: 'http://www.tf6boy.vip/setcomment',
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
      url: 'http://www.tf6boy.vip/buybook',
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
	},
	bindblur: function (e) {
    bindblurs = e.detail.value;
  },
})