'use strict';

import Base from './base.js';
import request from "request";
export default class extends Base {

    //用户登录
    async indexAction(){
      let uinfo=await this.session('uInfo');
      if(!think.isEmpty(uinfo)){
        return this.redirect('/personal/@'+uinfo.name);
      }else {
        this.assign("title","用户登录");
        return this.displayView("login_index");

      }
    }
    async dologinAction(){
      let data=this.post();
      let code=data.code;
      let sysCode=await this.session('code');
      // code=code.toLowerCase();
      // sysCode=sysCode.toLowerCase();
      let md5Pas = await think.md5(data.password);
      let email = await data.email;
      let result=await this.model('home').findOne('user',{email:email});
      if(email===result.email&&md5Pas===result.password){

          let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
          let geetest = new Geetest();
          let res = await geetest.validate(this.post());
          if("success" != res.status){
              return this.json({status:0,errno:2,errmsg:"验证码错误!"});
          }else{
            let uInfo={
                email:email,
                pic:result.pic,
                name:result.name,
                nickname:result.nickname,
                openid:'',
                way:'site'
              }
            await this.session("uInfo", uInfo);
            return this.json({status:1,errno:0,uname:result.name,errmsg:"登录成功!"});
          }
      }else{
          return this.json({status:0,errno:1,errmsg:"用户名或密码错误!"});
      }
    }

    async githubAction(){
        let self=this;
        let GITHUB_CLIENT_ID="776342f65de13d9b3df4",
            GITHUB_CLIENT_SECRET="080784f5209b1dc0d934e66eeab8013c4e68735c";

        let code=await this.get('code');
        let formData = {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code
        };

        request.post({
            url: 'https://github.com/login/oauth/access_token',
            form: formData,
            headers: {Accept: 'application/json'}
          }, function (err, res1, body) {

            var access_token = JSON.parse(body).access_token;
            var headers2 = {
              'User-Agent': 'Awesome-Octocat-App'
            };
            request.get({
              url: 'https://api.github.com/user',
              qs: {access_token: access_token},
              headers: headers2
            }, function (err, res2, body) {
            let info = JSON.parse(body);
            let uInfo={
                email:info.email,
                pic:'',
                name:'',
                nickname:info.login,
                openid:info.id,
                way:'github'
              }
              self.session("uInfo",uInfo);
              self.redirect("/login/complete");
            });
        });
    }
    async qqloginAction(){
        let self=this;

        let QQ_CLIENT_ID = "101334443";
        let QQ_CLIENT_SECRET = "ace474e949764ac84a9faeb8f99ae4c6";
        let REDIRECT_URI = "http://www.jsout.com/login/qqlogin";
        let QQ_grant_type = "authorization_code";
        //注意:回填地址, 因为QQ不允许像github一样填http://127.0.0.1:3000的开发者模式,
        // https://graph.qq.com/oauth2.0/authorize?redirect_uri=' + REDIRECT_URI + '&response_type=code&client_id=' + QQ_CLIENT_ID

        let code=await this.get('code');
        let qs = {
              grant_type: 'authorization_code',
              client_id: QQ_CLIENT_ID,
              client_secret: QQ_CLIENT_SECRET,
              code: code,
              redirect_uri: REDIRECT_URI
            };
        request.get({
            url: 'https://graph.qq.com/oauth2.0/token',
            qs: qs
          }, function (err, res1, body) {
            let access_token = body.match(/access_token=(\w+)&?/)[1];
            request.get({
              url: 'https://graph.qq.com/oauth2.0/me',
              qs: {access_token: access_token}
            }, function (err, res2, body) {
                  let openid = body.match(/"openid":"(\w+)"/)[1];
                  let qs = {
                    oauth_consumer_key: QQ_CLIENT_ID,
                    access_token: access_token,
                    openid: openid,
                    format: 'json'
                  };
                  // 获取用户信息
                    request.get({
                        url: 'https://graph.qq.com/user/get_user_info',
                        qs: qs
                        }, function (err, res2, body) {
                        let info = JSON.parse(body);
                        let uInfo={
                            email:'',
                            pic:'',
                            name:'',
                            nickname:info.nickname,
                            openid:openid,
                            way:'qq'
                          }
                          self.session("uInfo",uInfo);
                          self.redirect("/login/complete");
                  });
              });
        });
    }

    async completeAction(){
      this.assign('title','完善资料')
      let uinfo=await this.session("uInfo");
      if(think.isEmpty(uinfo)){
          return this.redirect("/login.html");
      }else{
        //查询是否已经注册过
        let DB_userinfo=await this.model('home').findOne('user',{openid:uinfo.openid});
        //未注册
        if(think.isEmpty(DB_userinfo)){
          this.assign("uinfo",uinfo);
          return this.displayView("login_complete");
        }else{
          //已注册
          uinfo.name=DB_userinfo.name;
          return this.redirect("/personal/@"+DB_userinfo.name);
        }
      }
    }
}
