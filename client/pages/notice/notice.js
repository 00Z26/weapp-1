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
  //var timeDiff = parseInt((now - time) / 1000) - 28800    //单位为秒
  if (time.getFullYear() == now.getFullYear()){
    if(time.getMonth() == now.getMonth()){
      if (now.getDate() == time.getDate()) {
        return (Array(2).join('0') + time.getHours()).slice(-2) + ":" + (Array(2).join('0') + time.getMinutes()).slice(-2)
      }else{
        return time.getMonth() + "-" + time.getDate()
      }
    }else{
      return time.getMonth() + "-" + time.getDate()
    }
  }else{
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.service.news,
      data:{
        user_type: app.globalData.userInfo.user_type, 
        user_id: app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res)
        var praise = res.data.praise.praise_answer.concat(res.data.praise.praise_comment)
        for(var i = 0;i < res.data.invite.apply_community.length; i++){
          res.data.invite.apply_community[i].apply_id = res.data.invite.apply_community[i].community_id
        }
        var invite = res.data.invite.invite_question.concat(res.data.invite.invite_project).concat(res.data.invite.invite_community).concat(res.data.invite.apply_community)
        var reply = res.data.comment.reply_question.concat(res.data.comment.reply_project).concat(res.data.comment.comment)
        /**按时间排序**/
        if(praise){
          praise = quickSort(praise, 'praise_time')
        }
        if (invite) {
          invite = quickSort(invite, 'time')
        }
        if (reply) {
          reply = quickSort(reply, 'time')
        }
        for (var item of praise) {
          item.praise_time = new Date(item.praise_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.praise_time = timeCalc(item.praise_time)
        }
        for (var item of invite) {
          item.time = new Date(item.time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.time = timeCalc(item.time)
        }
        for (var item of reply) {
          item.time = new Date(item.time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.time = timeCalc(item.time)
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
  jumpToQuestion: function(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './../question_detail/question_detail?id=' + id,
    })
  },
  jumpToProject: function(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './../project_detail/project_detail?id=' + id,
    })
  },
  jumpToComment: function(e){
    let id = e.target.dataset.id
    wx.navigateTo({
      url: './../comment/comment?answer_id=' + id,
    })
  },
  jumpToCommunity: function(e){
    let id = e.target.dataset.id
    wx.navigateTo({
      url: './../community/community?community_id=' + id,
    })
  },
  agreeInvite: function(e){
    let communityId = e.target.dataset.id
    let userId = e.target.dataset.userId
    wx.request({
      url: config.service.join_community,
      data:{
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        community_id: communityId
      },
      success: function(){
        wx.showToast({
          title: '加圈成功',
          icon: 'none'
        })
      }
    })
  },
  agreeJoin: function (e) {
    let communityId = e.target.dataset.id
    let userId = e.target.dataset.userId
    let userType = e.target.dataset.userType
    wx.request({
      url: config.service.join_community,
      data: {
        user_type: userType,
        user_id: userId,
        community_id: communityId
      },
      success: function () {
        wx.showToast({
          title: '已同意',
          icon: 'none'
        })
      }
    })
  }
})