var app = getApp();
export function getTopicList(pageNum, fn) {
  wx.request({
    url: app.globalData.baseUrl + "topic/listaction?page=" + pageNum,
    success: function(res) {
      fn(res)
    }
  })
}

export function getCateList() {
  return new Promise(function(resolve, reject){
    wx.request({
      url: app.globalData.baseUrl+'category/indexaction',
      success: function(res) {
        resolve(res)
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}

export function getCateDetail(cid) {
  return new Promise((resolve, reject)=> {
    wx.request({
      url: app.globalData.baseUrl+'category/currentaction?id='+cid,
      success: function(res) {
        resolve(res)
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}

export function getCartList() {
  return new Promise((resolve, reject)=> {
    wx.request({
      url: app.globalData.baseUrl + "cart/cartList?openId=oQmbb4sNZdxaUQZ0sfYgvtOP2S7c",
      success: function(res) {
        resolve(res)
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}

export function deleteProduct(pid) {
  return new Promise((resolve, reject)=> {
    wx.request({
      url: app.globalData.baseUrl + "cart/deleteAction?id="+pid,
      success: function(res) {
        resolve(res)
      },
      fail: function(error) {
        reject(error)
      }
    })
  })
}