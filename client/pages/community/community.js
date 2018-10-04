var config = require("./../../config.js")

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
    rightArrow: 'data:image/png;base64,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',
    communityMember: ['https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png', 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png'],
    communityIntroduce: '',
    communityImage: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png',
    allArray: {},
    communityId: ''
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
  }
})