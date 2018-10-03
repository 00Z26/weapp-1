// components/project.js
const app=getApp();
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
    avatar_url:app.globalData.default_url,
    answer_url:app.globalData.answernum_url,
    type_url: app.globalData.label_url,
    privaty_url: app.globalData.power1_url
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
