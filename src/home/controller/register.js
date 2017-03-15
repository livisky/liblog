'use strict';
let http = require("http");
let fs = require("fs");
import Base from './base.js';
export default class extends Base {

    // 注册页面
    async indexAction(){

      let uinfo=await this.session('uInfo');
      if(!think.isEmpty(uinfo)){
        //已注册并登录
        return this.redirect('/personal/@'+uinfo.name);
      }else {
        this.assign("title","会员注册");
        return this.displayView("register_index");
      }
    }
    //注册接口
    async doregisterAction(){
        let newData=this.post();
            newData.password=think.md5(newData.password);
        // 后台校验
        let name=newData.name;
        let password=newData.password;
        let email=newData.email;
        newData.createtime=think.datetime(this.post('createtime'));
        if(name!==''&&password!==''&&email!==''){
          //校验用户是否存在
          let s=await this.checkIsExist({name:name})
          let userFlag=await this.checkIsExist({name:name});
          let emailFlag=await this.checkIsExist({email:email});
          if(userFlag===0){
            return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
          }else if(emailFlag===0){
            return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
          }else{

            let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
            let geetest = new Geetest();
            let res = await geetest.validate(this.post());
            if("success" != res.status){
                return this.json({status:0,errno:2,errmsg:"验证码错误!"});
            }else{
                let rs=await this.model('home').addUser(newData);
                let uInfo={
                    email:email,
                    pic:'',
                    name:name,
                    nickname:'',
                    openid:'',
                    way:'site'
                  }
                await this.session("uInfo", uInfo);
                if(rs) return this.success();
            }
          }
        }else{
          return this.fail('请填写必要信息！');
        }
    }
    // 获取网络头像并保存
    // async getpicAction(){
    //     let url="http://www.jsout.com/static/common/images/common/logo.jpg";
    //     http.get(url, function(res){
    //           var imgData = "";
    //           res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    //           res.on("data", function(chunk){
    //               imgData+=chunk;
    //           });
    //           console.log(url);
    //           res.on("end", function(){
    //               let mypath=think.RESOURCE_PATH+"/static/common/images/pic/logonew.png"
    //               fs.writeFile(mypath, imgData, "binary", function(err){
    //                   if(err){
    //                       console.log(err);
    //                   }else {
    //                     return mypath;
    //                   }
    //                   // console.log("down success");
    //               });
    //           });
    //       });
    // }
    async adduserAction(){
        let newData=this.post();
        // 后台校验
        let name=newData.name;
        let email=newData.email;
        let nickname=newData.nickname;
        let openid=newData.openid;
        newData.createtime=think.datetime(this.post('createtime'));
        if(name!==''&&nickname!==''&&email!==''&&openid!==''){
          //校验用户是否存在
          let s=await this.checkIsExist({name:name})
          if(s===0){
            return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
          }else{
              let rs=await this.model('home').addUser(newData);
              //设置session
              let uinfo=await this.session('uInfo');
              uinfo.name=name;
              if(rs){return this.success();}
          }
        }else{
          return this.fail('请填写必要信息！');
        }
    }

    //检查是否存在
    async checkIsExist(where){
        let rs= await this.model('home').findUser(where);
        let s=(rs.length>0)?0:1;
        return s;
    }

    //校验注册用户名是否存在
    async isexistAction(){
      let name=await this.post('name');
      let s=await this.checkIsExist({name:name});
      if(s==1){
        return this.json({status:1,errno:0,errmsg:'用户名可用！'});
      }else{
        return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
      }
    }

    //校验邮箱是否存在
    async checkemailAction(){
      let email=await this.post('email');
      let s=await this.checkIsExist({'email':email});
      if(s==1){
        return this.json({status:1,errno:0,errmsg:'该邮箱可用！'});
      }else{
        return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
      }
    }

    //极验验证码
    async geetestAction(){
      // pc 端接口
        let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
        let geetest = new Geetest();
        if(this.isPost()){
            let post =this.post();
            let res = await geetest.validate(post);
            return this.json(res);
        }else {
            let res = await geetest.register(this.get('type'));
            return this.json(res);
        }
   }
}
