var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
// pages/index/login.js
Page({
  data: {
    imgUrl:'',
  },
  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  jobInput: function (e) {
    this.setData({
      job: e.detail.value
    })
  },
  corporationInput: function (e) {
    this.setData({
      corporation: e.detail.value
    })
  },
  //获取用户输入的密码
  loginBtnClick: function (e) {
    var that = this
    /*
    wx.request({
      url: config.service.pubed,
      data:{ 
        user_type:0,
        user_id:'18211949726'
      },
      success:function(res){
        console.log(res.data)
      }
    })
    },
    
    /*
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        util.showBusy('正在上传')
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: 'file',

          success: function (res) {
            util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            that.setData({
              imgUrl: res.data.imgUrl
            })
          },

          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })

      },
      fail: function (e) {
        console.error(e)
      }
    })
  },
  */
    //index.js
    //获取应用实例
    var that=this
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var src=res.userInfo.avatarUrl;
        console.log(src);
        that.setData({
          imgUrl:src
    })
  }
  })
       
    wx.login({
      success: function (res) {
        console.log(res.code)
        console.log('输出res.code')
        //发送请求
        wx.request({
          method:'get',
          /*
          url: config.service.regs_company, //接口地址         
          data: {
            code: res.code,
            company_id: '15137972256',
            company_name: 'KFCLL',
            company_type: '餐饮',
            company_address: '华科喻园店',
            company_introduce: '你好呀',
            image: that.data.imgUrl
          },
          */
          url: config.service.regs_individual, //接口地址         
          data: { 
            code: res.code,
            individual_id: '15137972256',
            individual_name: 'KFC', 
            individual_sex:'男',
            individual_job: '餐饮', 
            individual_corporation: '华科喻园店', 
            individual_introduce: '你好呀',
            image: that.data.imgUrl
           },
          header: {
            'content-type': 'application/json' //默认值
          },
          
          success: function (res) {
            console.log('结果输出')
            console.log(res.data)
          }
        })
      }
    })
  },
  // 用户点击右上角分享
  onShareAppMessage: function () {

  }
})