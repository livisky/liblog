'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
    async __before() {
        await this.getConfig();
        //判断登录
        let userinfo=await this.session("userInfo");
        if(think.isEmpty(userinfo)){
            return this.redirect("/admin/redirect");
        }else{
            this.assign('userinfo',userinfo);
        }
        //判断登录

        //判断权限
        let myurl=this.http.module+"/"+this.http.controller+"/"+this.http.action;
        let uinfo=await this.session('userInfo');
        let username=uinfo.name;
        let userData=await this.model('admin').findOne('user',{name:username});
        let roleData=await this.model('admin').findOne('manage_role',{id:userData.role});
        let permissions=(roleData.permission).split(",");

        //没有权限
        if(permissions.indexOf(myurl)<0){
          if(this.http.method==='POST'){
              return this.fail("抱歉，您没有权限访问,请与系统管理员联系!");
          }else{
              return this.display("admin/error/nopermission");
          }
        }
        //判断权限

        // csrf 防止模拟提交
        let csrf=await this.session("__CSRF__");
        this.assign("csrf",csrf);

    }
    async getConfig() {
        let sysdata=await this.model('admin').findOne('system');
        this.assign('_web',sysdata);
    }
}
