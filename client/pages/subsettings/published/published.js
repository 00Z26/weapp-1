var config = require('../../../config');
const app = getApp()
function timeCalc(time) {
  var now = new Date()
  //var timeDiff = parseInt((now - time) / 1000) - 28800    //单位为秒
  if (time.getFullYear() == now.getFullYear()) {
    if (time.getMonth() == now.getMonth()) {
      if (now.getDate() == time.getDate()) {
        return (Array(2).join('0') + time.getHours()).slice(-2) + ":" + (Array(2).join('0') + time.getMinutes()).slice(-2)
      } else {
        return time.getMonth() + "-" + time.getDate()
      }
    } else {
      return time.getMonth() + "-" + time.getDate()
    }
  } else {
    return time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate()
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_url: app.globalData.back_url,
    isActive1: 'rgba(255, 149, 0, 1)',
    isActive2: '',
    isActive3: '',
    border1: '2rpx solid rgba(255, 149, 0, 1)',
    border2: '',
    border3: '',
    transform1: '0',
    transform2: '100%',
    transform3: '200%',
    z1: '2',
    z2: '1',
    z3: '1',
    questionArray: '',
    projectArray: '',
    answerList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.service.pubed,
      method: 'get',
      data: {
        user_type: 0,
        user_id: 18211949726
      },
      success: function (res) {
        console.log(res)
        if(res.data.answer){
          for(var item of res.data.answer){
            item.answer_time = new Date(item.answer_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.answer_time = timeCalc(item.answer_time)
          }
        }
        that.setData({
          projectArray: res.data.project,
          questionArray: res.data.question,
          answerList: res.data.answer
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
  chooseTab1: function(){
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
  chooseTab3: function () {
    this.setData({
      isActive3: 'rgba(255, 149, 0, 1)',
      isActive2: 'rgba(54, 142, 153, 1)',
      isActive1: 'rgba(54, 142, 153, 1)',
      border3: '2rpx solid rgba(255, 149, 0, 1)',
      border2: '',
      border1: '',
      transform1: '-200%',
      transform2: '-100%',
      transform3: '0',
      z1: '1',
      z2: '1',
      z3: '2'
    })
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  jumpToQuestion: function(e){
    console.log(e)
    wx.navigateTo({
      url: './../../question_detail/question_detail?id=' + e.currentTarget.id,
    })
  },
  jumpToProject: function (e) {
    wx.navigateTo({
      url: './../../project_detail/project_detail?id=' + e.currentTarget.id,
    })
  }, jumpToComment: function (e) {
    wx.navigateTo({
      url: './../../comment/comment?id=' + e.currentTarget.id,
    })
  }
})