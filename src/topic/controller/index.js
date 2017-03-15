'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
       let tab=this.get("tab");
       this.assign("title","社区");
       let map,menu;
       if(tab==='all'||tab===''){
         map={show:1};
         menu="all";
       }else{
         map={item:tab,show:1};
         menu=tab;
       }
      //  let topicList=await this.model('topic').getTopicListJoinRecord(map);
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||20;
       //分页
        let itemList=await this.model("topic").getPageSelect(map,pagenumber,pagesize);
        let result = await this.model("topic").getPageCountSelect(map,pagenumber,pagesize);
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu',"topic/"+menu);
       //分页
       //  tab列表
       let tablist=await this.model("topic").findAll("topic_item");
       this.assign("tablist",tablist);
       //  tab列表
       this.assign("tab",tab);
       return this.displayView("index_index");

  }
  async itemAction(){
    let tid= await this.get("tid");
    let uinfo=await this.session('uInfo');
    let islogin=(!think.isEmpty(uinfo))?1:0;
    this.assign("islogin",islogin);
    if(!think.isEmpty(uinfo)){
      let loginuserinfo=await this.model('topic').findAll('user',{name:uinfo.name});
      this.assign("loginuserinfo",loginuserinfo[0]);
      //获取收藏信息
      let collectList=await this.model('topic').findAll('user_collect',{aid:tid,type:'topic',author:uinfo.name,iscollect:1});
      if(collectList.length>0){
        this.assign("cid",collectList[0].id);
        this.assign("iscollect",1);
      }else {
        this.assign("cid","");
        this.assign("iscollect",0);
      }
    }else{
      this.assign("loginuserinfo",{});
    }

    // 获取回复列表
    let replyList=await this.model("topic").getReplyListInfo({tid:tid});
    this.assign("replyList",replyList);

    let topicInfo=await this.model("topic").findOne("topic",{id:tid});
    if(!think.isEmpty(topicInfo)){
      let topicItem=await this.model("topic").findOne("topic_item",{name:topicInfo.item});
      let viewcount=await this.model("topic").where({id:tid}).increment('view',1);
      this.assign('topicInfo',topicInfo);
      this.assign("replycount",topicInfo.replycount);
      this.assign('topicItem',topicItem.comment);
      return this.displayView("index_item");

    }else{
      return this.displayView("../common/error_404");
    }
  }

  async editAction(){
    let tid= await this.get("tid");
    let replyInfo=await this.model("topic").findOne("topic_comment",{id:tid});
    let topicInfo=await this.model("topic").findOne("topic",{id:replyInfo.tid});
    this.assign("title","回复编辑");
    this.assign("replyInfo",replyInfo);
    this.assign("topicInfo",topicInfo);
    return this.displayView("index_edit");
  }
}
