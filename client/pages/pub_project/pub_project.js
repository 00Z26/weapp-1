// pages/pub_project/pub_project.js
var config = require('../../config')
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: {
      user_type: app.globalData.userInfo.user_type,
      user_id: app.globalData.userInfo.user_id,
    },
    select_type: ['网站开发', '微信小程序开发', 'app开发', '数据采集与分析', '管理系统', 'UI设计', '嵌入式与智能硬件', '其他'],
    index: 0,
    project_finish: (new Date()).getFullYear() + '-' + parseInt((new Date()).getMonth()+1)+ '-' + (new Date()).getDate(),
    project_title:'',
    project_type:'',
    project_budget:'',
    project_require:'',
    power:{
      object_power: 1,
      detail_power: []
    }
  },
  //获取项目类型
  bindtypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var project_type = this.data.select_type[e.detail.value];
    this.setData({
      index: e.detail.value,
      project_type: project_type,
    })
  },
  //获取项目结束时间
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      project_finish: e.detail.value
    })
  },
  //获取项目名称
  title_put:function(e){
    this.setData({
      project_title: e.detail.value
    })
  },
  //获取项目预算
  budget_put:function(e){
    this.setData({
      project_budget:e.detail.value
    })
  },
  //获取项目需求
  require_put:function(e){
    this.setData({
      project_require: e.detail.value
    })
  },
 //设置权限
  set_power: function (e) {
    var that=this;
    let userJson = JSON.stringify(this.data.user)
    wx.navigateTo({
      url: '../power/power?userJson='+userJson,
    })
  },
  //发布项目
  pub:function(e){
    var that=this;
    wx.request({
      method: 'get',
      url: config.service.pub_project,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id,
        power:that.data.power,
        project_type: that.data.project_type,
        project_title: that.data.project_title,
        project_finish: that.data.project_finish,
        project_budget: that.data.project_budget,
        project_require: that.data.project_require,
      },
      success: function (res) {
        console.log(res.data);
        wx.showToast({
          title: '项目发布成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../main/main',
          })
        }, 2000) 
      },
      fail: function (res) {
        console.log('上传失败');
        wx.showToast({
          title: '项目发布失败',
          icon: 'warn',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '../main/main',
          })
        }, 2000) 
      }
    }) 
  }

})