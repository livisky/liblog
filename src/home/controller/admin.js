'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async loginAction(){

      this.assign("title","管理员登录")
      return this.displayView('admin_login');
  }
  async redirectAction(){
      return this.displayView('admin_redirect');
  }
  async dologinAction(){
        let data=this.post();
        let md5Pas = await think.md5(data.password);
        let uname = await data.username;
        let result=await this.model("home").findOne("user",{name:uname,role:{"<":4}});
        let info={
              name: uname,
              password: md5Pas
        }
        if(uname===result.name&&md5Pas===result.password){
              await this.session("userInfo", info);
              return this.json({status:1,msg:"登录成功!"});
        }else{
            return this.json({status:0,msg:"用户名或密码错误!"});
        }
  }

}
