/*
 Navicat Premium Data Transfer

 Source Server         : local_livi
 Source Server Type    : MySQL
 Source Server Version : 50711
 Source Host           : localhost
 Source Database       : liblog

 Target Server Type    : MySQL
 Target Server Version : 50711
 File Encoding         : utf-8

 Date: 05/12/2016 11:25:46 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `li_account`
-- ----------------------------
DROP TABLE IF EXISTS `li_account`;
CREATE TABLE `li_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_account`
-- ----------------------------
BEGIN;
INSERT INTO `li_account` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e');
COMMIT;

-- ----------------------------
--  Table structure for `li_article`
-- ----------------------------
DROP TABLE IF EXISTS `li_article`;
CREATE TABLE `li_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `abstract` text,
  `content` text NOT NULL,
  `picurl` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `view` bigint(20) DEFAULT '1',
  `totop` smallint(6) DEFAULT '0',
  `torecom` smallint(6) DEFAULT '0',
  `topicrecom` smallint(6) DEFAULT '0',
  `tag` int(11) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `allowcomment` int(11) DEFAULT '1',
  `ispublished` int(11) DEFAULT '0',
  `from` varchar(255) DEFAULT NULL,
  `item` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT '0' COMMENT '喜欢',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_article`
-- ----------------------------
BEGIN;
INSERT INTO `li_article` VALUES ('1', '闭包的概念', '                                                                                                                        闭包是JavaScript的一大难点，也是它的特色。利用闭包可以实现许多高级应用。今天我们就一起来讨论一下有关闭包的问题一.闭包的概念 很多语言中都有闭包，概念也不尽相同。就JS闭包的概念也有好多种，下面一种我认为是比较好理解也比较精确的一种。 闭包是指有权访问另一个函数作用域中的变量的函数。 这句话可以分为两步来理解： 1）闭包是函数； 2）这个函数可以访问另一个函数作用域中的变量。 等等，作用域又是什么鬼。。。 第二点翻译一下就是可以访问另一个函数内部定义的变量。下面再解释什么是作用域。\n                    \n                    \n                    \n                    \n                    ', '<div id=\"cnblogs_post_body\" class=\"cnblogs-markdown\"><p>闭包是JavaScript的一大难点，也是它的特色。利用闭包可以实现许多高级应用。今天我们就一起来讨论一下有关闭包的问题。</p>\n<hr>\n<h2 id=\"一.闭包的概念\">一.闭包的概念</h2>\n<p>很多语言中都有闭包，概念也不尽相同。就JS闭包的概念也有好多种，下面一种我认为是比较好理解也比较精确的一种。</p>\n<blockquote>\n<p><strong>闭包是指有权访问另一个函数作用域中的变量的函数。</strong></p>\n</blockquote>\n<p>这句话可以分为两步来理解：<br>\n1）闭包是函数；<br>\n2）这个函数可以访问另一个函数作用域中的变量。</p>\n<p>等等，作用域又是什么鬼。。。</p>\n<p>第二点翻译一下就是可以访问另一个函数内部定义的变量。下面再解释什么是作用域。</p>\n<p>示例代码：</p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">outer</span>(<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-keyword\">var</span> name = <span class=\"hljs-string\">\"Foolgry\"</span>;\n    \n    <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">inner</span>(<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-keyword\">return</span> name;\n    }\n}</code></pre>\n<p>从技术层面来说，上面的<code>inner</code>已经是一个闭包了。<br>\n1）它是一个函数；<br>\n2）它可以访问<code>outer</code>内部定义的变量<code>name</code>。<br>\n但是，大多数人习惯的闭包是下面这个样子的：</p>\n<p>示例代码：</p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">outer</span>(<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-keyword\">var</span> name = <span class=\"hljs-string\">\"Foolgry\"</span>;\n    \n    <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">inner</span>(<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-keyword\">return</span> name;\n    }\n    <span class=\"hljs-keyword\">return</span> inner;\n}\n\n<span class=\"hljs-keyword\">var</span> getName = outer(); \n\ngetName(); <span class=\"hljs-comment\">// \"Foolgry\"</span></code></pre>\n<p>这个<code>inner</code>肯定是闭包，它不仅满足上面的两个条件，还具备一个特征：即使<code>outer</code>运行后被回收，它能够保证<code>name</code>在内存中继续存在。<br>\n每个人都有不同的理解，有的人认为只有第二个例子才算闭包，第一个例子不算。我的理解是都可以算做闭包。</p>\n<p>闭包本身并不难理解，难得是它和<strong>作用域</strong>，<strong>this</strong>等问题放在一起。<br>\n说起闭包，就不得不谈一些基础问题，比如：上面提到的<strong>作用域</strong>。</p>\n<hr>\n<h2 id=\"二.作用域\">二.作用域</h2>\n<p>JS中有两种作用域，全局作用域和局部作用域。</p>\n<p>示例代码：</p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-keyword\">var</span> name = <span class=\"hljs-string\">\"Bob\"</span>,<span class=\"hljs-comment\">//全局作用域下定义的变量（全局变量）</span>\n    age = <span class=\"hljs-number\">99</span>,\n    sex = <span class=\"hljs-string\">\"female\"</span>;\n<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">object</span>(<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-keyword\">var</span> name = <span class=\"hljs-string\">\"Foolgry\"</span>; <span class=\"hljs-comment\">//局部作用域下定义的变量（局部变量）</span>\n    \n    alert(name); <span class=\"hljs-comment\">// \"Foolgry\"</span>\n    alert(age); <span class=\"hljs-comment\">// 99</span>\n    alert(sex); <span class=\"hljs-comment\">// undefined</span>\n    \n    <span class=\"hljs-keyword\">var</span> sex = <span class=\"hljs-string\">\"male\"</span>,\n        job = <span class=\"hljs-string\">\"fe\"</span>\n}\nalert(name);  <span class=\"hljs-comment\">// \"Foolgry\"</span>\nalert(job); <span class=\"hljs-comment\">// error</span></code></pre>\n<ul>\n<li>在<code>object</code>作用域中，name是局部变量，虽然全局环境中也定义了变量name，但是在局部作用域中，会优先访问局部变量；</li>\n<li>如果访问不到，才找全局变量，如age一样；</li>\n<li><p>sex为什么是undefined呢？因为JS中有一种机制叫做变量提升。这东西会把上面几句话变成这样：</p>\n<pre><code class=\"hljs lisp\">var sex<span class=\"hljs-comment\">;</span>\nalert(<span class=\"hljs-name\">sex</span>)<span class=\"hljs-comment\">;</span>\nsex = <span class=\"hljs-string\">\"male\"</span><span class=\"hljs-comment\">;</span></code></pre></li>\n<li><p>访问job发生错误，是因为一般情况下局部变量只能在其函数作用域内部访问，这也是为什么需要闭包了。</p></li>\n</ul>\n<hr>\n<h2 id=\"三.闭包应用\">三.闭包应用</h2>\n<p>闭包的应用有很多，这里只列举其中两种：</p>\n<ul>\n<li>模块化代码，减少全局变量的污染</li>\n<li>私有成员的存在</li>\n</ul>\n<hr>\n<h2 id=\"四.闭包需要注意的问题\">四.闭包需要注意的问题</h2>\n<p>1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。</p>\n<p>2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。</p>\n<hr>\n<h2 id=\"五.闭包经典例子\">五.闭包经典例子</h2>\n<pre><code class=\"hljs fsharp\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-keyword\">fun</span>(n,o) {\n    console.log(o);\n        <span class=\"hljs-keyword\">return</span> {\n            <span class=\"hljs-keyword\">fun</span>:<span class=\"hljs-keyword\">function</span>(m) {\n                <span class=\"hljs-keyword\">return</span> <span class=\"hljs-keyword\">fun</span>(m,n);\n            }\n        };\n}\nvar a = <span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">0</span>); a.<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">1</span>);  a.<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">2</span>);  a.<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">3</span>);  \nvar b = <span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">0</span>).<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">1</span>).<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">2</span>).<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">3</span>);\nvar c = <span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">0</span>).<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">1</span>);  c.<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">2</span>);  c.<span class=\"hljs-keyword\">fun</span>(<span class=\"hljs-number\">3</span>);</code></pre>\n<p>问:三行a,b,c的输出分别是什么？</p>\n<p>这个例子如果你能全部答对，那么JS闭包就没什么问题了。</p>\n<pre><code class=\"hljs javascript\"><span class=\"hljs-literal\">undefined</span>,<span class=\"hljs-number\">0</span>,<span class=\"hljs-number\">0</span>,<span class=\"hljs-number\">0</span>\n<span class=\"hljs-literal\">undefined</span>,<span class=\"hljs-number\">0</span>,<span class=\"hljs-number\">1</span>,<span class=\"hljs-number\">2</span>\n<span class=\"hljs-literal\">undefined</span>,<span class=\"hljs-number\">0</span>,<span class=\"hljs-number\">1</span>,<span class=\"hljs-number\">1</span></code></pre>\n<p>下一篇文章讨论一下这题解法。</p>\n</div>                   \n                    <p><br></p>', '/static/upload/pics/2016/03/31NNWyRdHpCZtRrxj9bP34p46D.jpg', 'admin', '2016-04-15 00:00:00', '179', '1', '0', '0', '1', '前端,html', '1', '1', '', '0', '0'), ('61', 'thinkjs开启CSRF及使用示例教程', '                                                CSRF（Cross-site request forgery跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用...通俗地讲：就是防止批量、重复地模拟表单提交，达到恶人的目的。所有项目，考虑安全问题，最好所有提交请求都加一下。某公司因为注册时候的短信验证码请求时未加，导致被人利用发送好几万条短信…\n                    \n                    ', '<div class=\"content markitup-box\">\n								<strong>什么是CSRF?</strong><br>\n<br>\nCSRF（Cross-site request forgery跨站请求伪造，也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。。。。详见百度<br>\n<br>\n通俗地讲：就是防止批量、重复地模拟表单提交，达到恶人的目的。所有项目，考虑安全问题，最好所有提交请求都加一下。某公司因为注册时候的短信验证码请求时未加，导致被人利用发送好几万条短信…<br>\n<br>\n<strong>thinkjs如何配置？</strong><br>\n<br>\n贴上官方文档提供的配置代码：<br>\n<br>\n开启 CSRF<br>\n配置 hook 文件 src/common/config/hook.js，添加如下的配置：<pre>export default {<br>\n  logic_before: <span>[</span>\"prepend\", \"csrf\"]<br>\n}</pre>CSRF 默认的配置如下，可以在配置文件 src/common/config/csrf.js 中修改： (在 src/common/config下新建csrf.js文件贴上代码)<pre>export default {<br>\n  session_name: \"__CSRF__\", // Token 值存在 session 的名字<br>\n  form_name: \"__CSRF__\", // CSRF 字段名字，从该字段获取值校验<br>\n  errno: 400, //错误号<br>\n  errmsg: \"token error\" // 错误信息<br>\n};</pre>如此，thinkjs端的配置完成了，注意两个配置项：session_name: \"__CSRF__\",和form_name: \"__CSRF__\"。&nbsp;<br>\n&nbsp;<br>\n<strong>应用场景：</strong>&nbsp;<br>\n&nbsp;<br>\n假如后台登录需要添加csrf: 在controller/login.js的session里获取csrf值,并assign到前台页面<pre>async indexAction(){<br>\n      this.assign(\"title\",\"管理员登陆\")<br>\n      let csrf=await this.session(\"__CSRF__\");<br>\n      this.assign(\"csrf\",csrf);<br>\n      //判断是否登陆<br>\n            let data=await this.session(\'userInfo\');<br>\n            if(think.isEmpty(data)){<br>\n                  return  this.display();<br>\n                }else{<br>\n                  return  this.redirect(\"/admin/index\");<br>\n            }<br>\n       //判断是否登陆 <br>\n  }</pre>这样前台页面就能获取到__CSRF__的值了 在前台login.html页面里可以弄个隐藏域来放CSRF值<pre> &lt;form&gt;<br>\n   &lt;div class=\"form-group\"&gt;<br>\n	&lt;label for=\"username\"&gt;用户名&lt;/label&gt;<br>\n    &lt;input type=\"text\" class=\"form-control\" id=\"username\" placeholder=\"用户名\"&gt;<br>\n   &lt;input type=\"hidden\" id=\"csrf\" value=\"&lt;%=csrf%&gt;\"&gt;<br>\n &lt;/div&gt;<br>\n&lt;/form&gt;</pre>然后在前台表单提交的时候，传输的数据添加__CSRF__参数<pre>$(\"#loginBtn\").on(\'click\', function () {<br>\n    $.ajax(<br>\n    {<br>\n        url: \'/login/dologin\',<br>\n <br>\n        data: {<br>\n            username: $(\"#username\").val(),<br>\n            password: $(\"#password\").val(),<br>\n            __CSRF__: $(\"#csrf\").val()<br>\n        },<br>\n        type: \'POST\',<br>\n        success: function (json) {<br>\n <br>\n            if (json.errno === 0) {<br>\n <br>\n                alert(json.errmsg);<br>\n <br>\n                window.location.href = \"/admin/index\";<br>\n            } else {<br>\n                alert(json.errmsg);<br>\n            }<br>\n        }<br>\n    }<br>\n    )<br>\n})</pre>如此，CSRF的简单应用就完成了。&nbsp;<br>\n&nbsp;<br>\n<strong>进阶用法：</strong><br>\n&nbsp;<br>\n可以考虑在controller/base.js里统一assign系统的CSRF值，这样所有页面都有了。CSRF值写在前台的公用头部的meta标签里，其他页面&lt;%include inc/header.html%&gt;，然后表单提交的时候获取一下并提交CSRF值。（个人想法）<pre>&lt;meta name=\"csrf-token\" content=\"&lt;%=csrf%&gt;\"&gt;</pre>或者<br>\n<pre>    &lt;script&gt;<br>\n        var G_csrf=\"&lt;%=csrf%&gt;\";<br>\n    &lt;/script&gt;</pre><br>\n<strong>注意事项</strong>：<br>\n&nbsp; &nbsp; &nbsp; &nbsp; 前面启用CSRF后，所有的表单提交都要有CSRF参数的提交，不然就会报错\" token error&nbsp;\"。所以系统开发完之后启用CSRF的同学，需要所有的表单提交都要添加CSRF参数值。\n															</div>                   \n                    <p><br></p>', '', 'admin', '2016-04-15 00:00:00', '36', '1', '1', '1', '1', '', '1', '0', null, '0', '0'), ('62', '闭包的概念', '                                                                                                                                                                        闭包是JavaScript的一大难点，也是它的特色。利用闭包可以实现许多高级应用。今天我们就一起来讨论一下有关闭包的问题一.闭包的概念 很多语言中都有闭包，概念也不尽相同。就JS闭包的概念也有好多种，下面一种我认为是比较好理解也比较精确的一种。 闭包是指有权访问另一个函数作用域中的变量的函数。 \n                    \n                    \n                    \n                    \n                    \n                    \n                    ', '<p><br></p>', '/static/upload/pics/2016/03/31DBwvKIKc9RhqZ2k_q4hHQk_6.jpg', 'admin', '2016-04-15 00:00:00', '12', '1', '0', '1', '2', '', '1', '0', null, '0', '0'), ('73', 'ockchou', 'ss', '<p><br></p><p><!--\n{\n    \"author\":\"ockchou\",\n    \"head\":\"http://pingodata.qiniudn.com/jockchou-avatar.jpg\"\n}\n-->\n</p>\n<h2 id=\"-\">一. 简介</h2>\n<p>GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。GitBlog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。GitBlog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。</p>\n<h2 id=\"-\">二. 功能特点</h2>\n<ol>\n<li>使用Markdown  </li>\n<li>评论框  </li>\n<li>代码高亮  </li>\n<li>PV统计  </li>\n<li>Latex数学公式  </li>\n<li>自制主题  </li>\n<li>响应式  </li>\n<li>全站静态导出  </li>\n<li>良好的SEO  </li>\n</ol>\n<h2 id=\"-gitblog-\">三. GitBlog优势</h2>\n<ol>\n<li>无需数据库，系统更轻量，移植更方便  </li>\n<li>使用Markdown编写，摆脱后台编辑排版困难，无法实时预览的缺点  </li>\n<li>可全站静态导出  </li>\n<li>配置灵活，可自由开关某些功能  </li>\n<li>多主题支持，可自制主题  </li>\n<li>博客，分类，标签，归档  </li>\n</ol>\n<h2 id=\"-\">四. 环境要求</h2>\n<p>PHP 5.2.4+</p>\n<h2 id=\"-\">五. 安装步骤</h2>\n<ol>\n<li>下载GitBlog源代码  </li>\n<li>解压上传到你的PHP网站根目录  </li>\n<li>打开浏览器，访问网站首页  </li>\n<li>上传Markdown文件到<code>posts</code>文件夹  </li>\n</ol>\n<h2 id=\"-\">六. 详细说明</h2>\n<p><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/install.html\">1. 安装</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html\">2. 目录结构</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/config.html\">3. 配置说明</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html\">4. 编写博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/other-func.html\">5. 评论，订阅，统计等</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/cache.html\">6. 缓存机制</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/export.html\">7. 全站静态导出</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/theme.html\">8. 主题制作</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/nginx.html\">9. 在Nginx上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/apache.html\">10. 在Apache上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/sae.html\">11. 在SAE上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/github-pages.html\">12. 使用GitBlog和Github Pages搭建博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/update.html\">13. Gitblog升级</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/wordpress.html\">14. 从wordpress导入</a></p>\n<h2 id=\"-bug-\">七. 问题及bug反馈</h2>\n<p>如果在实际使用过程中对GitBlog有新的功能需求，或者在使用GitBlog的过程中发现了Bug，欢迎反馈给我。可以直接在Github上提交，也可以发邮件至<code>164068300[AT]qq.com</code>与我取得联系，我将及时回复。如果你自己制作了漂亮好用的主题，也非常欢迎你提交给我，我会在这里展示你的主题链接。如果你正在使用GitBlog，也可以告诉我，我将也会在这里列出使用者名单。如果你想和其他GitBlog使用者讨论交流，欢迎加入QQ群<code>84692078</code>。</p>\n<h2 id=\"-\">八. 使用者列表</h2>\n<ul>\n<li><a href=\"http://blog.hiweeds.net\">Weeds</a></li>\n<li><a href=\"http://xiaochengzi.sinaapp.com\">橙子</a></li>\n<li><a href=\"http://jockchou.gitblog.cn\">jockchou</a></li>\n<li><a href=\"http://gitblogdoc.sinaapp.com\">GitBlog Doc</a></li>\n<li><a href=\"http://zxy.link\">zxy</a>  </li>\n</ul>\n<h2 id=\"-\">九. 感谢</h2>\n<p>GitBlog的成长需要喜欢Markdown，喜欢写博客的各位亲们支持！感谢你们使用GitBlog，感激你们对Gitblog的良好建议与Bug反馈。</p>\n<p>QQ群：<code>84692078</code><br>作者邮箱：<code>164068300[AT]qq.com</code>    </p>\n<p></p>', '', 'admin', '2016-04-05 00:00:00', '1', '0', '0', '0', null, null, '1', '0', null, null, '0'), ('121', '再试一次', 'welcome to livi\'s blog', '<p><!-- {\n    \"title\":\"welcome\",\n    \"abstract\":\"welcome to livi&#39; blog\",\n    \"keywords\":\"thinksj,nodejs\",\n    \"thumbnail\":\"http://pingodata.qiniudn.com/jockchou-avatar.jpg\",\n    \"author\":\"livi\",\n    \"totop\":1,\n    \"torecom\":0,\n    \"topicrecom\":1\n} -->\n</p>\n<h2 id=\"-\">一. 简介</h2>\n<p>GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。GitBlog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。GitBlog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。</p>\n<h2 id=\"-\">二. 功能特点</h2>\n<ol>\n<li>使用Markdown  </li>\n<li>评论框  </li>\n<li>代码高亮  </li>\n<li>PV统计  </li>\n<li>Latex数学公式  </li>\n<li>自制主题  </li>\n<li>响应式  </li>\n<li>全站静态导出  </li>\n<li>良好的SEO  </li>\n</ol>\n<h2 id=\"-gitblog-\">三. GitBlog优势</h2>\n<ol>\n<li>无需数据库，系统更轻量，移植更方便  </li>\n<li>使用Markdown编写，摆脱后台编辑排版困难，无法实时预览的缺点  </li>\n<li>可全站静态导出  </li>\n<li>配置灵活，可自由开关某些功能  </li>\n<li>多主题支持，可自制主题  </li>\n<li>博客，分类，标签，归档  </li>\n</ol>\n<h2 id=\"-\">四. 环境要求</h2>\n<p>PHP 5.2.4+</p>\n<h2 id=\"-\">五. 安装步骤</h2>\n<ol>\n<li>下载GitBlog源代码  </li>\n<li>解压上传到你的PHP网站根目录  </li>\n<li>打开浏览器，访问网站首页  </li>\n<li>上传Markdown文件到<code>posts</code>文件夹  </li>\n</ol>\n<h2 id=\"-\">六. 详细说明</h2>\n<p><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/install.html\">1. 安装</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html\">2. 目录结构</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/config.html\">3. 配置说明</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html\">4. 编写博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/other-func.html\">5. 评论，订阅，统计等</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/cache.html\">6. 缓存机制</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/export.html\">7. 全站静态导出</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/theme.html\">8. 主题制作</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/nginx.html\">9. 在Nginx上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/apache.html\">10. 在Apache上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/sae.html\">11. 在SAE上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/github-pages.html\">12. 使用GitBlog和Github Pages搭建博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/update.html\">13. Gitblog升级</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/wordpress.html\">14. 从wordpress导入</a></p>\n<h2 id=\"-bug-\">七. 问题及bug反馈</h2>\n<p>如果在实际使用过程中对GitBlog有新的功能需求，或者在使用GitBlog的过程中发现了Bug，欢迎反馈给我。可以直接在Github上提交，也可以发邮件至<code>164068300[AT]qq.com</code>与我取得联系，我将及时回复。如果你自己制作了漂亮好用的主题，也非常欢迎你提交给我，我会在这里展示你的主题链接。如果你正在使用GitBlog，也可以告诉我，我将也会在这里列出使用者名单。如果你想和其他GitBlog使用者讨论交流，欢迎加入QQ群<code>84692078</code>。</p>\n<h2 id=\"-\">八. 使用者列表</h2>\n<ul>\n<li><a href=\"http://blog.hiweeds.net\">Weeds</a></li>\n<li><a href=\"http://xiaochengzi.sinaapp.com\">橙子</a></li>\n<li><a href=\"http://jockchou.gitblog.cn\">jockchou</a></li>\n<li><a href=\"http://gitblogdoc.sinaapp.com\">GitBlog Doc</a></li>\n<li><a href=\"http://zxy.link\">zxy</a>  </li>\n</ul>\n<h2 id=\"-\">九. 感谢</h2>\n<p>GitBlog的成长需要喜欢Markdown，喜欢写博客的各位亲们支持！感谢你们使用GitBlog，感激你们对Gitblog的良好建议与Bug反馈。</p>\n<p>QQ群：<code>84692078</code><br>作者邮箱：<code>164068300[AT]qq.com</code>    </p>\n<p></p>', '', 'livi', '2016-04-19 00:00:00', '8', '1', '0', '1', '2', 'thinksj,nodejs', '1', '1', null, '2', '0'), ('77', 'thinkjs配置邮件发送', 'thinkjs配置邮件发送', '<p>﻿# thinkjs配置邮件</p>\n<p>标签（空格分隔）： 教程,thinkjs</p>\n<hr>\n<p>####安装nodemailer模块</p>\n<pre><code>npm install nodemailer@0.7.1 --save\n</code></pre><blockquote>\n<p>注意1：nodejs默认安装最新的nodemailer版本，如果版本和nodejs版本不匹配则会提示你下降版本，本例的适配版本是0.7.1</p>\n<p>####邮件账号配置<br>在src/common/config/下新建mail.js,配置代码如下：</p>\n<pre><code class=\"lang-javascript\">export default {\n  //发送邮件配置\n  host:\"smtp.qq.com\",\n  port: 465,\n  domains:\'[\"qq.com\"]\',\n  account:\'262248861@qq.com\',\n  pass: \"XXXXXXXX\",\n  from:\"262248861@qq.com\",\n  route_on: true,\n  encoding: \"utf-8\"\n};\n</code></pre>\n<p>注意2:QQ邮箱的密码不是你的登录密码，而是在设置/账户里开启SMTP后腾讯给出的一串第三方登录密码<br>新建mail控制器，在controller里配置：</p>\n<pre><code class=\"lang-javascript\">var nodemailer  = require(\"nodemailer\");\nlet mailer=think.config(\"mail\");\nvar smtpTransport = nodemailer.createTransport(\"SMTP\", {\n    host: mailer.host,\n    secureConnection: true,\n    port: mailer.port,\n    requiresAuth: true,\n    domains: mailer.domains,\n    auth: {\n        user: mailer.account, // 账号\n        pass: mailer.pass // 密码\n    }\n});\nsmtpTransport.sendMail({\n    from: mailer.account,\n      to: \"390039626@qq.com,livisky@163.com\", // 收件列表\n subject: \'Node.JS通过SMTP协议从QQ邮箱发送邮件\',\n    html: \'have a try!\'\n},function(err, res) {\n    console.log(err, res);\n});\n</code></pre>\n</blockquote>\n<p>刷新页面，即可完成邮件的发送。</p>\n<p>在前台页面,controller方法里可以是一个连接，当前台点击此连接时(发送邮件)，自动发送邮件</p>\n<p>####常见问题<br>1、Invalid login - 535 Authentication failed<br>此项为密码错误，详见注意2<br>2、454 Authentication failed, please open smtp flag first!\'<br>请在QQ邮箱 -&gt; 设置 -&gt; 帐户 -&gt; 开启服务：POP3/SMTP服务</p>', '', 'admin', '2016-04-09 00:00:00', '2', '1', '0', '0', null, null, '1', '0', null, null, '0'), ('78', '测试哦', '按时大大', '<p>按时打算的</p>', '', 'livi', '2016-04-14 00:00:00', '1', '1', '0', '0', '2', null, '1', '0', null, null, '0'), ('79', '试试看哦', '试试看哦', '<p>v奥神队</p>', '', 'livi', '2016-04-14 00:00:00', '1', '1', '0', '0', '1', '来源，节流', '1', '1', null, '1', '0'), ('87', '编辑一下22', '                                                \n                 ADS   \n                    ', '<p>阿达第三方</p>\n                    <p><br></p>', '', 'livi', '2016-04-15 00:00:00', '3', '1', '1', '0', '3', 'aa', '1', '0', null, '0', '0'), ('117', 'welcome', 'welcome to livi\'s blog', '<p><!-- {\n    \"title\":\"welcome\",\n    \"abstract\":\"welcome to livi&#39; blog\",\n    \"keywords\":\"thinksj,nodejs\",\n    \"thumbnail\":\"http://pingodata.qiniudn.com/jockchou-avatar.jpg\",\n    \"author\":\"livi\",\n    \"totop\":1,\n    \"torecom\":0,\n    \"topicrecom\":1\n} -->\n</p>\n<h2 id=\"-\">一. 简介</h2>\n<p>GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。GitBlog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。GitBlog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。</p>\n<h2 id=\"-\">二. 功能特点</h2>\n<ol>\n<li>使用Markdown  </li>\n<li>评论框  </li>\n<li>代码高亮  </li>\n<li>PV统计  </li>\n<li>Latex数学公式  </li>\n<li>自制主题  </li>\n<li>响应式  </li>\n<li>全站静态导出  </li>\n<li>良好的SEO  </li>\n</ol>\n<h2 id=\"-gitblog-\">三. GitBlog优势</h2>\n<ol>\n<li>无需数据库，系统更轻量，移植更方便  </li>\n<li>使用Markdown编写，摆脱后台编辑排版困难，无法实时预览的缺点  </li>\n<li>可全站静态导出  </li>\n<li>配置灵活，可自由开关某些功能  </li>\n<li>多主题支持，可自制主题  </li>\n<li>博客，分类，标签，归档  </li>\n</ol>\n<h2 id=\"-\">四. 环境要求</h2>\n<p>PHP 5.2.4+</p>\n<h2 id=\"-\">五. 安装步骤</h2>\n<ol>\n<li>下载GitBlog源代码  </li>\n<li>解压上传到你的PHP网站根目录  </li>\n<li>打开浏览器，访问网站首页  </li>\n<li>上传Markdown文件到<code>posts</code>文件夹  </li>\n</ol>\n<h2 id=\"-\">六. 详细说明</h2>\n<p><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/install.html\">1. 安装</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html\">2. 目录结构</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/config.html\">3. 配置说明</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html\">4. 编写博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/other-func.html\">5. 评论，订阅，统计等</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/cache.html\">6. 缓存机制</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/export.html\">7. 全站静态导出</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/theme.html\">8. 主题制作</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/nginx.html\">9. 在Nginx上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/apache.html\">10. 在Apache上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/sae.html\">11. 在SAE上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/github-pages.html\">12. 使用GitBlog和Github Pages搭建博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/update.html\">13. Gitblog升级</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/wordpress.html\">14. 从wordpress导入</a></p>\n<h2 id=\"-bug-\">七. 问题及bug反馈</h2>\n<p>如果在实际使用过程中对GitBlog有新的功能需求，或者在使用GitBlog的过程中发现了Bug，欢迎反馈给我。可以直接在Github上提交，也可以发邮件至<code>164068300[AT]qq.com</code>与我取得联系，我将及时回复。如果你自己制作了漂亮好用的主题，也非常欢迎你提交给我，我会在这里展示你的主题链接。如果你正在使用GitBlog，也可以告诉我，我将也会在这里列出使用者名单。如果你想和其他GitBlog使用者讨论交流，欢迎加入QQ群<code>84692078</code>。</p>\n<h2 id=\"-\">八. 使用者列表</h2>\n<ul>\n<li><a href=\"http://blog.hiweeds.net\">Weeds</a></li>\n<li><a href=\"http://xiaochengzi.sinaapp.com\">橙子</a></li>\n<li><a href=\"http://jockchou.gitblog.cn\">jockchou</a></li>\n<li><a href=\"http://gitblogdoc.sinaapp.com\">GitBlog Doc</a></li>\n<li><a href=\"http://zxy.link\">zxy</a>  </li>\n</ul>\n<h2 id=\"-\">九. 感谢</h2>\n<p>GitBlog的成长需要喜欢Markdown，喜欢写博客的各位亲们支持！感谢你们使用GitBlog，感激你们对Gitblog的良好建议与Bug反馈。</p>\n<p>QQ群：<code>84692078</code><br>作者邮箱：<code>164068300[AT]qq.com</code>    </p>\n<p></p>', '', 'livi', '2016-04-19 00:00:00', '383', '1', '0', '1', '0', 'thinksj,nodejs', '1', '1', null, '0', '0'), ('118', 'welcome_bbasm', '                                                welcome to livi\'s blog\n                    \n                    ', '<p><!-- {\n    \"title\":\"welcome\",\n    \"abstract\":\"welcome to livi&#39; blog\",\n    \"keywords\":\"thinksj,nodejs\",\n    \"thumbnail\":\"http://pingodata.qiniudn.com/jockchou-avatar.jpg\",\n    \"author\":\"livi\",\n    \"totop\":1,\n    \"torecom\":0,\n    \"topicrecom\":1\n} -->\n</p>\n<h2 id=\"-\">一. 简介</h2>\n<p>GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。GitBlog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。GitBlog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。</p>\n<h2 id=\"-\">二. 功能特点</h2>\n<ol>\n<li>使用Markdown  </li>\n<li>评论框  </li>\n<li>代码高亮  </li>\n<li>PV统计  </li>\n<li>Latex数学公式  </li>\n<li>自制主题  </li>\n<li>响应式  </li>\n<li>全站静态导出  </li>\n<li>良好的SEO  </li>\n</ol>\n<h2 id=\"-gitblog-\">三. GitBlog优势</h2>\n<ol>\n<li>无需数据库，系统更轻量，移植更方便  </li>\n<li>使用Markdown编写，摆脱后台编辑排版困难，无法实时预览的缺点  </li>\n<li>可全站静态导出  </li>\n<li>配置灵活，可自由开关某些功能  </li>\n<li>多主题支持，可自制主题  </li>\n<li>博客，分类，标签，归档  </li>\n</ol>\n<h2 id=\"-\">四. 环境要求</h2>\n<p>PHP 5.2.4+</p>\n<h2 id=\"-\">五. 安装步骤</h2>\n<ol>\n<li>下载GitBlog源代码  </li>\n<li>解压上传到你的PHP网站根目录  </li>\n<li>打开浏览器，访问网站首页  </li>\n<li>上传Markdown文件到<code>posts</code>文件夹  </li>\n</ol>\n<h2 id=\"-\">六. 详细说明</h2>\n<p><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/install.html\">1. 安装</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html\">2. 目录结构</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/config.html\">3. 配置说明</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html\">4. 编写博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/other-func.html\">5. 评论，订阅，统计等</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/cache.html\">6. 缓存机制</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/export.html\">7. 全站静态导出</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/theme.html\">8. 主题制作</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/nginx.html\">9. 在Nginx上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/apache.html\">10. 在Apache上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/sae.html\">11. 在SAE上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/github-pages.html\">12. 使用GitBlog和Github Pages搭建博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/update.html\">13. Gitblog升级</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/wordpress.html\">14. 从wordpress导入</a></p>\n<h2 id=\"-bug-\">七. 问题及bug反馈</h2>\n<p>如果在实际使用过程中对GitBlog有新的功能需求，或者在使用GitBlog的过程中发现了Bug，欢迎反馈给我。可以直接在Github上提交，也可以发邮件至<code>164068300[AT]qq.com</code>与我取得联系，我将及时回复。如果你自己制作了漂亮好用的主题，也非常欢迎你提交给我，我会在这里展示你的主题链接。如果你正在使用GitBlog，也可以告诉我，我将也会在这里列出使用者名单。如果你想和其他GitBlog使用者讨论交流，欢迎加入QQ群<code>84692078</code>。</p>\n<h2 id=\"-\">八. 使用者列表</h2>\n<ul>\n<li><a href=\"http://blog.hiweeds.net\">Weeds</a></li>\n<li><a href=\"http://xiaochengzi.sinaapp.com\">橙子</a></li>\n<li><a href=\"http://jockchou.gitblog.cn\">jockchou</a></li>\n<li><a href=\"http://gitblogdoc.sinaapp.com\">GitBlog Doc</a></li>\n<li><a href=\"http://zxy.link\">zxy</a>  </li>\n</ul>\n<h2 id=\"-\">九. 感谢</h2>\n<p>GitBlog的成长需要喜欢Markdown，喜欢写博客的各位亲们支持！感谢你们使用GitBlog，感激你们对Gitblog的良好建议与Bug反馈。</p>\n<p>QQ群：<code>84692078</code><br>作者邮箱：<code>164068300[AT]qq.com</code>    </p>\n<p></p>\n                    <p><br></p>', '/static/common/images/common/default.jpg', 'livi', '2016-04-19 00:00:00', '9', '1', '0', '1', '1', 'thinksj,nodejs', '1', '1', '', '1', '0'), ('122', 'sska', 'welcome to livi\'s blog', '<p><!-- {\n    \"title\":\"welcome\",\n    \"abstract\":\"welcome to livi&#39; blog\",\n    \"keywords\":\"thinksj,nodejs\",\n    \"thumbnail\":\"http://pingodata.qiniudn.com/jockchou-avatar.jpg\",\n    \"author\":\"livi\",\n    \"totop\":1,\n    \"torecom\":0,\n    \"topicrecom\":1\n} -->\n</p>\n<h2 id=\"-\">一. 简介</h2>\n<p>GitBlog是一个简单易用的Markdown博客系统，它不需要数据库，没有管理后台功能，更新博客只需要添加你写好的Markdown文件即可。它摆脱了在线编辑器排版困难，无法实时预览的缺点，一切都交给Markdown来完成，一篇博客就是一个Markdown文件。同时也支持评论，代码高亮，数学公式，页面PV统计等常用功能。GitBlog提供了不同的主题样式，你可以根据自己的喜好配置，如果你想自己制作博客主题，也是非常容易的。GitBlog还支持整站静态导出，你完全可以导出整站静态网页部署到Github Pages。</p>\n<h2 id=\"-\">二. 功能特点</h2>\n<ol>\n<li>使用Markdown  </li>\n<li>评论框  </li>\n<li>代码高亮  </li>\n<li>PV统计  </li>\n<li>Latex数学公式  </li>\n<li>自制主题  </li>\n<li>响应式  </li>\n<li>全站静态导出  </li>\n<li>良好的SEO  </li>\n</ol>\n<h2 id=\"-gitblog-\">三. GitBlog优势</h2>\n<ol>\n<li>无需数据库，系统更轻量，移植更方便  </li>\n<li>使用Markdown编写，摆脱后台编辑排版困难，无法实时预览的缺点  </li>\n<li>可全站静态导出  </li>\n<li>配置灵活，可自由开关某些功能  </li>\n<li>多主题支持，可自制主题  </li>\n<li>博客，分类，标签，归档  </li>\n</ol>\n<h2 id=\"-\">四. 环境要求</h2>\n<p>PHP 5.2.4+</p>\n<h2 id=\"-\">五. 安装步骤</h2>\n<ol>\n<li>下载GitBlog源代码  </li>\n<li>解压上传到你的PHP网站根目录  </li>\n<li>打开浏览器，访问网站首页  </li>\n<li>上传Markdown文件到<code>posts</code>文件夹  </li>\n</ol>\n<h2 id=\"-\">六. 详细说明</h2>\n<p><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/install.html\">1. 安装</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/struct.html\">2. 目录结构</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/config.html\">3. 配置说明</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/edit.html\">4. 编写博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/other-func.html\">5. 评论，订阅，统计等</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/cache.html\">6. 缓存机制</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/export.html\">7. 全站静态导出</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/theme.html\">8. 主题制作</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/nginx.html\">9. 在Nginx上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/apache.html\">10. 在Apache上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/sae.html\">11. 在SAE上运行GitBlog</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/github-pages.html\">12. 使用GitBlog和Github Pages搭建博客</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/update.html\">13. Gitblog升级</a><br><a href=\"http://gitblogdoc.sinaapp.com/blog/gitblog/wordpress.html\">14. 从wordpress导入</a></p>\n<h2 id=\"-bug-\">七. 问题及bug反馈</h2>\n<p>如果在实际使用过程中对GitBlog有新的功能需求，或者在使用GitBlog的过程中发现了Bug，欢迎反馈给我。可以直接在Github上提交，也可以发邮件至<code>164068300[AT]qq.com</code>与我取得联系，我将及时回复。如果你自己制作了漂亮好用的主题，也非常欢迎你提交给我，我会在这里展示你的主题链接。如果你正在使用GitBlog，也可以告诉我，我将也会在这里列出使用者名单。如果你想和其他GitBlog使用者讨论交流，欢迎加入QQ群<code>84692078</code>。</p>\n<h2 id=\"-\">八. 使用者列表</h2>\n<ul>\n<li><a href=\"http://blog.hiweeds.net\">Weeds</a></li>\n<li><a href=\"http://xiaochengzi.sinaapp.com\">橙子</a></li>\n<li><a href=\"http://jockchou.gitblog.cn\">jockchou</a></li>\n<li><a href=\"http://gitblogdoc.sinaapp.com\">GitBlog Doc</a></li>\n<li><a href=\"http://zxy.link\">zxy</a>  </li>\n</ul>\n<h2 id=\"-\">九. 感谢</h2>\n<p>GitBlog的成长需要喜欢Markdown，喜欢写博客的各位亲们支持！感谢你们使用GitBlog，感激你们对Gitblog的良好建议与Bug反馈。</p>\n<p>QQ群：<code>84692078</code><br>作者邮箱：<code>164068300[AT]qq.com</code>    </p>\n<p></p>', '', 'livi', '2016-05-10 00:26:02', '7', '1', '0', '1', '1', 'thinksj,nodejs', '1', '1', null, '1', '0');
COMMIT;

-- ----------------------------
--  Table structure for `li_comment`
-- ----------------------------
DROP TABLE IF EXISTS `li_comment`;
CREATE TABLE `li_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL COMMENT '文章id',
  `author` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `qq` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `belongid` int(11) DEFAULT '0' COMMENT '回复的评论id',
  `dig` int(11) DEFAULT '0',
  `tipoff` int(11) DEFAULT '0' COMMENT '举报',
  `createtime` datetime DEFAULT NULL,
  `pic` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `li_comment`
-- ----------------------------
BEGIN;
INSERT INTO `li_comment` VALUES ('2', '117', 'livi', 'li@163.com', '32134', '<span class=\"at\">@sunbin</span>可以啊', '1', '1', '0', '2016-05-09 16:14:58', ''), ('6', '117', 'livi', 'livisky@163.com', null, '<span class=\"at\">@nill</span>asdad', '4', '1', '1', '2016-05-08 00:00:00', ''), ('7', '117', 'junnan', 'assd', null, '<span class=\"at\">@nill</span>ssaaaa', '4', '1', '0', '2016-05-09 23:38:41', '');
COMMIT;

-- ----------------------------
--  Table structure for `li_guest`
-- ----------------------------
DROP TABLE IF EXISTS `li_guest`;
CREATE TABLE `li_guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contact` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `guest` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Table structure for `li_item`
-- ----------------------------
DROP TABLE IF EXISTS `li_item`;
CREATE TABLE `li_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_item`
-- ----------------------------
BEGIN;
INSERT INTO `li_item` VALUES ('1', '文章'), ('2', '资讯'), ('3', '问答');
COMMIT;

-- ----------------------------
--  Table structure for `li_links`
-- ----------------------------
DROP TABLE IF EXISTS `li_links`;
CREATE TABLE `li_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `link` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `qq` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `notice` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
--  Records of `li_links`
-- ----------------------------
BEGIN;
INSERT INTO `li_links` VALUES ('1', 'test', 'test', 'test', 'test', null), ('3', 'yii-china', 'www.yii-china.com', '', '26224861', null);
COMMIT;

-- ----------------------------
--  Table structure for `li_system`
-- ----------------------------
DROP TABLE IF EXISTS `li_system`;
CREATE TABLE `li_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sitename` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `copyright` varchar(255) DEFAULT NULL,
  `links` text,
  `allowcomment` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_system`
-- ----------------------------
BEGIN;
INSERT INTO `li_system` VALUES ('1', '前端汇—做一头与时俱进的前端开发攻城狮_jsout_前端汇,liblog,你out了吗', 'http://localhost:8361/', '前端汇,liblog,thinkjs,nodejs,前端开发', '前端汇，汇集前端最新技术博文，以原创为主', '阿华田', '@2015 copyright', '<li><a href=\"http://www.jsout.com\">前端汇</a></li>\n<li><a href=\"http://www.jsout.com\">前端汇</a></li>\n<li><a href=\"http://www.jsout.com\">前端汇</a></li>', '1');
COMMIT;

-- ----------------------------
--  Table structure for `li_tags`
-- ----------------------------
DROP TABLE IF EXISTS `li_tags`;
CREATE TABLE `li_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_tags`
-- ----------------------------
BEGIN;
INSERT INTO `li_tags` VALUES ('1', 'web开发'), ('2', 'thinkjs'), ('3', 'nodejs'), ('4', 'jquery'), ('5', 'css3'), ('6', 'css3+html5'), ('7', 'javascript'), ('8', 'html'), ('9', '前端设计'), ('10', 'fis'), ('11', 'grunt'), ('12', 'vscode');
COMMIT;

-- ----------------------------
--  Table structure for `li_user`
-- ----------------------------
DROP TABLE IF EXISTS `li_user`;
CREATE TABLE `li_user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `password` int(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `li_user`
-- ----------------------------
BEGIN;
INSERT INTO `li_user` VALUES ('51', 'bbb', '12', null), ('50', 'ASD', '11', null), ('43', 'livisky', '112', null), ('45', 'aaa', '1', null);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
