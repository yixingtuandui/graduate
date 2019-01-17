var bindblurs, name, id, belong, belongs, bookid, hiddenmodalput, userinfo;
const app = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
      hiddenmodalput: true,
      showView: false,
      input_values: "请输入内容",
      name: '',
    },
        onLoad: function (a) {
          userinfo=app.globalData.user;
          bookid=app.globalData.book.id;
          console.log(app.globalData.userInfo)
          showView: (a.showView == "true" ? true : false);
          var that = this;
          var actid = 1;
          // 查询评论 
          wx.request({
            url: 'http://localhost:8080/comment',
            method: 'POST',
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            data: {
              bid: bookid
            },
            success: function (result) {
              console.log(result)
              for (var index in result.data) {
                result.data[index].time = util.formatTime(new Date(result.data[index].time));
              }
              app.globalData.comments = result.data;
              that.setData({
                pl_list: result.data,
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
  bindblur: function (e) {
    bindblurs = e.detail.value;
  },
          //用户留言 
          btn_send: function () {
            var that = this
            //添加评论 
            // console.log('文章id：act_id :', actid); 
            // console.log('用户缓存id：user_id :', user_id); 
            // console.log('文本输入框: input_value :', bindblur); 
            wx.request({
              url: 'http://localhost:8080/setcomment',
              method: 'POST',
              header: {
                'content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
              },
              data: {
                bid: bookid,
                uid: userinfo.id,
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
            onChangeShowState: function(e) {//更多回复 
              this.setData({
                showView: (!this.data.showView),
                id: e.target.id,
                belongs: e.currentTarget.dataset.belongs
              })
            },
              //点击弹出回复框 
              btn_return: function(e2) {
                this.setData({
                  hiddenmodalput: false
                }),
                  id = e2.currentTarget.dataset.id,
                  belong = e2.currentTarget.dataset.belong
              },
                cancel: function () { //取消回复 
                  this.setData({
                    hiddenmodalput: true,
                  })
                },
                voteTitle: function (e5) {
                  this.setData({
                    name: e5.detail.value
                  })
                },
                confirm: function (e2) {//确认回复 
                  this.setData({
                    hiddenmodalput: true,
                  }),
                    wx.request({//发送请求，将回复内容写入数据库 
                    url: 'http://localhost:8080/setcomment',
                      method: 'POST',
                      header: {
                        'content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                      },
                      data: {
                        bid: bookid,
                        uid: user.id,
                        context: name,
                        belong: belong,
                        time: util.formatTime(new Date()),
                        parentid: id,
                      },
                      success: function (result) {
                        this.setData({
                          pl_list: result.data.reverse(),
                        }),
                          wx.showToast({
                            title: '回复成功',
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
                }
              })