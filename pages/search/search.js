// pages/search.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    inputVal: '',
    inputShowed: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput() {
      this.setData({
        inputShowed: true
      });
      this.triggerEvent('inputShowed',inputShowed)
    },
    hideInput() {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput() {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping(e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    searchnow(e) {
      var keyword = e.detail.value
      console.log(keyword)
      wx.request({
        url: 'https://gw.csdn.net/mini-app/v1/home_page/psearch',
        method:'post',
        data: {
          keywords:keyword,
          page: '1',
          size: '10'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res){
          console.log(res)
        }
      })
    }
  }
})