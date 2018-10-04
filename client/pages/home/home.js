var config = require("./../../config.js")
var userType,userId
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
    comNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    userType = options.userType
    userId = options.userId
    wx.request({
      url: config.service.home,
      data: {
        user_type: userType,
        user_id: userId
      },
      success: function(res){
        console.log(res.data)
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
          comNum: res.data.result.communitynum
        })
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
      url: './../subsettings/published/published?user_id=' + this.data.userId,
    })
  },
  jumpToFollowing: function () {
    wx.navigateTo({
      url: './../subsettings/following/following?user_id=' + this.data.userId,
    })
  },
  jumpToFollower: function () {
    wx.navigateTo({
      url: './../subsettings/followers/followers?user_id=' + this.data.userId,
    })
  },
  jumpToCommunity: function () {
    wx.navigateTo({
      url: './../subsettings/community/community?user_id=' + this.data.userId,
    })
  }
  
})