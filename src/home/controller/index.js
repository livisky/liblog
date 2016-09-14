'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

      //获取置顶文章
      let topList=await this.model("home").getArticleList({totop:1,ispublished:1});
      this.assign('topList',topList);

      //获取近期活动
      let actList=await this.model("home").getArticleList({item:6,ispublished:1});
      this.assign('actList',actList);

      //获取后台畅言评论设置
      let setting=await this.model('home').findOne('system_comment');
      this.assign("setting",setting);

      return this.display();
  }
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
          //您可能感兴趣文章
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

          //获取后台畅言评论设置
          let setting=await this.model('home').findOne('system_comment');
          this.assign("setting",setting);

          return this.display();
        }else{
            return this.display("common/error/404");
        }
    }
    //顶
    async postdigAction(){
        let id=this.post("id");
        let newData={dig:1};
        let rs=await this.model("home").updateRecord("comment",{id:id},newData);
        if(rs){
            return this.success();
        }
    }
    //举报
    async postreportAction(){
        let id=this.post("id");
        let newData={tipoff:1};
        let rs=await this.model("home").updateRecord("comment",{id:id},newData);
        if(rs){
            return this.success();
        }
    }
    //提交接口
    async postcommentAction(){
        let mycreatetime=think.datetime(this.post("createtime"));
        let data = this.post();
        data.createtime=mycreatetime;
        let rs=await this.model("home").addRecord("comment",data);
        if(rs){
            //操作成功
            return this.success();
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
        return this.display();
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
    async macAction(){
        this.getList(4,'mac');
    }
    //活动
    async activityAction(){
        console.log(this.get("page"));
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
        return this.display('item');
    }
    async moreAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("home").getPageSelect({ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({ispublished:1},pagenumber,pagesize);
        let Page=think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu','more');
        //分页
        this.assign('more',1);
        this.assign('categoryName','全部文章');
        return this.display('category');
    }
    async categoryAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        let itemId=await this.get("id");

        let itemList=await this.model("home").getPageSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);
        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        //分页
        let category=await this.model("home").findOne("tags",{id:itemId});
        this.assign('categoryName',category.tagname);
        this.assign('more',0);
        this.assign('menu','category/'+itemId);
        return this.display();
    }
    async linksAction(){
        this.assign("title","友情链接");
        return this.display();
    }

    async linkssaveAction(){
        let mydata =await this.post();
        let rs=await this.model("home").addRecord("links",mydata);
        if(rs) return this.success();
    }
    async guestsaveAction(){
        let mydata =await this.post();
        let rs=await this.model("home").addRecord("guest",mydata);
        if(rs) return this.success();
    }
    async guestAction(){
        this.assign("title","留言板");
        return this.display();
    }
    async aboutAction(){
        this.assign("title","关于");
        return this.display();
    }
}
