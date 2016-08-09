'use strict';

import Base from './base.js';
import Create from './sitemap.js';
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
        return this.redirect("/login");
  }
  welcomeAction(){
      this.assign("title","欢迎登陆！");
      return this.display();
  }
  async sitemapAction() {

        //生成xml
        let data={};
        let sysdata=await this.model('admin').findOne('system');
        //获取分类页list
        let list = await this.model("item").select();
        //获取文章列表article
        let article = await this.model("article").select();
        let others=[
                        { id: 1, itemname: '大杂烩',url:'others.html' },
                        { id: 2, itemname: '前端资讯',url:'news.html' },
                        { id: 3, itemname: 'nodejs',url:'node.html' },
                        { id: 4, itemname: 'mac精品',url:'mac.html' },
                        { id: 5, itemname: '招聘',url:'jobs.html' },
                        { id: 6, itemname: '活动',url:'activity.html' },
                        { id: 7, itemname: '关于',url:'about.html' },
                        { id: 8, itemname: '友情链接',url:'links.html' },
                        { id: 8, itemname: '留言板',url:'guest.html' }
                   ];
        data={
            homeurl:sysdata.url,
            list:list,
            article:article,
            others:others
        }
        Create.createXml(data);
    }
}
