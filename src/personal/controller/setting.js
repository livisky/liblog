'use strict';

import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  //页面初始化数据
  async initPage(page){
    let uinfo=await this.session('uInfo');
    if(!think.isEmpty(uinfo)){
      if(uinfo.name){
        let userinfo=await this.model('personal').findUser({name:uinfo.name});
        this.assign("userinfo",userinfo[0]);
        return this.displayView("setting_"+page);
      }else{
        return this.displayView("../common/error_404");
      }
    }else {
      return this.redirect('/login.html');
    }
  }
  //检查是否存在
  async checkIsExist(where){
      let rs= await this.model('personal').findUser(where);
      let s=(rs.length>0)?0:1;
      return s;
  }
  // 基础信息设置
  async indexAction(){
    this.assign("title","基本信息设置");
    this.initPage("index");
  }
  // 保存基础信息
  async savebaseAction(){
    let uinfo=await this.session('uInfo');
    let newData=this.post();
    let name=newData.name;
    let nickname=newData.nickname;
    let email=newData.email;
    let sign=newData.sign;
    let userinfo=await this.model("personal").findOne('user',{name:uinfo.name});
    console.log(userinfo);

    if(name!==''&&nickname!==''&&email!==''&&sign!==''){
      if(userinfo.email===email&&userinfo.nickname===nickname&&userinfo.sign===sign){
        //邮箱和昵称都未改变
          return this.json({status:0,errno:1,errmsg:'请填写要提交的修改信息！'});
      }else{
          let userFlag=await this.checkIsExist({name:name});
          let emailFlag=await this.checkIsExist({email:email});
          if(userFlag===0&&uinfo.name!==name){
            return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
          }else if(emailFlag===0&&userinfo.email!==email){
            return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
          }else {
            let rs=await this.model('personal').saveUserInfo(newData,{name:newData.name});
            if(rs) return this.success();
          }
      }
    }
  }
  // 重置密码
  async resetpwdAction(){
    let uinfo=await this.session('uInfo');
    let newData=this.post();
        newData.password=think.md5(newData.password);
        newData.way='site';
    let oldpassword=think.md5(newData.oldpassword);
    let password=newData.password;

    if(oldpassword!==''){
      //验证原始密码是否正确
      let userinfo=await this.model('personal').findUser({name:uinfo.name});
      if(oldpassword!==userinfo[0].password){
        return this.json({status:0,errno:1,errmsg:'原始密码不正确！'});
      }
      if(password!==''){
        let rs=await this.model('personal').saveUserInfo(newData,{name:uinfo.name});
        if(rs) return this.success();
      }
    }
  }
  // 重置头像
  async resetpicAction(){
    let uinfo=await this.session('uInfo');
    let newData=this.post();
    let pic=newData.pic;

    if(pic!==''){
        let rs=await this.model('personal').saveUserInfo(newData,{name:uinfo.name});
        if(rs) return this.success();
    }
  }
  //校验邮箱是否存在
  async checkemailAction(){
    let email=await this.post('email');
    let rs= await this.model('personal').findAll('user',{'email':email});
    if(rs.length>0){
      return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
    }else{
      return this.json({status:1,errno:0,errmsg:'该邮箱可用！'});
    }
  }
  async passwordAction(){
    this.assign("title","修改密码");
    this.initPage("password");
  }
  async picAction(){
    this.assign("title","头像修改");
    this.initPage("pic");
  }
}
