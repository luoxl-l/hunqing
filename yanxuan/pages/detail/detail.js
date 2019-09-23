// pages/detail/detail.js
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    productInfo: null,
    isShow: false,
    animation: null,
    inputVal: 0,
    allcartNum: 0,
    article: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    console.log(options.id)
    this.setData({
      pid: options.id
    })

    wx.request({
      url: `http://118.25.222.68:5757/heyushuo/goods/detailaction?id=${options.id}&openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c`,
      success: function(res) {
        console.log(res)
        that.setData({
          productInfo: res.data,
          allcartNum: res.data.allnumber
        })

        WxParse.wxParse('article', 'html', res.data.info.goods_desc, that, 0);
      }
    })
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
  showModal() {
    if (this.data.isShow) {

    } else {
      this.setData({
        isShow: true
      })

      wx.nextTick(()=> {
        var animation = wx.createAnimation({
          duration: 500,
          timingFunction: 'ease',
        })
        animation.bottom(0).step()
        this.setData({
          animation: animation.export()
        })
      })

      
    }
  },
  closeModal() {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    animation.bottom(-250).step()
    this.setData({
      animation: animation.export()
    })

    wx.nextTick(()=> {
      this.setData({
        isShow: false
      })
    })
    
  },
  addNum() {
    console.log("增加")
    var num = this.data.inputVal+1
    this.setData({
      inputVal: num
    })
  },
  subNum() {
    var num = this.data.inputVal - 1
    if(num<=0) {
      num = 0;
    }
    this.setData({
      inputVal: num
    })
  },
  changeNum(event) {
    console.log(event.currentTarget.detail.value)
    this.setData({
      inputVal: event.currentTarget.detail.value
    })
  },
  joinCart() {
    var that  =this;
    wx.request({
      url: 'http://118.25.222.68:5757/heyushuo/cart/addCart',
      method: "POST",
      data: {
        goodsId: that.data.pid,
        number: that.data.inputVal,
        openId: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c'
      },
      success: function(res) {
        console.log(res)
        if(res.data.data == "success") {
          wx.showToast({
            title: '加入購物車成功',
          })

          var num = parseInt(that.data.allcartNum) + that.data.inputVal;
          that.setData({
            allcartNum: num
          })
        }
      }
    })
  },
  nowBuy() {
    // 1.假设是登录的用户
    wx.request({
      url: 'http:...',
      methods: "post",
      data: {
        productInfo: '',
        youhuiquan: 20,
        address: ''
      },
      success: function(res) {
        // 返回5个参数和一个sign
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: 'MD5',
          paySign: res.paySign,
          success: function() {
            // 什么时候执行success 支付成功完成
            // 进入已支付订单页面
            
          },
          fail: function() {
            // 待支付订单页面
          }
        })
      }
    })
  }
})