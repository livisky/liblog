'use strict';

import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
        this.assign("title","后台管理");
        let uinfo=await this.session('userInfo');
        let userInfo=await this.model('admin').getUserJoinRecord({manage_role:{on:"role,id"}},{name:uinfo.name});
        this.assign("roleName",userInfo.rolename);
        this.assign("loginName",uinfo.name);
        return this.display();
  }
  async logoutAction(){
       await this.session("userInfo","");
        return this.redirect("/admin/login");
  }
  welcomeAction(){
      this.assign("title","欢迎登录！");
      return this.display();
  }
}
