// pages/createCommunity/createCommunity.js
var config = require('./../../config.js')
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    communityType: ["文学类","历史类","数学类"],
    communityId: '',
    communityImage: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538531671441-2Jzzfebl8.png',
    index: 0,
    inviteList: {},
    selectedIndex:[],
    selectedList: {},
    translateY: '100%'
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
  typeChange: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  invite: function () {
    var that = this
    var list
    var flag = false
    wx.request({
      url: config.service.myfans,
      data: {
        user_type: app.globalData.userInfo.user_type,
        user_id: app.globalData.userInfo.user_id
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          inviteList: res.data.result
        })
        wx.request({
          url: config.service.myidol,
          data: {
            user_type: app.globalData.userInfo.user_type,
            user_id: app.globalData.userInfo.user_id
          },
          success: function (res) {
            console.log(res.data)
            list = that.data.inviteList.concat(res.data.result)
            that.setData({
              inviteList: list
            })

          },
          complete: function () {
            for (var item in that.data.inviteList) {
              flag = true
            }
            if (!flag) {
              wx.showToast({
                title: '暂无可邀请用户',
                icon: 'none'
              })
            } else {
              that.setData({
                translateY: '0',
              })
            }
          }
        })
      }
    })

  },
  cancel: function () {
    this.setData({
      translateY: '100%'
    })
  },
  checkboxChange: function (e) {
    console.log(Object.keys(e.detail.value))
    if (e.detail.value.length>0) {
      this.setData({
        selected: true,
        selectedIndex: Object.keys(e.detail.value)
      })
    } else {
      console.log('a')
      this.setData({
        selected: false
      })
    }
  },
  done: function () {
    var that = this
    var i = 0
    for (var item of that.data.selectedIndex) {
      console.log(item)
      if (that.data.inviteList[item].hasOwnProperty('fans_id')) {
        console.log("fan")
        let obj = {
          guest_type: that.data.inviteList[item].fans_type,
          guest_id: that.data.inviteList[item].fans_id
        }
        that.data.selectedList[i] = obj
      } else {
        console.log("idol")
        let obj = {
          guest_type: that.data.inviteList[item].idol_type,
          guest_id: that.data.inviteList[item].idol_id
        }
        console.log(obj)
        that.data.selectedList[i] = obj
      }
      i++

    }
    this.setData({
      translateY: '100%'
    })

    
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  submit: function(e){
    var that= this
    console.log(e)
    if(!e.detail.value.communityName){
      wx.showToast({
        title: '请输入圈子名称',
        icon: 'none'
      })
    }else if(!e.detail.value.communityIntroduce){
      wx.showToast({
        title: '请输入圈子介绍',
        icon: 'none'
      })
    } else if (that.data.communityImage == 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538531671441-2Jzzfebl8.png'){
      wx.showToast({
        title: '请上传圈子头像',
        icon: 'none'
      })
    }
    else{
      wx.request({
        url: config.service.regs_community,
        data:{
          user_type: app.globalData.userInfo.user_type,
          user_id: app.globalData.userInfo.user_id,
          community_name: e.detail.value.communityName,
          community_type: that.data.communityType[that.data.index],
          community_introduce: e.detail.value.communityIntroduce,
          community_image: that.data.communityImage
        },
        success: function(res){
          console.log(res)
          var id = res.data.communityId[0]
          console.log(id)
          if(res.data.result == "建圈成功"){
            wx.request({
              url: config.service.invite,
              data: {
                host_type: app.globalData.userInfo.user_type,
                host_id: app.globalData.userInfo.user_id,
                invite_type: 'C',
                invite_id: id,
                guest: that.data.selectedList
              },
              success: function (res) {
                that.setData({
                  communityId: id,
                  translateY: '100%'
                })
                wx.navigateBack({
                  delta: 1
                })
                wx.showToast({
                  title: '创建成功',
                  icon: 'none'
                })
              },
              fail: function () {
                wx.showToast({
                  title: '圈子创建成功，邀请失败，请重试',
                  icon: 'none'
                })
              }
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
            title: '创建失败',
            icon: 'none'
          })
        }
      })
    }
  },
  uploadPic: function(){
    var that = this
    var token
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function(res){
            var savedFilePath = res.savedFilePath
            // wx.request({
            //   url: config.service.uploadUrl,
            //   data: savedFilePath,
            //   success: function(res){
            //     console.log(res.data)
            //     that.setData({
            //       communityImage: res.data
            //     })
            //   }
            // })
            wx.request({
              url: 'https://sl5hr478.qcloud.la/token',
              method: 'POST',
              data: {},
              header:{
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {

                token = res.data; //默认返回一个token，赋值给已经有的token属性。这里只是示例，具体根据需求可自行设定。
                wx.uploadFile({
                  url: config.service.uploadUrl,
                  filePath: savedFilePath,
                  name: 'file',  //圈子头像对应的键为'community*Image' (*为community_id)
                  formData: {
                    'token': token,
                    'key': 'community' + that.data.communityId + 'Image'
                  },
                  success: function (r) {
                    var data = r.data;//七牛会返回一个包含hash值和key的JSON字符串
                    console.log(r)
                    if (typeof data === 'string'){
                      data = JSON.parse(data.trim());//解压缩
                      that.setData({
                        communityImage: data.imgUrl
                      }) 
                    } 
                    console.log(data)
                      
                  },
                  fail: function () {
                    wx.showToast({
                      title: '上传失败',
                      icon: 'none'
                    })
                  }
                })

              },

              fail: function (res) {

                console.log(res)

              }

            })

          }
        })
      },
    })

  }
})