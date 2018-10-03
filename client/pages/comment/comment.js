var config=require("./../../config.js")
function timeCalc(time) {
  var now = new Date()
  var timeDiff = parseInt((now - time) / 1000)     //单位为秒
  if (timeDiff > 604800) {
    if (time.getFullYear() != now.getFullYear()) {
      return time.getFullYear() + time.getMonth() + time.getDate()
    } else {
      return time.getMonth() + 1 + '-' + time.getDate()
    }
  } else if (timeDiff >= 518400) {
    return '六天前'
  } else if (timeDiff >= 432000) {
    return '五天前'
  } else if (timeDiff >= 345600) {
    return '四天前'
  } else if (timeDiff >= 259200) {
    return '三天前'
  } else if (timeDiff >= 172800) {
    return '二天前'
  } else if (timeDiff >= 86400) {
    return '一天前'
  } else if (timeDiff >= 3600) {
    return parseInt(timeDiff / 60 / 60) + '小时前'
  } else return parseInt(timeDiff / 60) + '分钟前'

}

// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: '',
    praise_url: 'http://tmp/wx2541631ee62bb5d9.o6zAJs5rFdB4S1Go-WOFbowYbp8k.5AyHAKDRmITC86f35fd4ad1fe0d8e675204e5aa1ba81.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var answer_id = options.answer_id
    var that = this
    wx.request({
      url: config.service.answer_detail,
      data:{
        answer_id: answer_id
      },
      success: function(res){
        console.log(res.data)
        for(var item of res.data.result){
          item.comment_time = new Date(item.comment_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
          item.comment_time = timeCalc(item.comment_time)
        } 
        that.setData({
          commentList: res.data.result
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

  }
})