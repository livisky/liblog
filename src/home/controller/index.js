'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
      
      let topList=await this.model("article").where({totop:1,ispublished:1}).limit(5).order("createtime DESC").select();
          this.assign('topList',topList);

      let actList=await this.model("article").where({item:6,ispublished:1}).limit(5).order("createtime DESC").select();
      let now=new Date().getTime();
      this.assign('actList',actList);
      return this.display();
  }
  async pageAction(){
      let aid= await this.get("aid");
      let blogInfo=await this.model("article").where({id:aid}).find();
      if(blogInfo.ispublished===1){
          // 设置浏览量加1
          let viewcount=await this.model("article").where({id:aid}).increment('view',1);
          //获取标签名
          let tagItem=await this.model("tags").field("tagname").where({id:blogInfo.tag}).find();
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
          let relatearticle=await this.model("article").where({tag:blogInfo.tag,ispublished:1}).limit(6).select();
          this.assign("relatearticle",relatearticle);
          ////判断登陆
          //let userinfo=await this.session("userInfo");
          //let showComment=false;
          //if(!think.isEmpty(userinfo)){
          //    showComment=true;
          //}
          //this.assign('showComment',showComment);

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


          //获取评论{belongid: {'=': 0},

          let commentList= await this.model('comment').where({belongid: {'=': 0},aid:aid}).select();
          let replyList= await this.model('comment').where({belongid: {'>': 0},aid:aid}).select();
          let count= await this.model('comment').where({aid:aid}).count();
          if(commentList.length===0){
              commentList=replyList;
          }
          this.assign("commentList",commentList);
          this.assign("replyList",replyList);
          this.assign("count",count);


          return this.display();
      }else{
          return this.display("common/error/404");
      }
    }
    //顶
    async postdigAction(){
        let id=this.post("id");
        let rs=this.model("comment").where({id:id}).update({dig:1});
        if(rs){
            return this.success();
        }
    }
    //举报
    async postreportAction(){
        let id=this.post("id");
        let rs=this.model("comment").where({id:id}).update({tipoff:1});
        if(rs){
            return this.success();
        }
    }
    async postcommentAction(){
        let mycreatetime=think.datetime(this.post("createtime"));
        let data = this.post();
        data.createtime=mycreatetime;
        let rs=this.model("comment").add(data);
        if(rs){
            //操作成功
            return this.success();
        }
    }
    async previewAction(){
        let aid= await this.get("aid");
        let blogInfo=await this.model("article").where({id:aid}).find();
        // 设置浏览量加1
        let viewcount=await this.model("article").where({id:aid}).increment('view',1);
        //获取标签名
        let tagItem=await this.model("tags").field("tagname").where({id:blogInfo.tag}).find();
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
        var itemList=await this.model("article").where({item:itemId,ispublished:1}).order("createtime DESC").page(pagenumber, pagesize).select();
        var result = await this.model("article").where({item:itemId,ispublished:1}).order("createtime DESC").page(pagenumber,pagesize).countSelect();
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu',menu);
        //分页

        let item=await this.model("item").where({id:itemId}).find();
        this.assign('categoryName',item.itemname);
        this.assign('more',0);
        return this.display('item');
    }
    async moreAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("article").where({ispublished:1}).order("createtime DESC").page(pagenumber, pagesize).select();
        let result = await this.model("article").where({ispublished:1}).order("createtime DESC").page(pagenumber, pagesize).countSelect();
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

        var itemList=await this.model("article").where({tag:itemId,ispublished:1}).order("createtime DESC").page(pagenumber, pagesize).select();
        var result = await this.model("article").where({tag:itemId,ispublished:1}).order("createtime DESC").page(pagenumber, pagesize).countSelect();
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);
        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        //分页
        let category=await this.model("tags").where({id:itemId}).find();
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
        let rs=await this.model('links').add(mydata);
        if(rs) return this.success();
    }
    async guestsaveAction(){
        let mydata =await this.post();
        let rs=await this.model('guest').add(mydata);
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