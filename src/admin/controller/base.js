'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
    async __before() {
        await this.getConfig();
        //判断登陆
        let userinfo=await this.session("userInfo");
        if(think.isEmpty(userinfo)){
            return this.redirect("/login/redirect");
        }else{
            this.assign('userinfo',userinfo);
        }
        //判断登陆 
        
        // csrf 防止模拟提交  
        let csrf=await this.session("__CSRF__");
        this.assign("csrf",csrf);     
              
    }
    async getConfig() {
        let sysdata=await this.model('system').where({id:1}).find();
        this.assign('_web',sysdata);
    }
}