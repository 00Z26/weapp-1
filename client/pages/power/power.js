// pages/power/power.js
var config = require('../../config')
const app = getApp()
Page({
  data: {
    back_url: app.globalData.back_url,
    user:'',
    items: [
      { name: '公开', introduce: '所有圈子可见', checked: 'true', show: 0, community_class:'community_class1',selectlabel:1 },
      { name: '部分圈子可见', introduce: '选中圈子可见', show: 0, community_class: 'community_class2', selectlabel: 0},
      { name: '部分圈子不可见', introduce: '选中圈子不可见', show: 0, community_class: 'community_class3', selectlabel: 0},
    ],
    community:[],
  },
  radioChange: function (e) {
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        break;
      }
    }
    if(value.name===this.data.items[0].name){
      this.setData({ 
        'items[0].show': 0,
        'items[1].show': 0,
        'items[2].show': 0,
        'items[0].selectlabel': 1,
        'items[1].selectlabel': 0,
        'items[2].selectlabel': 0,
         });
    }
    else if (value.name === this.data.items[1].name){
      this.setData({
        'items[0].show': 0,
         'items[1].show':1,
        'items[2].show': 0,
        'items[0].selectlabel': 0,
        'items[1].selectlabel': 1,
        'items[2].selectlabel': 0,
      });

    }
    else if (value.name === this.data.items[2].name) {
      this.setData({
        'items[0].show': 0,
        'items[1].show': 0,
        'items[2].show': 1,
        'items[0].selectlabel': 0,
        'items[1].selectlabel': 0,
        'items[2].selectlabel': 1,
       });
    }
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    for (var i of e.detail.value){
      this.data.community[i].checklabel=1;
    }

  },
  onLoad:function(e){
    let user = JSON.parse(e.userJson);
    this.setData({ user: user });
    var that=this;
    wx.request({
      method: 'get',
      url: config.service.user_community,
      data: {
        user_id: app.globalData.userInfo.user_id,
        user_type: app.globalData.userInfo.user_type,
        need:'name'
      },
      success: function (res) {
        var x = res.data.result;
        for (var item of x) {
          item['checklabel'] = 0
        };
        that.setData({ community: x });
        console.log(x);
      },
      fail: function (res) {
        console.log('上传失败');
      }
    }) 
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
  },
  complete: function (e) {
    var that=this;
    var result=[];
    var object_power=1;
    var radio=0;
    var check=0;
    for (var each of that.data.items) {
      if (each.selectlabel === 1) {
        break;
      }
      else{
        radio=radio+1;
      }
    }
    switch(radio){
      case 0:
        break;
      case 1:
        object_power=0;
        for (var value of that.data.community) {
          result[check] = {
            community_id: value.community_id,
            power: value.checklabel
          }
          check = check + 1;
        }
        break;
      case 2:
        object_power = 0;
        for (var value of that.data.community) {
          result[check] = {
            community_id: value.community_id,
            power: 1-value.checklabel
          }
          check = check + 1;
        }
        break;
    };
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[pages.length - 2];  //获取上一个页面的js
    prevPage.setData({
      power: {
        object_power: object_power,
        detail_power: result
      }
    });
    wx.navigateBack({
      delta: 1  
    })
  },
})
  