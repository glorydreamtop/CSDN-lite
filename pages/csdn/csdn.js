Page({
  data: {
    tabs: [{
      name: '前端',
      id: 'web'
    }, {
      name: '程序人生',
      id: 'career'
    }, {
      name: '架构',
      id: 'arch'
    }, {
      name: '编程语言',
      id: 'lang'
    }, {
      name: '游戏开发',
      id: 'game'
    }, {
      name: '数据库',
      id: 'db'
    }, {
      name: '移动开发',
      id: 'mobile'
    }],
    articles: [
      [],
      [],
      [],
      [],
      [],
      [],
      []
    ],
    activeIndex: 'web',
    ifsearch:false
  },
  onLoad() {
    this.getArticles();
  },
  onReachBottom() {
    this.getArticles();
  },
  //缓存新文章列表数据
  getArticles() {
    var that = this;
    let now = that.getTime();
    const getArticles = wx.request({
      url: 'https://www.csdn.net/api/articles?type=more&category=' + that.data.activeIndex + '&shown_offset=' + now + '&first_view=false',
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        var articles = that.data.articles;
        for (let i = 0; i < 10; i++) {
          var article = {
            title: res.data.articles[i].title,
            desc: res.data.articles[i].desc,
            time: res.data.articles[i].created_at,
            nickname: res.data.articles[i].nickname,
            views: res.data.articles[i].views,
            url: res.data.articles[i].url.replace('article/details','wx/article/details')
          };
          //检测当前浏览专题
          switch (that.data.activeIndex) {
            case 'web':
              var j = 0;
              break;
            case 'career':
              var j = 1;
              break;
            case 'arch':
              var j = 2;
              break;
            case 'lang':
              var j = 3;
              break;
            case 'game':
              var j = 4;
              break;
            case 'db':
              var j = 5;
              break;
            case 'mobile':
              var j = 6;
              break;
          }
          articles[j].push(article);
          that.setData({
            articles
          });
        }
      }
    });
  },
  //切换专题
  tabClick(e) {
    var that = this;
    that.setData({
      activeIndex: e.currentTarget.id
    });
    let theclass = '.' + e.currentTarget.id;
    //文章列表节点高度为0则表示未加载
    wx.createSelectorQuery().select(theclass).boundingClientRect(function(rect) {
      if (rect.height === 0) {
        that.getArticles();
      }
    }).exec();
  },
  //获取时间戳
  getTime() {
    var date = new Date();
    return date.getTime();
  },
  //打开详情页
  todetail(e){
    var array = e.currentTarget.dataset.url.split('/')
    var userName=array[3]
    var articleId=array[7]
    wx.navigateTo({
      url: '../blog/article-detail?userName='+userName+'&articleId='+articleId,
    })
  },
  inputShowed(e){
    this.setData({
      ifsearch:e.detail
    })
  }
})