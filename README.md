###Liblog开源博客系统安装

### 一. 简介
Liblog是一个简单易用的Markdown博客系统，它是基于开源框架[thinkJS](http://www.thinkjs.org)(使用 ES6/7 特性开发 Node.js 框架)开发的nodejs项目
需要mysql数据库支持，具有管理后台功能，更新博客分为普通文章和markdown文章，markdown文章只需要导入你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，分类，标签云，留言板、友情链接、系统设置等常用功能。Liblog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。Liblog还支持整站静态网页生成，同时有发布相关的配置，使用nginx做反向代理，动静态资源分离，静态缓存等，使您发布后的博客访问秒开。

### 二. 功能特点

1. 一键导入Markdown文章  
2. 文章评论  
3. 代码高亮  
4. 文章内容分页  
5. 支持手机端访问  
6. 自制主题  
7. 响应式  
8. 自定义URL
9. 良好的SEO  

### 三. Liblog优势

1. 使用nodejs编写，对前端开发人员有天然的二次开发优势  
2. 一键导入Markdown文章，摆脱后台编辑排版困难，无法实时预览的缺点  
3. 可自定义URL，支持静态/伪静态访问，良好的SEO  
4. 完善的后台配置，可自由开关某些功能  
5. 多主题支持，可自制主题  
6. 博客，分类，标签，归档  
7. 采用pm2守护进程管理nodejs应用，宕机自动重启
8. 博客文章搜索
9. 后台权限管理功能(角色、权限自定义)

###四.使用及安装

####安装依赖

执行之前请确认已有 Node.js 环境，Node.js 版本要大于 4.0

解压安装包，执行 npm install 安装对应的依赖。
```
npm install

```
####导入数据库
导入根目录下的演示数据库文件liblog.sql
####修改数据库配置（src/common/config/db.js）
修改数据库名,数据库帐号及host地址
```
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'liblog',
      user: 'root',
      password: 'root',
      prefix: 'li_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
```
####编译源文件代码
```javascript
npm run compile
```
####启动服务
```javascript
npm run start
```
####前台访问地址

http://localhost:8361，

####后台地址
http://localhost:8361/admin

初始化帐号：admin  123456

####线上部署

在服务器上推荐使用 pm2 来管理 Node.js 服务，来保证系统正常运行。
编辑并保存根目录下的pm2.json
```
{
  "apps": [{
    "name": "liblog",
    "script": "npm start www/production.js",
    "cwd": "E:/jsout/liblog",
    "max_memory_restart": "1G",
    "autorestart": true,
    "node_args": [],
    "args": [],
    "env": {

    }
  }]
}
```
>注意：cwd为项目在服务器上的路径

####启动pm2管理应用
```javascript
pm2 start pm2.json
```
####常用命令
```javascript
pm2 status +项目名或id
pm2 list
pm2 delete +项目名或id
pm2 delete all
```
####服务器配置进阶
nginx服务器配置，请参考根目录下的nginx.conf，把域名和路径改成自己相应的路径。

### 五. 感谢

Liblog的成长需要各位亲们支持！感谢你们使用Liblog，感激你们对Liblog的良好建议与Bug反馈。如果你的博客也是基于Liblog，请告知作者，无偿获取技术指导。

Liblog QQ群：`256687601`  
作者邮箱：`262248861@qq.com`    
演示网站：http://www.jsout.com
