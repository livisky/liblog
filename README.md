﻿### Liblog开源博客系统

### 一.简介
Liblog是一个简单易用的Markdown博客系统，它是基于开源框架[thinkJS](http://www.thinkjs.org)(使用 ES6/7 特性开发 Node.js 框架)开发的nodejs项目
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
8. 登陆/注册/个人中心/个人设置
9. 小型bbs，讨论社区
10. 支持cms标签循环

### 三.安装及其他介绍

详见：http://www.jsout.com/page/423.html

安装Liblog之前，请`star`并`fork`项目给作者以鼓励。
如果你认可并支持Liblog，还可通过扫描二维码捐赠Liblog(http://www.jsout.com/donate.html）

### 四.最新版本Liblogv1.2更新

1. 注册/登陆/QQ登陆/github登陆
2. 个人中心/个人设置
3. 系统主题设置
4. 小型社区(类似cnodejs.org)/发布主题/编辑主题/添加回复/编辑回复
5. 改nodejs模版引擎ejs改为nunjucks,通过标签配置即可实现内容的读取
   如：{% article data = "topList",limit= "6",flag="totop"%}
   详见：http://www.jsout.com/topic/item/33.html

### 五.感谢

Liblog的成长需要各位亲们支持！感谢你们使用Liblog，感激你们对Liblog的良好建议与Bug反馈。如果你的博客也是基于Liblog，请告知作者，无偿获取技术指导。

Liblog QQ群：`256687601`  
作者邮箱：`262248861@qq.com`    
演示网站：http://www.jsout.com