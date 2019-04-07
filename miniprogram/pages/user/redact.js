// pages/user/redact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '', //用户头像地址
    userInfo: '', //用户名
    name: 'BubbleTg', //姓名
    phone: '17863273072', //电话
    age: '0', //年龄
    jialing: '0', //驾龄
    suozaidi: '北京', //所在地
    spe_i: '未实名认证', //实名认证
    jiashi: '未驾驶认证', //驾驶认证
  },
  //打开弹出框
  showModal: function(e) {
    //获得模板显示
    var showName = e.currentTarget.dataset.modal;
    //获得模板标题
    var modalName = e.currentTarget.dataset.modalName;
    //获得修改的值
    var modalValue = e.currentTarget.dataset.modalValue;
    //获得修改的值
    var modalTitle = e.currentTarget.dataset.modalTitle;
    this.setData({
      ifShow: showName,
      modalName: modalName,
      modalValue: modalValue,
      modalTitle: modalTitle
    })
  },
  //关闭弹出框
  closeModal: function(e) {
    this.setData({
      ifShow: null
    })
  },
  //判断是否实名认证
  ifSpei: function(e) {
    if (this.data.spe_i != '未实名认证') {
      //提示
      wx.showToast({
        title: "您已经实名认证！！！不可修改",
        icon: "none",
        duration: 2000
      })
    } else {
      //打开弹窗口修改
      this.showModal(e);
    }
  },
  //判断是否驾驶认证
  ifJiashi: function(e) {
    if (this.data.jiashi != '未驾驶认证') {
      //提示
      wx.showToast({
        title: "您已经驾驶认证！！！不可修改",
        icon: "none",
        duration: 2000
      })
    } else {
      //打开弹窗口修改
      this.showModal(e);
    }
  },
  //修改姓名
  alterName: function(e) {
    console.log("修改姓名被点击。。。。。。。。。。", e);
    //先判断是否实名，并打开修改框
    this.ifSpei(e)
  },
  //修改电话
  alterPhone: function(e) {
    console.log("修改电话被点击。。。。。。。。。。", e);
    //先打开弹窗口
    this.showModal(e);
  },
  //修改年龄
  alterAge: function(e) {
    console.log("修改年龄被点击。。。。。。。。。。", e);
    //先判断是否实名
    this.ifSpei(e);
  },
  //修改驾龄
  alterJialing: function(e) {
    console.log("修改驾龄被点击。。。。。。。。。。", e);
    //先判断是否驾驶认证
    this.ifJiashi(e);

  },
  //修改所在地
  alterSuozaidi: function(e) {
    console.log("修改所在地被点击。。。。。。。。。。", e);
    //先打开弹窗口
    this.showModal(e);
  },
  //修改实名认证
  alterSpei: function(e) {
    console.log("修改实名认证被点击。。。。。。。。。。", e);
    //先判断是否实名
    this.ifSpei(e);
  },
  //修改驾驶认证
  alterJiashi: function(e) {
    console.log("修改驾驶认证被点击。。。。。。。。。。", e);
    //先判断是否驾驶认证
    this.ifJiashi(e);
  },

  //更新到数据库
  updateAlter: function(e) {
    let modalTitle_ = e.detail.target.dataset.modalTitle;
    /**
     * 修改姓名
     */
    if (modalTitle_ == 'name') {
      //先判断用户是否填写完整
      if (e.detail.value.name == '') {
        //提示
        wx.showToast({
          title: "姓名不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      } 
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.name != this.data.modalValue) {
        //更新到数据库
        console.log("更新到数据库。。。。。。。。。。" + e.detail.value.name , e);
      }

    }
    
    /**
     * 修改电话
     */
    if (modalTitle_ == 'phone') {
      //先判断用户是否填写完整
      if (e.detail.value.phone == '') {
        //提示
        wx.showToast({
          title: "电话不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      } 
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.phone != this.data.modalValue) {
        //更新到数据库
        console.log("更新到数据库。。。。。。。。。。" + e.detail.value.phone, e);
      }

    }

    /**
         * 修改年龄
         */
    if (modalTitle_ == 'age') {
      //先判断用户是否填写完整
      if (e.detail.value.age == '') {
        //提示
        wx.showToast({
          title: "年龄不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      } 
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.age != this.data.modalValue) {
        //更新到数据库
        console.log("更新到数据库。。。。。。。。。。" + e.detail.value.age, e);
      }

    }

    /**
     * 修改驾龄
     */
    if (modalTitle_ == 'jialing') {
      //先判断用户是否填写完整
      if (e.detail.value.jialing == '') {
        //提示
        wx.showToast({
          title: "驾龄不能为空",
          icon: "none",
          duration: 2000
        })
        return;
      } 
      //当与原始ide数据相等时，不用更新数据库
      if (e.detail.value.jialing != this.data.modalValue) {
        //更新到数据库
        console.log("更新到数据库。。。。。。。。。。" + e.detail.value.jialing, e);
      }

    }

   
   
   
   
   
    //关闭修改框
    this.closeModal();
    //加载更新提示框
    this.setData({
      showLoading:true
    })
    //然后从新加载数据,关闭提示框
    this.setData({
      showLoading: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
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

})