'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

    // 分页
    let userList=await this.model("user").page(this.get("page"), this.get("pagesize")).select();
    let result = await this.model("user").page(this.get('page'),this.get('pagesize')).countSelect();
    let Page=think.adapter("template", "page");
    let page = new Page(this.http);
    let pageData=page.pagination(result);
    this.assign("userList",userList);
    this.assign('pageData',pageData);
    // 分页
    // 初始化分页
    let pagesize=await this.config("pagesize");
    if(!this.get("page")){
      return this.redirect("/admin/user/index?page=1&pagesize="+pagesize);
    }
    // 初始化分页
    this.assign("title","用户管理");
    return this.display();
  }


  async itemAction(){
    if (this.get('id')) {
      //编辑tags
      this.assign("title","用户编辑");
      let id=this.get('id');
      let user=await this.model("user").where({id:id}).find();
      console.log(user);
      this.assign("user",user);

    }else{
      this.assign("title","用户添加");
      this.assign("user",{});
    }
    return this.display();
  }

  //提交接口
  async saveAction() {
    //编辑或者新增
    let data=await this.post();
    if(!think.isEmpty(this.post("id"))){
      let rs=await this.model("tags").update(data);
      if(rs) return this.success();
    }else{
      let rs=await this.model("tags").add(data);
      if(rs) return this.success();
    }
  }

  //删除或批量删除接口
  async delsomeAction(){
    let arr=await this.post('delarr[]');
    let rs=this.model("tags").where({id: ["IN", arr]}).delete();
    if(rs){
      //操作成功
      return this.success();
    }
  }

}