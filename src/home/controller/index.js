'use strict';

import Base from './base.js';
import Create from './sitemap.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */

  // 首页
  async indexAction(){

      let setting=await this.model('home').findOne('system_comment');
      this.assign("setting",setting);

      return this.displayView('index_index');
  }

  //文章页
  async pageAction(){
      let aid= await this.get("aid");
      let blogInfo=await this.model("home").findOne('article',{id:aid});
      if(blogInfo.ispublished===1){
          // 设置浏览量加1
          let viewcount=await this.model("home").addViewCount({id:aid});
          //获取标签名
          let tagItem=await this.model("home").findOne("tags",{id:blogInfo.tag});
          this.assign('blogInfo',blogInfo);
          //设置文章分页
          let html=blogInfo.content;
          let strArray=[],particle='',ainfo='';
          let pid=this.get('pid');
          if(html){
              if(html.indexOf("<!--page-->")>0){
                  strArray=html.split("<!--page-->");
                  if(pid){
                      let id=pid*1-1;
                      particle=strArray[id];
                  }else{
                      pid=1;
                      particle=strArray[0];
                  }
              }
          }
          //关联文章
          let relatearticle=await this.model("home").getArticleList({tag:blogInfo.tag,ispublished:1})
          this.assign("relatearticle",relatearticle);

          //跳转到内容分页
          let tagname=tagItem.tagname||'';
          let title=blogInfo.title||'';
          let strArrayVal=strArray||'';
          let particleVal=particle||'';

          this.assign("title",blogInfo.title);
          this.assign('strArray',strArrayVal);
          this.assign('particle',particleVal);
          this.assign('pid',pid);
          this.assign('tagname',tagname);

          let setting=await this.model('home').findOne('system_comment');
          this.assign("setting",setting);

          return this.displayView('index_page');
      }else{
          return this.displayView("../common/error_404");
      }
    }

    async previewAction(){
        let aid= await this.get("aid");
        let blogInfo=await this.model("home").findOne("article",{id:aid});
        // 设置浏览量加1
        let viewcount=await this.model("home").addViewCount({id:aid});
        //获取标签名
        let tagItem=await this.model("home").findOne("tags",{id:blogInfo.tag});
        this.assign('blogInfo',blogInfo);
        //设置文章分页
        let html=blogInfo.content;
        let strArray=[],particle='',ainfo='';
        let pid=this.get('pid');
        if(html){
            if(html.indexOf("<!--page-->")>0){
                strArray=html.split("<!--page-->");
                if(pid){
                    let id=pid*1-1;
                    particle=strArray[id];
                }else{
                    pid=1;
                    particle=strArray[0];
                }
            }
        }
        //跳转到内容分页
        let tagname=tagItem.tagname||'';
        let title=blogInfo.title||'';
        let strArrayVal=strArray||'';
        let particleVal=particle||'';

        this.assign("title",blogInfo.title);
        this.assign('strArray',strArrayVal);
        this.assign('particle',particleVal);
        this.assign('pid',pid);
        this.assign('tagname',tagname);
        return this.displayView('index_preview');
    }
   //前端资讯
    async newsAction(){
        this.getList(2,'news');
    }
    //nodejs文章
    async nodeAction(){
        this.getList(3,'node');
    }
    //苹果精品软件
    async downloadAction(){
        this.getList(4,'download');
    }
    //活动
    async activityAction(){
        this.getList(6,'activity');
    }
    //大杂烩
    async othersAction(){
        this.getList(1,'others');
    }
    //招聘
    async jobsAction(){
        this.getList(5,'jobs');
    }
    //分类公用方法
    async getList(itemId,menu){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("home").getPageSelect({item:itemId,ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({item:itemId,ispublished:1},pagenumber,pagesize);
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu',menu);
        //分页

        let item=await this.model("home").findOne("item",{id:itemId});
        this.assign('categoryName',item.itemname);
        this.assign('more',0);
        return this.displayView("index_item");
    }
    async moreAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("home").getPageSelect({ispublished:1,item:{"!=":8}},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({ispublished:1,item:{"!=":8}},pagenumber,pagesize);
        let Page=think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu','more');
        //分页
        this.assign('more',1);
        this.assign('categoryName','全部文章');
        return this.displayView("index_category");
    }
    //分类
    async categoryAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        let itemId=await this.get("id");

        let itemList=await this.model("home").getPageSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        let Page=think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData=page.pagination(result);
        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        //分页
        let category=await this.model("home").findOne("tags",{id:itemId});
        this.assign('categoryName',category.tagname);
        this.assign('more',0);
        this.assign('menu','category/'+itemId);
        return this.displayView('index_category');

    }

    // 友情链接提交接口
    async linkssaveAction(){
        let mydata =await this.post();
        if(mydata.domain!==''&&mydata.link!==''&&mydata.qq!==''){
          let rs=await this.model("home").addRecord("links",mydata);
          if(rs) return this.success();
        }
    }
    // 留言提交接口
    async guestsaveAction(){
        let mydata =await this.post();
        if(mydata.nickname!==''&&mydata.contact!==''&&mydata.guest!==''){
          let rs=await this.model("home").addRecord("guest",mydata);
          if(rs) return this.success();
        }
    }
    async guestAction(){
        this.assign("title","留言板");
        return this.displayView("index_guest");
    }
    async aboutAction(){
        this.assign("title","关于我们");
        return this.displayView("index_about");
    }
    async adsAction(){
        this.assign("title","推广服务");
        return this.displayView("index_ads");
    }
    async copyrightAction(){
        this.assign("title","版权声明");
        return this.displayView("index_copyright");
    }
    async linksAction(){
        this.assign("title","友情链接");
        return this.displayView("index_links");
    }
    async policyAction(){
        this.assign("title","注册协议");
        return this.displayView("index_policy");
    }
    async donateAction(){
        this.assign("title","捐赠");
        return this.displayView("index_donate");
    }
    async dologoutAction(){
             this.session("uInfo","");
      return this.redirect("/login.html");
    }

    // 站点地图
    async sitemapAction() {

          //生成xml
          let data={};
          let sysdata=await this.model("home").findOne("system",{id:1});
          //获取分类页list
          let list=await this.model("home").findAll("item");
          //获取文章列表article
          let article=await this.model("home").findAll("article");
          //获取主题帖
          let topic=await this.model("home").findAll("topic");
          //获取个人主页
          let user=await this.model("home").findAll("user");
          let others=[
                          { id: 1, itemname: '大杂烩',url:'others.html' },
                          { id: 2, itemname: '前端资讯',url:'news.html' },
                          { id: 3, itemname: 'nodejs',url:'node.html' },
                          { id: 4, itemname: '资源下载',url:'download.html' },
                          { id: 5, itemname: '招聘',url:'jobs.html' },
                          { id: 6, itemname: '活动',url:'activity.html' },
                          { id: 7, itemname: '关于',url:'about.html' },
                          { id: 8, itemname: '友情链接',url:'links.html' },
                          { id: 9, itemname: '注册',url:'register.html' },
                          { id: 10, itemname: '捐赠',url:'donate.html' },
                          { id: 11, itemname: '推广服务',url:'ads.html' },
                          { id: 12, itemname: '注册协议',url:'policy.html' },
                          { id: 13, itemname: '版权声明',url:'copyright.html' },
                          { id: 14, itemname: '会员登录',url:'login.html' },
                          { id: 15, itemname: '留言板',url:'guest.html' },
                          { id: 16, itemname: 'liblog',url:'liblog.html' }
                     ];
          data={
              homeurl:sysdata.url,
              list:list,
              article:article,
              others:others,
              topic:topic,
              user:user
          }
          Create.createXml(data);
          return this.displayView("index_sitemap");

    }

    async liblogAction(){
      return this.displayView("index_liblog");
    }
}
