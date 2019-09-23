// pages/category/category.js
import { getCateList, getCateDetail} from "../../api/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: null,
    currentActive: 0,
    currentOne: null
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
    var that = this;
    getCateList().then((res)=> {
      console.log(res)
      this.setData({
        cateList: res.data.categoryList
      })
      getCateDetail(res.data.categoryList[0].id).then((res)=> {
        console.log(res)
        that.setData({
          currentOne: res.data.data.currentOne
        })
      })
    })
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
  getCateDetail(event) {
    var index = event.target.dataset.index;
    var cid = event.target.dataset.id
    getCateDetail(cid).then((res)=> {
      this.setData({
        currentOne: res.data.data.currentOne
      })
    })
    // 使得currentActive =
    this.setData({
      currentActive: index
    })
  }
})