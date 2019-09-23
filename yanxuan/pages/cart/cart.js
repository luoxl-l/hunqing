// pages/cart/cart.js
import {
  getCartList,
  deleteProduct
} from "../../api/index.js"
var startX = 0;
var endX = 0;
var offsetX = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: null,
    totalPrice: 0,
    isAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    getCartList().then((res) => {
      console.log(res)
      var list = res.data.data
      list.forEach((item) => {
        item.isSelect = false;
        item.animationData = null;
      })
      that.setData({
        cartList: list
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  calcPrice() {
    var list = this.data.cartList
    var total = list.reduce((total, item) => {
      if (item.isSelect) {
        total += parseInt(item.retail_price * item.number)
        return total;
      } else {
        return total;
      }
    }, 0)
    this.setData({
      totalPrice: total
    })
  },
  changeStatus(event) {
    var index = event.target.dataset.index
    var list = this.data.cartList
    list[index].isSelect = !list[index].isSelect;

    // 判断是否所有的cart被选中
    var isAll = list.every((item) => {
      return item.isSelect == true;
    })
    this.setData({
      cartList: list,
      isAll: isAll
    })

    this.calcPrice();
  },
  selectAll() {
    // 改变全选的状态
    // this.setData({
    //   isAll: !this.data.isAll
    // })

    // 临时改变状态变量
    var isAll = !this.data.isAll
    // 临时数组变量
    var list = this.data.cartList
    // 修改临时数组中的isSelect
    list.forEach((item) => {
      item.isSelect = isAll
    })

    // 将修改过的list和isAll状态同步到数据模型中！！！
    this.setData({
      cartList: list,
      isAll: isAll
    })

    this.calcPrice()
  },
  touchStart(event) {
    // 
    // console.log(event.touchs[0].clientX)
    startX = event.touches[0].clientX
  },
  touchMove(event) {
    // move是连续触发的动作
    endX = event.touches[0].clientX
  },
  touchEnd(event) {
    // 获取元素宽度（小程序不能改变元素的属性或者值，只能获取）
    var mywidth = 0;
    const query = wx.createSelectorQuery()
    query.select('.delete').boundingClientRect()
    query.exec((res) => {
      console.log(res)
      mywidth = res[0].width
      //1。获取索引值
      // target 
      var index = event.currentTarget.dataset.index;
      var list = this.data.cartList
      // 计算出来偏移量
      offsetX = startX - endX;
      // 阈值
      if (offsetX > 50) {
        // 让其他所有的元素都右滑
        this.rightAnimation();
        wx.nextTick(() => {
          // 就让整个item进行左移动
          // 创建动画进行移动item
          var animation = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease',
          })
          animation.translateX(-(mywidth)).step()
          list[index].animationData = animation.export()
          this.setData({
            cartList: list
          })
        })

      } else if (offsetX < -50) {
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        animation.translateX(0).step()
        list[index].animationData = animation.export()
        this.setData({
          cartList: list
        })
      }
    })

  },
  // 所有的item进行右滑动
  rightAnimation() {
    var list = this.data.cartList
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    animation.translateX(0).step()
    list.forEach((item) => {
      item.animationData = animation
    })

    this.setData({
      cartList: list
    })
  },
  deleteProduct(event) {
    var that = this
    var index = event.currentTarget.dataset.index
    var pid = event.currentTarget.dataset.id
    var list = this.data.cartList
    wx.showModal({
      title: '确定删除吗',
      content: '',
      success: function(res) {
        console.log(res)
        if (res.confirm) {
          deleteProduct(pid).then((data) => {
            // console.log(data)
            if (data.data.data == true) {
              list.splice(index, 1)
              that.setData({
                cartList: list
              })
            } else {
              wx.showToast({
                title: '删除失败',
              })
            }
          })
        }
      }
    })
    // deleteProduct(pid).then((data)=> {
    //   // console.log(data)
    //   if(data.data.data == true) {
    //     list.splice(index, 1)
    //     this.setData({
    //       cartList: list
    //     })
    //   }else {
    //     wx.showToast({
    //       title: '删除失败',
    //     })
    //   }
    // })
  }
})