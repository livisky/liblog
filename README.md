﻿### Liblog开源博客系统

### 一. 简介
Liblog是一个简单易用的Markdown博客系统，它是基于开源框架[thinkJS](http://www.thinkjs.org)(使用 ES6/7 特性开发 Node.js 框架)开发的nodejs项目
需要mysql数据库支持，具有管理后台功能，更新博客分为普通文章和markdown文章，markdown文章只需要导入你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，分类，标签云，留言板、友情链接、系统设置等常用功能。Liblog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。Liblog还支持整站静态网页生成，同时有发布相关的配置，使用nginx做反向代理，动静态资源分离，静态缓存等，使您发布后的博客访问秒开。

### 二. 功能特点

1. 一键导入Markdown文章  
2. 文章评论  
3. 代码高亮  
4. 文章内容分页  
5. 支持手机端访问  
6. 系统主题设置  
7. 响应式  
8. 良好的SEO  
10、登陆/注册/个人中心/个人设置
11、小型bbs，讨论社区
12、支持cms标签循环

### 三. 安装及其他介绍

详见：http://www.jsout.com/page/423.html

安装Liblog之前，请star并fork项目给作者以鼓励。
如果你认可并支持Liblog，还可通过扫描二维码捐赠Liblog(http://www.jsout.com/donate.html）

### 最新版本Liblogv1.2更新

1、注册/登陆/QQ登陆/github登陆
2、个人中心/个人设置
3、系统主题设置
4、小型社区(类似cnodejs.org)/发布主题/编辑主题/添加回复/编辑回复
5、改nodejs模版引擎ejs改为nunjucks,通过标签配置即可实现内容的读取
   如：{% article data = "topList",limit= "6",flag="totop"%}
   详见：http://www.jsout.com/topic/item/33.html