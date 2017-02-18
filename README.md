### 一.简介

>Liblog是一个简单易用的Markdown博客系统，它是基于开源框架[thinkJS](http://www.thinkjs.org)(使用 ES6/7 特性开发 Node.js 框架)开发的nodejs项目
需要mysql数据库支持，具有管理后台功能，更新博客分为普通文章和markdown文章，markdown文章只需要导入你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，分类，标签云，留言板、友情链接、系统设置等常用功能。Liblog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。Liblog还支持整站静态网页生成，同时有发布相关的配置，使用nginx做反向代理，动静态资源分离，静态缓存等，使您发布后的博客访问秒开。

![image](https://raw.githubusercontent.com/livisky/liblog/master/liblog.png)


### 二.功能特点

1. 一键导入Markdown文章  
2. 文章评论  
3. 代码高亮  
4. 文章内容分页  
5. 系统主题设置  
6. 响应式布局,支持手机端访问  
7. 良好的SEO  
8. 登录/注册/个人中心/个人设置
9. 小型bbs，讨论社区
10. 支持cms标签循环
11. 完善的后台及权限控制

### 三.安装及其他介绍

>安装教程：http://www.jsout.com/page/423.html<br/>
>前台登录：admin@jsout.com   123456<br/>
>后台登录：admin 123456<br/>

>安装Liblog之前，请`star`并`fork`项目给作者以鼓励。

>如果你认可并支持Liblog，还可通过扫描二维码捐赠Liblog(http://www.jsout.com/donate.html）

### 四.最新版本Liblogv1.2更新

1. 注册/登录/QQ登录/github登录
2. 个人中心/个人设置
3. 系统主题设置
4. 小型社区(类似cnodejs.org)/发布主题/编辑主题/添加回复/编辑回复
5. 改nodejs模版引擎ejs改为nunjucks,通过标签配置即可实现内容的读取如：
```javascript
  {% article data = "topList",limit= "6",flag="totop"%}
```
详见：http://www.jsout.com/topic/item/33.html

### 五.感谢

>Liblog的成长需要各位亲们支持！感谢你们使用Liblog，感激你们对Liblog的良好建议与Bug反馈。如果你的博客也是基于Liblog，请告知作者，无偿获取技术指导。

>Liblog QQ群：`256687601`  
>作者邮箱：`262248861@qq.com`    
>演示网站：http://www.jsout.com

### 六.更新日志

####　2017/1/5更新

>添加静态资源一键打包功能(html,css,javascript) gulp配置<br/>
>添加开发和生产运行模式

运行程序请选择运行模式
```javascript
//压缩html,css,js 并生成相应目录
npm run compress

//运行开发模式，html,css,js均加载未压缩版本
npm run dev  

//运行生产模式，html,css,js均加载压缩版本
npm run app  

//首次运行/更新运行前请先编译项目
npm run compile

//线上推荐用pm2来运行(先配置好pm2.json)
pm2 start pm2.json
```