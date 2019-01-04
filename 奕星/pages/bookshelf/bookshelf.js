//logs.js
var app = getApp()
var books;
Page({
  data: {
    currentTab: 0,
		books:[],
    recentlys:[],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
		var that = this;
		wx.request({
			url:'http://localhost:8080/bookshelf',
			data:{uid:1},
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',},
			method:'POST',
			success:function(result) {
				that.setData({
					books:result.data,
				});
			}
		})
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    if (e.detail.current == 1) {
      wx.request({
        url: 'http://localhost:8080/recently',
        data: { uid: 1 },
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', },
        method: 'POST',
        success: function (result) {
          that.setData({
            recentlys: result.data,
          })
        }
      })
    }
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (e.target.dataset.current==1){
      wx.request({
				url: 'http://localhost:8080/recently',
        data: {uid:1},
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8', },
        method: 'POST',
				success  :function(result){
					that.setData({
						recentlys:result.data,
					})
				}
      })
    }
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})


