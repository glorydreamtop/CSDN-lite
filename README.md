# CSDN-lite
一个CSDN轻版的小程序，界面清爽
# 更新日志
## 2019/4/6
第一版，下拉加载更多文章列表
## 2019/4/10
第一版，打开文章详情页
## 2019/4/11
第三版，优化目录结构
## 2019/4/13
第四版，搜索模块组件化
# 部分踩坑经验
## 同源防跨域问题
微信小程序限制了小程序的所有网络请求必须来自于同一域名，那么后端Nginx反向代理是必然的了。
开发过程中，暂时在配置中关闭合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书检查
## 使用官方webview页面
比如CSDN（百度可以搜到CSDN开放平台，但是进不去网站），没有很方便的APi，但是官方也有小程序，可以抓包获取部分信息，抓包过程发现，文章详情页是用webview承载，使用了和官方相同的变量名即可使用官方的webview页面。
# GIF演示
推荐一款录屏转gif的小工具，开源地址：[ScreenToGif GitHub]('https://github.com/NickeManarin/ScreenToGif')，提供国内的一个[下载地址]('https://itlao5.com/wp/tools/ScreenToGif2.14.1.rar')。
![CSDN-lite演示]("./CSDN-lite演示.gif")