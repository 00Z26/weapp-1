var config = require("./../../config.js")
const app=getApp();
var list
function quickSort(arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0];
  //定义左右数组
  var left = [];
  var right = [];

  //比基准小的放在right，比基准大的放在left
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].hot <= pivot.hot) {
      right.push(arr[i]);
    }
    else {
      left.push(arr[i]);
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityName: '',
    questionNum: 0,
    projectNum: 0,
    memberNum: 0,
    rightArrow: app.globalData.rightArrow_url,
    back_url: app.globalData.back_url,
    communityMember: ['https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png'],
    communityIntroduce: '',
    communityImage: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png',
    allArray: {},
    communityId: '',
    inviteList: '',
    translateY: '100%'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let id = options.community_id 
    var result
    wx.request({
      url: config.service.community_PQ,
      data:{
        community_id: id
      },
      success: function(res){
        if (res.data) {
          for (var item of res.data.result1) {
            item.project_time = new Date(item.project_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.project_time = timeCalc(item.project_time)
            item.project_finish = item.project_finish.slice(0, 10)
          }
          for (var item of res.data.result2) {
            item.question_time = new Date(item.question_time.replace(/T/, " ").replace(/Z/, "").replace(/-/g, "/"))
            item.question_time = timeCalc(item.question_time)
          }
          result = res.data.result1.concat(res.data.result2)
          /**按热度排序**/
          result = quickSort(result)
          console.log(result)
        } else {
          wx.showToast({
            title: '暂无动态',
            icon: 'none'
          })
        }
        console.log(res)
        that.setData({
          communityName: res.data.community_name,
          questionNum: res.data.questionnum,
          projectNum: res.data.projectnum,
          memberNum: res.data.membernum,
          communityMember: res.data.communityMember,
          communityIntroduce: res.data.communityIntroduce,
          allArray: result,
          communityId : options.community_id
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
  checkMembers: function(){
    wx.navigateTo({
      url: './../member/member?community_id=' + this.data.communityId + "&communityName=" + this.data.communityName
    })
  },
  invite: function(){
    var that = this
    var list
    wx.request({
      url: config.service.myfans,
      data:{
        user_type: 0, //app.globalData.userInfo.user_type,
        user_id: '18211949725'  // app.globalData.userInfo.user_id
      },
      success: function(res){
        console.log(res.data)
        that.setData({
          inviteLlist : res.data.result
        })
      }
    })
    wx.request({
      url: config.service.myidols,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        list = res.data.result
        if(list){
          list = that.data.inviteList.concat(list)
          that.setData({
            inviteList: list
          })
        }
      }
    })
    if(!that.data.inviteList){
      wx.showToast({
        title: '暂无可邀请用户',
        icon: 'none'
      })
    }else{
      that.setData({
        translateY: 0,
      })
    }
  },
  cancel: function(){
    this.setData({
      translateY: 0
    })
  }
})