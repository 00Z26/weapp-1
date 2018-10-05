const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: app.globalData.userInfo.user_image,
    publishedUrl: app.globalData.pubed_url,
    followerUrl: app.globalData.befocused_url,
    followingUrl: app.globalData.focus_url,
    communityUrl: app.globalData.community_url,
    messageUrl: app.globalData.information_url,
    userName: app.globalData.userInfo.user_name,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  individualInfo: function(){
    wx.navigateTo({
      url: './../subsettings/individual_info/individual_info',
    })
  },
  jumpToPublished: function(){
    wx.navigateTo({
      url: './../subsettings/published/published',
    })
  },
  jumpToFollowers: function(){
    wx.navigateTo({
      url: './../subsettings/followers/followers',
    })
  },
  jumpToFollowing: function(){
    wx.navigateTo({
      url: './../subsettings/following/following',
    })
  },
  jumpToCommunity: function(){
    wx.navigateTo({
      url: './../subsettings/community/community',
    })
  },
  jumpToMessage:function () {
    wx.navigateTo({
      url: './../notice/notice',
    })
  }
})