const app = getApp()
var config = require('./../../config.js')
function quickSort(arr,standard) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2)
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  var left = [];
  var right = [];

  //比基准小的放在left，比基准大的放在right
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].standard <= pivot.standard) {
      left.push(arr[i]);
    }
    else {
      right.push(arr[i]);
    }
  }
  //递归
  return quickSort(left).concat([pivot], quickSort(right));
}

function timeCalc(time) {
  var now = new Date()
  var timeDiff = parseInt((now - time) / 1000) - 28800    //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + time.getMonth() + time.getDate()
    } else {
      return time.getMonth() + 1 + '-' + time.getDate()
    }
  } else if (timeDiff >= 86400) {
    return time.getMonth() + time.getDate()
  } else if (timeDiff >= 3600) {
    return time.getHours() + time.getMiniutes()
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: config.service.news,
      data:{
        user_type: 0,  //app.globalData.userInfo.user_type,
        user_id: '18211949726' //app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res)
        var praise = res.data.praise.praise_answer.concat(res.data.praise.praise_comment)
        var invite = res.data.invite.invite_question.concat(res.data.invite.invite_project).concat(res.data.invite.invite_community).concat(res.data.invite.apply_community)
        var reply = res.data.reply.reply_question.concat(res.data.reply.reply_project).concat(res.data.reply.comment)
        /**按时间排序**/
        praise = quickSort(praise,'praise_time')
        invite = quickSort(invite,'time')
        reply = quickSort(reply,'answer_time')
        for (var item of praise) {
          item.praise_time = new Date(item.praise_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.praise_time = timeCalc(item.praise_time)
        }
        for (var item of invite) {
          item.time = new Date(item.time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.time = timeCalc(item.time)
        }
        for (var item of praise) {
          item.answer_time = new Date(item.answer_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.answer_time = timeCalc(item.answer_time)
        }
        that.setData({
          praiseList: praise,
          inviteList: invite,
          replyList: reply
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
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})