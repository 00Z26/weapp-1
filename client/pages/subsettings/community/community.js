const app = getApp()
var config = require("./../../../config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_url: app.globalData.back_url,
    isActive1: 'rgba(255, 149, 0, 1)',
    isActive2: '',
    border1: '2rpx solid rgba(255, 149, 0, 1)',
    border2: '',
    transform1: '0',
    transform2: '100%',
    z1: '2',
    z2: '1',
    joinedComList: [],
    establishedComList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.service.mycommunity_join,
      data:{
        user_type: 0,//app.globalData.userInfo.user_type,
        user_id: "18211949725", //app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          joinedComList: res.data.result
        })
        wx.request({
          url: config.service.mycommunity_set,
          data:{
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              establishedComList: res.data.result
            })
          },
          fail: function () {
            wx.showToast({
              title: '加载失败',
              icon: 'none'
            })
            wx.navigateBack({
              delta: 1
            })
          }
        })
      },
      fail: function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
        wx.navigateBack({
          delta: 1
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
  chooseTab1: function () {
    this.setData({
      isActive1: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border1: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border3: '',
      transform1: '0',
      transform2: '100%',
      transform3: '200%',
      z1: '2',
      z2: '1',
      z3: '1'
    })
  },
  chooseTab2: function () {
    this.setData({
      isActive2: 'rgba(255, 149, 0, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      isActive3: 'rgba(54, 142, 153, 1)',
      border2: '2rpx solid rgba(255, 149, 0, 1)',
      border1: '',
      border3: '',
      transform1: '-100%',
      transform2: '0',
      transform3: '100%',
      z1: '1',
      z2: '2',
      z3: '1'
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  jumpToCom: function(e){
    console.log(e)
    wx.navigateTo({
      url: './../../community/community?community_id=' + e.currentTarget.id,
    })
  },
  createCommunity: function(){
    wx.navigateTo({
      url: './../../createCommunity/createCommunity',
    })
  }
})