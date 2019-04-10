Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'noshow', //不显示
    shenfenzhengtupian: ['../../../../images/shangchuan.png', '../../../../images/shangchuan.png'], //身份证图片

  },
  //点击选择从哪里选择图片
  chooseImage: function(shenfenzheng) {
    let _this = this;
    wx.showActionSheet({ //参考  https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showActionSheet.html?search-key=%20wx.showActionSheet
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) { //tapIndex 获得 点击的按钮顺序
            _this.chooseWxImage('album', shenfenzheng) //设置不同的参数触发下面函数
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera', shenfenzheng)
          }
        }
      }
    })
  },
  chooseWxImage: function(type, shenfenzheng) {
    let _this = this;
    wx.chooseImage({ //从本地相册选择图片或使用相机拍照。
      sizeType: ['original', 'compressed'],
      sourceType: [type], //从chooseImage 里获得点击是哪一个
      success: function(res) {
        //返回保存 tempFilePaths		图片的本地文件路径列表
        if (shenfenzheng == 0) {
          _this.data.shenfenzhengtupian[0] = res.tempFilePaths;
        } else {
          _this.data.shenfenzhengtupian[1] = res.tempFilePaths;
        }
        _this.setData({
          shenfenzhengtupian: _this.data.shenfenzhengtupian,
        })
      }
    })
  },
  /**
   * 身份证照片上传正面
   *  通过百度开发平台识别并保存
   * 1.先把图片上传到服务器
   * 2.然后识别
   * 3.保存
   * 4.返回保存路径
   * 5.返回参数
   */
  shangchuanzhengmian: function(e) {
    // shenfenzheng = 0 表示身份证正面
    this.chooseImage(0);
    //上传成功，
    this.setData({
      shangchuangzhengmianchengguo:1, //识别并保存成功为1，失败为0
    })

  },
  /**
   * 身份证照片上传反面
   * 反面不要求识别
   * 1.先把图片上传到服务器
   * 2.然后不要求识别
   * 3.保存
   * 4.返回保存路径
   */
  shangchuanfanmian: function(e) {
    // shenfenzheng = 1 表示身份证反面
    this.chooseImage(1);
    //
    //上传成功，
    this.setData({
      shangchuangfanmianchengguo: 1, //识别并保存成功为1，失败为0
    })

  },
  /**
   * 身份证照片上传
   * 把上传到服务器图片返回的路径，保存到表单，
   * 再把图片上传云存储保存起来
   */
  shenfenzhengtijiao: function(e) {
    //判断是否上传证件照
    if (this.data.shenfenzhengtupian[0] == '../../../../images/shangchuan.png') {
      wx.showToast({
        title: "请先上传正面证件照！！",
        icon: "none",
        duration: 2000
      });
      return;
    } else if (this.data.shenfenzhengtupian[1] == '../../../../images/shangchuan.png') {
      wx.showToast({
        title: "请先上传反面证件照！！",
        icon: "none",
        duration: 2000
      });
      return;
    }

    //上传证件
    for (let i = 0; i < 2; i++) {
      var kl = this.data.shenfenzhengtupian[i][0].length //取保存图片地址的长度
      //把图片上传到云存储
      wx.cloud.uploadFile({
        cloudPath: 'shenfenzheng/' + this.data.shenfenzhengtupian[i][0].substring(kl - 51, kl), // 上传至云端的路径
        filePath: this.data.shenfenzhengtupian[i][0], // 小程序临时文件路径
        //证件上传到云存储成功
        success: res => {
          // 返回文件 ID
          console.log(res.fileID)
          //判断识别上传是否成功 ,正面与反面相等时成功
          if (this.data.shangchuangzhengmianchengguo == this.data.shangchuangfanmianchengguo) {
            // 切换界面
            this.setData({
              shenfenzhengtijiao: 0, // 为0 隐藏
              showxinxi: 1, // 为1 显示
            })
          } else {
            wx.showToast({
              title: "证件出错误了，请从新选择证件上传",
              icon: "none",
              duration: 2000
            });
            return;
          }

        },
        //证件上传到云存储失败
        fail: res => {
          wx.showToast({
            title: "上传出错了！请从新上传",
            icon: "none",
            duration: 2000
          });
          return;
        }
      })
    }
  },
  /**
   * 重新上传
   */
  chongxinchangchuan: function() {
    this.setData({
      shenfenzhengtijiao: 1, // 为0 隐藏
      showxinxi: 0, // 为1 显示
    })
  },
  /**
   * 确认提交
   */
  quedingtijiao: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      openid: options.openid,
      ifSpei: options.ifSpei
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

  }
})