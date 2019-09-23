import { getTopicList} from "../../api/index.js"
// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    topicList: null,
    pageNum: 1
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
    var that = this;
    getTopicList(that.data.pageNum, function(res) {
      console.log(res.data.data)
      that.setData({
        topicList: res.data.data
      })
    })
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
    var that = this
    getTopicList(1, function(res) {
      that.setData({
        topicList: res.data.data
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var pageNum = that.data.pageNum;
    pageNum++;
    getTopicList(pageNum, function(res) {
      if(res.data.data.length === 0) {
        wx.showToast({
          title: '没有更多数据了',
        })
        return;
      }
      that.setData({
        topicList: [...that.data.topicList, ...res.data.data],
        pageNum: pageNum
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})