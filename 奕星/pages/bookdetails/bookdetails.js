// bookdetails.wxml
var boksxq;
Page({
  data:{
    boksxq:[],
    type:[],
		addbook:[]
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
			data: { uname: "江", bookid:boks.id },
			header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
			method: 'post',
			success: function (res) {
				
			}
		})
		this.setData({
      boksxq:boks,
			addbook:true,
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
		console.log(e.currentTarget.dataset.data.id)
		var that=this
		wx.request({
			url:'http://localhost:8080/addshelf',
			data:{
			name: "江",
			bookid:e.currentTarget.dataset.data.id},
			method:'post',
			header:{'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
			'Accept':'application/json'},
			success:function(result){
				console.log(result.data.addbookshelf)
				that.setData({
					addbook:result.data.addbookshelf
				})
			},
		})
	},
})