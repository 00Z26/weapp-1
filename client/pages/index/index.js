//index.js
//获取应用实例
const app = getApp()
var config = require('./../../config.js')
//var CONF = require('./../../../server/config.js')
Page({
  data: {
    background_url: app.globalData.background_url,
    //'./../images/background.jpg',
    logo_url: './..images/logo.jpg',
    avatar_img: app.globalData.me1_url,
    enterprise_url: app.globalData.company_url,
    individual_back: app.globalData.individual_back_url,
    enterprise_back: app.globalData.company_back_url,
    job_icon: app.globalData.job_url,
    corporation_icon: app.globalData.corporation_url,
    phone_icon: app.globalData.phone_url,
    user_icon: app.globalData.me2_url,
    type_icon: app.globalData.company_type_url,
    location_icon: app.globalData.address_url,
    userInfo: {},
    jobList: app.globalData.jobList,
    companyList: app.globalData.typeList,
    index1: 0,
    index2: 0,
    state1: false,
    state2: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    individualName: '',
    individualJob: '0',
    individualCompany: '',
    individualPhone: '',
    enterpriseName: '',
    enterpriseType: '0',
    enterprisePhone: '',
    enterpriseAddress: '',
    translateRight: '',
    translateLeft: '',
    individualShow: '',
    enterpriseShow: ''
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function(){
    
  },
  individualPickerChange: function (e) {
    this.setData({
      index1: e.detail.value
    })
    this.data.individualJob = e.detail.value
  },
  enterprisePickerChange: function (e) {
    this.setData({
      index2: e.detail.value
    })
    this.data.enterpriseType = e.detail.value
  },
  getUserInfo: function(e) {
    var gender
    if (e.detail.rawData.gender == 0){
      gender = '未知'
    } else if (e.detail.rawData.gender == 1){
      gender = '男'
    } else{
      gender = '女'
    } 
    console.log(e)
    app.globalData.userInfo.user_sex = gender
  },
  translateRight: function(){
    this.setData({
      translateLeft: '',
      translateRight: 'transform: translateX(100%);transition:all 0.2s;',
      individualShow: 'transform: translateX(100%);transition:all 0.2s;'
    })
    wx.login({
      success: function (res) {
        console.log(res.code)
        wx.request({
          url: config.service.getopenid,
          method: 'get',
          data: { 
            code: res.code,
            user_type:0
            },
          success: function (res) {
            console.log(res.data)
            if(res.data.result.user_id){
              app.globalData.userInfo.user_type = res.data.result.user_type;
              app.globalData.userInfo.user_id = res.data.result.user_id;
              app.globalData.userInfo.user_name = res.data.result.user_name;
              app.globalData.userInfo.user_image = res.data.result.user_image;
              wx.setStorage({
                key: 'user',
                data: {
                  user_type: res.data.result.user_type,
                  user_id: res.data.result.user_id,
                  user_name: res.data.result.user_name,
                  user_image: res.data.result.user_image
                },               
              })
              wx.redirectTo({
                url: './../main/main'
              })
            }
          }
        })
      }
    })
  },
    translateLeft: function() {
      this.setData({
        translateRight: '',
        translateLeft: 'transform: translateX(-100%);transition:all 0.2s;',
        enterpriseShow: 'transform: translateX(-100%);transition:all 0.2s;',
      })
      wx.login({
        success: function (res) {
          console.log(res.code)
          wx.request({
            url: config.service.getopenid,
            method: 'get',
            data: {
              code: res.code,
              user_type: 1
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.result.user_id) {
                app.globalData.userInfo.user_type = res.data.result.user_type;
                app.globalData.userInfo.user_id = res.data.result.user_id;
                app.globalData.userInfo.user_name = res.data.result.user_name;
                app.globalData.userInfo.user_image = res.data.result.user_image;
                wx.setStorage({
                  key: 'user',
                  data: {
                    user_type: res.data.result.user_type,
                    user_id: res.data.result.user_id,
                    user_name: res.data.result.user_name,
                    user_image: res.data.result.user_image
                  },
                })
                wx.redirectTo({
                  url: './../main/main'
                })
              }
            }
          })
        }
      })
  },
  individualBack: function(){
    this.setData({
      translateRight: 'transform: translateX(0);transition:all 0.2s;',
      individualShow: 'transform: translateX(-100%);transition:all 0.2s;'
  })
  },
  enterpriseBack: function(){
    this.setData({
      translateLeft: 'transform: translateX(0);transition:all 0.2s;',
      enterpriseShow: 'transform: translateX(100%);transition:all 0.2s;'
    })
  },
  nameInput: function(e){
    this.data.individualName = e.detail.value
    app.globalData.userInfo.user_name = e.detail.value
  },
  individualPhoneInput: function(e){
    this.data.individualPhone = e.detail.value
    app.globalData.userInfo.user_id = e.detail.value
  },
  corporationInput: function(e){
    this.data.individualCompany = e.detail.value
  },
  companyNameInput: function(e){
    this.data.enterpriseName = e.detail.value
    app.globalData.userInfo.user_name = e.detail.value
  },
  companyTypePick: function(e){
    this.data.enterpriseType = e.detail.value
  },
  companyPhoneInput: function(e){
    this.data.enterprisePhone = e.detail.value
    app.globalData.userInfo.user_id = e.detail.value
  },
  companyAddressInput: function(e){
    this.data.enterpriseAddress = e.detail.value
  },
  submitIndividualInfo: function(e){
    var that = this;
    var image='';
    var that = this
    var individualInfo = this.data.individualInfo
    if (!this.data.individualName) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
    } else if (this.data.individualJob == 0) {
      wx.showToast({
        title: '请选择职业',
        icon: 'none'
      })
    } else if (!this.data.individualCompany) {
      wx.showToast({
        title: '请输入单位',
        icon: 'none'
      })
    } else if (!this.data.individualPhone) {
      wx.showToast({
        title: '请输入电话',
        icon: 'none'
      })
    } else {
      this.setData({
        state1: true
      })
    }
    if(this.data.state1)
    {
      console.log(e.detail.value);
      wx.getUserInfo({
        success: function(res){
          console.log(res.data)
          image=res.userInfo.avatar_img;
          //app.globalData.userInfo.user_sex = res.userInfo.gender
        }
      }),
      wx.login({
        success: function (res) {
          console.log(res.code);
          wx.request({
            url: config.service.regs_individual,
            method: 'get',
            data: {
              code: res.code,
              individual_name: e.detail.value.individualName,
              individual_job: e.detail.value.individualJob,
              individual_corporation: e.detail.value.individualCompany,
              individual_id: e.detail.value.individualPhone,
              image:app.globalData.userInfo.image,
              individual_sex: app.globalData.userInfo.user_sex
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              if(res.data.code == 1){
                wx.showToast({
                  title: '注册成功',
                  icon: 'none'
                })
                wx.redirectTo({
                  url: './../main/main',
                })
              }else{
                wx.showToast({
                  title: res.data.result,
                  icon: 'none'
                })
              }
            },
            fail: function(){
              wx.showToast({
                title: '网络错误',
                icon: 'none'
              })
            }
          })
        }
      })
    }
  },
  submitEnterpriseInfo: function(e){
    var that = this
    var image = ''
    if (!this.data.enterpriseName) {
      wx.showToast({
        title: '请输入公司名称',
        icon: 'none'
      })
    } else if (this.data.enterpriseType == 0) {
      this.data.state = false;
      wx.showToast({
        title: '请选择公司类别',
        icon: 'none'
      })
    } else if(!this.data.enterprisePhone){
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
    }else if(!this.data.enterpriseAddress){
      wx.showToast({
        title: '请输入通信地址',
        icon: 'none'
      })
    }else{
      this.setData({
        state2: true
      })
    }
    if(this.data.state2)
    {
      console.log(e.detail.value)
      wx.getUserInfo({
        success: res => {
          image = res.userInfo.avatar_img;
        }
      }),
        wx.login({
          success: function (res) {
            console.log(res.code);
            wx.request({
              url: config.service.regs_company,
              method: 'get',
              data: {
                code: res.code,
                company_name: e.detail.value.companyName,
                company_type: e.detail.value.companyType,
                company_id: e.detail.value.companyPhone,
                company_address: e.detail.value.companyAddress,
                image: app.globalData.userInfo.image
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                console.log(res)
                if(res.data.result){
                  wx.redirectTo({
                    url: './../main/main',
                  })
                }
                if (res.data.code == 1) {
                  wx.showToast({
                    title: '注册成功',
                    icon: 'none'
                  })
                  wx.redirectTo({
                    url: './../main/main',
                  })
                } else {

                  wx.showToast({
                    title: res.data.result,
                    icon: 'none'
                  })
                }
              },
              fail: function () {
                wx.showToast({
                  title: '网络错误',
                  icon: 'none'
                })
              }
            })
          }
        })
    }
  }
})