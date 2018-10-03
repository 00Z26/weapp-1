// pages/createCommunity/createCommunity.js
var config = require('./../../config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityType: ["文学类","历史类","数学类"],
    index: 0
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
  typeChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  //建圈,传过来数据{user_type: 0/1,user_id: 18211949726,community_name:'文艺圈',community_type:'文学',community_introduce:'无'}
  createCommunity: function(e){
    console.log(e.detail.value)
    var that = this
    wx.request({
      url: config.service.regs_community,
      data:{
        user_type: 0,
        user_id: "18211949725",
        community_name: e.detail.value.communityName,
        community_type: that.data.communityType[that.data.index],
        community_introduce: e.detail.value.communityIntroduce
      },
      success: function(res){
        console.log(res.data)
      }
    })

  }
})