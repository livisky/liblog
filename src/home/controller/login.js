'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){

      this.assign("title","管理员登陆")
      //判断是否登陆
      let data=await this.session('userInfo');

      if(!think.isEmpty(data)){
              return  this.redirect("/admin/index");
      }else{
              return  this.display();
      }
       //判断是否登陆
  }
  async redirectAction(){
      return  this.display();
  }
  async dologinAction(){
      let data=this.post();
      let md5Pas = await think.md5(data.password);
      let uname = await data.username;
      let result=await this.model("home").findOne("user",{name:uname,role:{">":0}});
      let info={
            name: uname,
            password: md5Pas
      }
      if(uname===result.name&&md5Pas===result.password){
            await this.session("userInfo", info);
            return this.json({status:1,msg:"登陆成功!"});
      }else{
          return this.json({status:0,msg:"用户名或密码错误!"});
      }
  }
}
