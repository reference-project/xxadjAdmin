// pages/user/alterJiashi.js
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
    this.setData({
      openid: options.openid,
      ifJiashi: options.ifJiashi
    })

    var flagTemp = '';

    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['camera'],


      success: function (res) {
        wx.showLoading({
          title: '识别中',
        })
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: Api1,//使用人脸识别接口
          //method: 'GET',
          filePath: tempFilePaths[0],
          header: {
            'content-type': 'application/json' // 默认值
          },
          name: 'files',
          success: function (res) {
            that.flagTemp = res.data;
            console.log("flag" + that.flagTemp);
            if (res.data != 0) {
              var uUsername = that.flagTemp;
              console.log(uUsername)

              user = {
                uUsername: uUsername,
              }

              wx.request({
                url: Api2,
                method: 'GET',
                data: user,
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"  // 默认值
                },
                success: function (res) {
                  wx.hideLoading();
                  app.globalData.userInfo = res.data;
                  console.log(res.data);
                  if (res.data != 0) {
                    wx.switchTab({
                      url: '../index/index'
                    })
                  } else {
                    wx.showModal({
                      title: '识别失败',
                      content: '请重新识别',
                      showCancel: false, //不显示取消按钮
                      confirmText: '确定'
                    })
                  }
                }
              })
            }

          }
        })
      }
    })
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

  }
})