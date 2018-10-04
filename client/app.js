// //app.js
// App({
//   onLaunch: function () {
//     // 展示本地存储能力
//     var logs = wx.getStorageSync('logs') || []
//     logs.unshift(Date.now())
//     wx.setStorageSync('logs', logs)

//     // 登录
//     wx.login({
//       success: res => {
//         // 发送 res.code 到后台换取 openId, sessionKey, unionId
//       }
//     })
//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               // 可以将 res 发送给后台解码出 unionId
//               this.globalData.userInfo = res.userInfo

//               // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//               // 所以此处加入 callback 以防止这种情况
//               if (this.userInfoReadyCallback) {
//                 this.userInfoReadyCallback(res)
//               }
//             }
//           })
//           //直接进入个人主页
//           wx.redirectTo({
//             url: './../main/main',
//           })
//         }
//       }
//     })
//   },
//   globalData: {
//     userInfo: null
//   }
//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
      var user = wx.getStorageSync("user")
      if (user) {
        this.globalData.userInfo.user_type = user.user_type;
        this.globalData.userInfo.user_id = user.user_id;
        this.globalData.user_name = user.user_name;
        this.globalData.user_image = user.user_image;
        wx.redirectTo({
            url: '/pages/main/main',
          })
        }
        qcloud.setLoginUrl(config.service.loginUrl)
        //登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.navigateTo({
                url: 'main/main',
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    },
    globalData:{
      userInfo: {
        user_type: 0, 
        user_id: '',
        user_name: '',
        image: ''
      },
      jobList: ['本科生','硕士','博士'],
      phone_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538531303107-IptVFBQ0J.png',
      focus_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538531342563-EjYYvDPBJ.png',
      befocused_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532078771-xN9so0dR8.png',
      label_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532137486-XZvQ1MHaI.png',
      corporation_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532195242-0cMEozz2U.png',
      address_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532256080-IL8ZrXFZp.png',
      pubed_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532283870-GbzVHevNl.png',
      me1_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532304893-3Uetxreze.png',
      me2_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532327775-4cbr2qXua.png',
      company_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532362129-tP4kbHea1.png',
      close_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538554509708-nTE4VMct1.png',
      answernum_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538533356317-nP6Nq_VWH.png',
      power0_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532461998-6mtwDU_gX.png',
      power1_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532480516-45uaw-gHC.png',
      comment_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532497881-ROq4rPAw4.png',
      community_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532514287-UY4jWE8Nz.png',
      answer_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532543538-CiiQ6pnL5.png',
      information_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532567596-ldFmHDFtl.png',
      invite_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532588344-MP0r5Z3NR.png',
      praise_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532608580-E8DVdfzfj.png',
      job_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538532627454-IdnrgDDWW.png',
      back_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538531908463-gb0Gt8Xys.png',
      individual_back_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538534463620-XPPdqSPpv.png',
      company_back_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538534489550-lxSbZX9qe.png',
      company_type_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538534514840-k1jSQ_2lo.png',
      pub_q_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538555126154-JHygdVdPn.png',
      pub_p_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538555312471-n3sXb7LOw.png',
      pub_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538536024162-2aD5Wxo2N.png',
      pullDown_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538536595087-xJ4Gz745Y.png',
      me3_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538537155439-CdcryyTYj.png',
      default_url:'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538551134881-Gau4HdGvF.png',
      rightArrow_url: 'https://qcloudtest-1257116845.cos.ap-guangzhou.myqcloud.com/1538626553738-BxWoVORS-.png',

    }
})