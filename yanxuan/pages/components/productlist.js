// pages/components/productlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mydata: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoDetail(event) {
      var id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/detail/detail?id='+id,
      })
    }
  }
})
