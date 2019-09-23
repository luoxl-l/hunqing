// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onGotUserInfo(res) {
    console.log(res.detail.userInfo)
    // 需要向后台发送登录请求，如果登录成功就写本地存储，如果不成功，就不能写
    // 后台接口必须要用到一个字段code
    wx.login({
      success: function(res) {
        wx.request({
          url: "http://..../login",
          methods: "POST",
          data: {
            code: res.code,
            userInfo: userInfo
          },
          success: function (res) {
            if(res.status === 1) {
              // 登录成功 返回信息里面，必然有用户ID Openid
              wx.setStorageSync("userInfo", res.data)
              wx.setStorageSync("islogin", true)
            }
          }
        })
      }
    })

    


  }
})