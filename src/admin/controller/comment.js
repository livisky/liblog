'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

    // 分页
    let commentList=await this.model("comment").page(this.get("page"), this.get("pagesize")).select();
    let result = await this.model("comment").page(this.get('page'),this.get('pagesize')).countSelect();
    let Page=think.adapter("template", "page");
    let page = new Page(this.http);
    let pageData=page.pagination(result);
    this.assign("commentList",commentList);
    this.assign('pageData',pageData);
    // 分页
    // 初始化分页
    let pagesize=await this.config("pagesize");
    if(!this.get("page")){
      return this.redirect("/admin/comment/index?page=1&pagesize="+pagesize);
    }
    // 初始化分页
    this.assign("title","评论管理");
    return this.display();
  }


  //删除或批量删除接口
  async delsomeAction(){
    let arr=await this.post('delarr[]');
    let rs=this.model("comment").where({id: ["IN", arr]}).delete();
    if(rs){
      //操作成功
      return this.success();
    }
  }

  //举报列表
  async tiplistAction(){

    let tiplist=await this.model('comment').where({tipoff:1}).select();
    this.assign('tiplist',tiplist);
    this.assign('title','评论举报列表')
    return this.display();
  }
}