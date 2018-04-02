//app.js

App({
  
  onLaunch: function () {
    this.getUser()
  },
  getUser: function () {
    var url = this.getData.url
    var user = wx.getStorageSync('user')
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var js_code = res.code
          wx.getUserInfo({
            success: res => {
              var params = {
                funCode: 130009,
                jsCode: js_code,
                encryptedData: res.encryptedData,
                iv: res.iv,
                version: '1.0.0',
                softType: 'h5_sdx_v1.0',
                mobile: '',
                userId: '',
                tokenId: ''
              }
              wx.request({
                // url: 'https://wap.xinlujinrong.com',
                url: 'http://116.62.241.200:6070',
                data: params,
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  // console.log(res.data)
                  if (res.data.retCode == '0000') {
                    if (res.data.retData.code == '250025') {
                      wx.navigateTo({
                        url: '../LchoiceId/LchoiceId?unionId=' + res.data.retData.unionId,
                      })
                    }
                    if (res.data.retData.userType != '') {
                      wx.setStorageSync('user', res.data.retData)
                      wx.setStorageSync('userType', res.data.retData.userType)
                      
                    }
                  }
                }
              })
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: res => {
              wx.openSetting({
                success: res => {
                  // console.log(res)
                  if (res.authSetting["scope.userInfo"] == true) {
                    wx.login({
                      success: res => {
                        var js_code = res.code
                        wx.getUserInfo({
                          success: res => {
                            var params = {
                              funCode: 130009,
                              jsCode: js_code,
                              encryptedData: res.encryptedData,
                              iv: res.iv,
                              version: '1.0.0',
                              softType: 'h5_sdx_v1.0',
                              mobile: '',
                              userId: '',
                              tokenId: ''
                            }
                            wx.request({
                              url: 'https://wap.xinlujinrong.com',
                              data: params,
                              method: 'POST',
                              header: {
                                'content-type': 'application/json' // 默认值
                              },
                              success: function (res) {
                                // console.log(res.data)
                                if (res.data.retCode == '0000') {
                                  if (res.data.retData.code == '250025') {
                                    wx.navigateTo({
                                      url: '../LchoiceId/LchoiceId?unionId=' + res.data.retData.unionId,
                                    })
                                  }
                                  if (res.data.retData.userType != '') {
                                    wx.setStorageSync('user', res.data.retData)
                                    wx.setStorageSync('userType', res.data.retData.userType)
                                  }
                                }
                              }
                            })
                          }
                        }) 
                      }
                    })
                  }
                }
              })

            }
          })


        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
  },
  onShow: function () {
    wx.setStorageSync('version', '1.0.0')
    wx.setStorageSync('softType', 'h5_sdx_v1.0')
    var user = wx.getStorageSync('user')
    this.getData.data.mobile = user.mobile
    this.getData.data.userId = user.userId
    this.getData.data.tokenId = user.token
    this.getData.imAccid = user.imAccid
    var url = this.getData.url
    var publicParams = this.getData.data
  },
  globalData: {
    userInfo: null
  },
  getData: {
    data: {
      version: '1.0.0',
      softType: 'h5_sdx_v1.0',
      mobile: '',
      userId: '',
      tokenId: ''
    },
    imAccid: '',
    // url: 'https://app.qyq3.jie360.com.cn'
    // url: 'https://wap.xinlujinrong.com', // 线上地址
    url: 'http://116.62.241.200:6070' // 测试地址
  }
})