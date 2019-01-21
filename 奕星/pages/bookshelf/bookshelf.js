var app = getApp()
var books;
Page({
  data: {
		currentTab: 0,
		books:[],
		recentlys:[],
		heights:0,
		//轮播图
		imgUrls: [
		 'http://www.tf6boy.vip/bookcity/com/ke_huan/cywmzxt/介绍/1.jpg',
		 'http://www.tf6boy.vip/bookcity/com/ke_huan/kl/介绍/3.jpg',
		 'http://www.tf6boy.vip/bookcity/com/ke_huan/ljzxhcs/介绍/4.jpg',
		 'http://www.tf6boy.vip/bookcity/com/you_xi/cqnwj/介绍/2.jpg',
		 'http://www.tf6boy.vip/bookcity/com/wu_xia/sxjhz/介绍/3.jpg'
		],
    swiperIndex: 0 
  },
  onLoad: function (options) {
		// this.visual_height()
		// this.bookshelf()
		// this.img()
  },
  onShow:function(){
    this.visual_height()
    this.bookshelf()
    this.img()
  },
	//获取显示书籍信息可变高度
	visual_height: function (e) {
		let thiz = this
		let query = wx.createSelectorQuery()
		//获取指定设置ID为swiper1的标签
		query.select('#swiper').boundingClientRect()
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
					console.log(thiz.data.heights)
				},
			})
		})
	},
	//书架书籍点击事件
	reading:function(e){
		wx.navigateTo({
			url:'../read/read?url='+JSON.stringify(e.currentTarget.dataset.data),
		})
	},
	//书架书籍长按事件
	handleLongPress:function(e){
		var that=this;
		wx.showModal({
			title:'删除书籍',
			content:'确定要删除书籍？',
			cancelText:'否',
			confirmText:'是',
			success:function(res) {
				if(res.confirm){
					//是
					that.deletebook(e.currentTarget.dataset.data.id)
				}else{
					//否	
				}
			}
		})
	},
	//书架书籍添加
	bookadd:function(e){
		wx.switchTab({
			url:'../index/index',
		})
	},
	//最近阅读书籍点击事件
	bookdetails:function(e){
		var bok = JSON.stringify(e.currentTarget.dataset.data)
		var auditing=e.currentTarget.dataset.data.auditing
		if(auditing=="已下架"){
			wx.showToast({
            title: '该书籍已下架',
            icon: 'loading',
            duration: 1500,
            mask:true
        })
				this.deleteHistory(e.currentTarget.dataset.data.id)
		}else{
			wx.navigateTo({
				url:'../bookdetails/bookdetails?obj='+bok,
			})
		}
	},
  //滑动切换
  swiperTab: function (e) {
    var that = this;
	if (e.detail.current == 1) {
			//最近阅读
			that.recently()
    }else{
			//书架
			that.bookshelf()
		}
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
	bookshelf:function(){
		// 页面初始化 options为页面跳转所带来的参数
		var that = this;
		wx.request({
			url:app.globalData.url+'bookshelf',
			data:{uid:app.globalData.user.id},
			header:{'content-type':'application/x-www-form-urlencoded;charset=utf-8',},
			method:'POST',
			success:function(result) {
				that.setData({
					books:result.data,
				});
			}
		})
	},
	recently:function(){
		var that = this;
		wx.request({ 			
			url: app.globalData.url+'recently',
					data: { uid: app.globalData.user.id },
					header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', },
					method: 'POST',
					success: function (result) {
						console.log(result)
							that.setData({
								recentlys: result.data,
							})
					}
			})
	},
	deletebook:function(e){
		var that = this;
		wx.request({
			url:app.globalData.url+'deletebook',
			data:{
				name: app.globalData.user.name,
				bookid:e,
			},
			method:'post',
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			'Accept':'application/json'},
			success:function(result){
				that.setData({
					books:result.data,
				});
			}
		})
	},
	deleteHistory:function(e){
		console.log(e)
		var that=this;
		wx.request({
			url:app.globalData.url+'deleteHistory',
			data:{bid:e},
			method:'POST',
			header:{'content-type':'application/x-www-form-urlencoded;charset=utf-8','Accept':'application/json'},
			success:function(result){
				console.log("删除")
			}
		})
	},
	     /**
   * 轮播图
   */
	bindchange(e) {
	 this.setData({
				swiperIndex: e.detail.current
	 })
	 },
	img:function(e){
		 wx.request({
				url:app.globalData.url+'img',
				data:{},
				method:'post',
				header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
				'Accept':'application/json'},
				success:function(result){
					console.log(result)
// 					that.setData({
// 						imgUrls:result.data,
// 					});
				}
		 })
	 },
})


