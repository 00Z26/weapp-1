// components/project.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    avatar_icon: app.globalData.me3_url,
    comment_icon: app.globalData.comment_url,
    like_icon: app.globalData.praise_url
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
