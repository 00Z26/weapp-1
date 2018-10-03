var config = require('./../../../config.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:app.globalData.default_url,
    back_url: app.globalData.back_url,
    userName: '',
    sex: '男',
    corporation: '',
    jobRange: [],
    job: '0',
    introduce: '',
    flag: false
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
    var that = this
    wx.request({
      url: config.service.my_message,
      method: 'get',
      data: {
        user_type: 0,
        user_id: 18211949726
      },
      success: function(res){
        var info = res.data.result[0]
        console.log(res.data)
        that.setData({
          sex: info.individual_sex,
          job: info.individual_job,
          corporation: info.individual_corporation,
          introduce: info.individual_introduce,
          jobRange: app.globalData.jobList,
          userName: info.individual_name
        })
      }
    })
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
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  jobChange: function(e){
    
    this.setData({
      job: e.detail.value
    })
  },
  // corporationInput: function(e){
  //   this.setData({
  //     corporation: e.detail.value
  //   })
  // },
  checkInfo: function(){
    var that = this
    if(!that.data.corporation){
      wx.showToast({
        title: '请输入所属单位',
        icon: 'none'
      })
    }else{
      that.setData({
        flag: true
      })
    }
  },
  submitInfo: function(e){
    if(!this.data.flag){
      wx.showToast({
        title: '请输入全部信息',
        icon: 'none'
      })
      return
    } 
    wx.request({
      url: config.service.change_message,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        user_type: 0,
        user_id: 18211949726,
        individual_job: e.detail.value.job,
        individual_corporation: e.detail.value.corporation,
        individual_introduce: e.detail.value.introduce
      },
      success: function(){
        console.log(e.detail.value)
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      }
    })
  }
})