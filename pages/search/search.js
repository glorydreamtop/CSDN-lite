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
    inputShowed: '',
    searchdetails: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput() {
      this.setData({
        inputShowed: true
      });
      this.triggerEvent('inputShowed', this.data.inputShowed);
    },
    hideInput() {
      this.setData({
        inputVal: "",
        inputShowed: false,
        searchdetails:[]
      });
      this.triggerEvent('inputShowed', this.data.inputShowed);
    },
    clearInput() {
      this.setData({
        inputVal: "",
        searchdetails: []
      });
    },
    inputTyping(e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    searchnow(e) {
      var that = this;
      var keyword = e.detail.value
      console.log(keyword)
      wx.request({
        url: 'https://gw.csdn.net/mini-app/v1/home_page/psearch',
        method: 'post',
        data: {
          keywords: keyword,
          page: '1',
          size: '10'
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:res=> {
          var source = res.data.data.hits;
          var searchdetails=that.data.searchdetails;
          console.log(res);
          for (let i = 0; i < 10; i++) {
            var searchdetail = {
              id: source[i]._source.id,
              title: source[i]._source.title,
              url: source[i]._source.url,
              views: source[i]._source.viewcount,
              desc: source[i]._source.description,
              time: source[i]._source.created_at
            };
            searchdetails.push(searchdetail);
          };
          that.setData({
            searchdetails
          })
        }
      })
    },
    searchtodetail(e) {
      var array = e.currentTarget.dataset.url.split('/')
      var userName = array[3]
      var articleId = array[7]
      wx.navigateTo({
        url: '../blog/article-detail?userName=' + userName + '&articleId=' + articleId,
      })
    }
  }
})