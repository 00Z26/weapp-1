var config = require("./../../config.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImage: '',
    userName :'',
    userSex: '',
    userJob: '',
    userCompany: '',
    userState: '',
    userIntroduce: '',
    pubedNum: 0,
    fansNum: 0,
    focusNum: 0,
    comNum: 0,
    following: "none",
    unfollowing: "inline-block"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userType = options.userType
    var userId = options.userId
    wx.request({
      url: config.service.home,
      data: {
        user_type: userType,
        user_id: userId
      },
      success: function(res){
        console.log(res.data)
        wx.request({
          url: config.service.focus_state,
          data:{
            focus_type: 'other',
            object_type: userType,
            object_id: userId,
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          },success: function(e){
            if (e.data.result) {
              console.log(e)
              console.log(res)
              that.setData({
                userImage: res.data.result.image,
                userName: res.data.result.individual_name,
                userSex: res.data.result.individual_sex,
                userJob: res.data.result.individual_job,
                userCompany: res.data.result.individual_corporation,
                userState: res.data.result.individual_state,
                userIntroduce: res.data.result.individual_introduce,
                pubedNum: res.data.result.pubednum,
                fansNum: res.data.result.fans_num,
                focusNum: res.data.result.focusnum,
                comNum: res.data.result.communitynum,
                userId: userId,
                userType: userType,
                following: "none",
                unfollowing: "inline-block"
              })
            } else {
              that.setData({
                userImage: res.data.result.image,
                userName: res.data.result.individual_name,
                userSex: res.data.result.individual_sex,
                userJob: res.data.result.individual_job,
                userCompany: res.data.result.individual_corporation,
                userState: res.data.result.individual_state,
                userIntroduce: res.data.result.individual_introduce,
                pubedNum: res.data.result.pubednum,
                fansNum: res.data.result.fans_num,
                focusNum: res.data.result.focusnum,
                comNum: res.data.result.communitynum,
                userId: userId,
                userType: userType,
                following: "inline-block",
                unfollowing: "none"
              })
            }
          }
        })
        

      },fail: function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
        wx.navigateBack({
          delta: 1
        })
      }
    })
    wx.request({
      url: config.service.focus_state,
      data:{
        focus_type: 'user',
        object_type: userType,
        object_id: userId,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        if(res.data.result){
          that.setData({
            unfollowing: 'none',
            following: 'inline-block'
          })
        }
      }
    })
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
  jumpToPub: function(){
    wx.navigateTo({
      url: './../subsettings/published/published?id=' + this.data.userId + "&type=" + this.data.userType,
    })
  },
  jumpToFollowing: function () {
    wx.navigateTo({
      url: './../subsettings/following/following?id=' + this.data.userId + "&type=" + this.data.userType,
    })
  },
  jumpToFollower: function () {
    wx.navigateTo({
      url: './../subsettings/followers/followers?id=' + this.data.userId + "&type=" + this.data.userType,
    })
  },
  jumpToCommunity: function () {
    wx.navigateTo({
      url: './../subsettings/community/community?id=' + this.data.userId + "&type=" + this.data.userType,
    })
  },
  follow: function(){
    var that = this
    wx.request({
      url: config.service.focus,
      data:{
        focus_type: 'user',
        object_type: that.data.userType,
        object_id: that.data.userId,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        if(res.data.result){
          that.setData({
            following: "inline-block",
            unfollowing: "none"
          })
          wx.showToast({
            title: '关注成功',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '关注失败',
            icon: 'none'
          })
        }
      }
    })
  },
  unfollow: function(){
    var that = this
    wx.request({
      url: config.service.defocus,
      data:{
        focus_type: 'user',
        object_type: that.data.userType,
        object_id: that.data.userId,
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res)
        if(res.data.result){
          wx.showToast({
            title: '取消关注成功',
            icon: 'none'
          })
          that.setData({
            following: "none",
            unfollowing: "inline-block"
          })
        }else{
          wx.showToast({
            title: '取消关注失败',
            icon: 'none'
          })
        }
      },fail: function(){
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      }
    })
  }
  
})