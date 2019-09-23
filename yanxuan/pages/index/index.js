//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    address: '',
    allInfo: null
  },
  onShow() {
    var that = this;
    wx.request({
      url: "http://118.25.222.68:5757/heyushuo/index/index",
      success: function(data) {
        console.log(data)
        that.setData({
          allInfo: data.data
        })
      }
    })
  },
  onLoad: function () {
    var that = this;
    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res.latitude)
    //     console.log(res.longitude)
    //     wx.request({
    //       url: `http://apis.juhe.cn/geo/?key=f7e239e85eda5324a999af579a713a38&lat=${res.latitude}&lng=${res.longitude}&type=1`,
    //       success: function(data) {
    //         console.log(data)
    //         that.setData({
    //           address: data.data.result.address
    //         })
    //       }
    //     })
    //   },
    // })
  }
})
