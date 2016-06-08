'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

    // 分页
    let guestList=await this.model("guest").page(this.get("page"), this.get("pagesize")).select();
    let result = await this.model("guest").page(this.get('page'),this.get('pagesize')).countSelect();
    let Page=think.adapter("template", "page");
    let page = new Page(this.http);
    let pageData=page.pagination(result);
    this.assign("guestList",guestList);
    this.assign('pageData',pageData);
    // 分页
    // 初始化分页
    let pagesize=await this.config("pagesize");
    if(!this.get("page")){
      return this.redirect("/admin/guest/index?page=1&pagesize="+pagesize);
    }
    // 初始化分页
    this.assign("title","留言管理");
    return this.display();
  }

  //删除或批量删除接口
  async delsomeAction(){
    let arr=await this.post('delarr[]');
    let rs=this.model("guest").where({id: ["IN", arr]}).delete();
    if(rs){
      //操作成功
      return this.success();
    }
  }

}