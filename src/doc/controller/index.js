'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.displayView("index_index");

  }
  //thinkjs文档
  async thinkjs2Action(){
      let aid= await this.get("aid");
      let articleInfo=await this.model('doc').getOneArticle('article',{id:aid,tag:18});
      if(articleInfo.ispublished===1){
          this.assign('articleInfo',articleInfo);
          return this.displayView("index_thinkjs2");
      }else{
          return this.displayView("../common/error_404");
      }
  }
  //angularjs文档
  async angularAction(){
      let aid= await this.get("aid");
      let articleInfo=await this.model('doc').getOneArticle('article',{id:aid,tag:19});
      if(articleInfo.ispublished===1){
          this.assign('articleInfo',articleInfo);
          return this.displayView("index_angular");
      }else{
          return this.displayView("../common/error_404");
      }
  }
  //thinkjs教程
  async thinkjsAction(){
      let aid= await this.get("aid");
      let articleInfo=await this.model('doc').getOneArticle('article',{id:aid});
      if(articleInfo.ispublished===1){
          this.assign('articleInfo',articleInfo);
          return this.displayView("index_thinkjs");
      }else{
          return this.displayView("../common/error_404");
      }
  }
  // liblog教程
  async liblogAction(){
      let aid= await this.get("aid");
      let articleInfo=await this.model('doc').getOneArticle('article',{id:aid});
      if(articleInfo.ispublished===1){
          this.assign('articleInfo',articleInfo);
          return this.displayView("index_liblog");

      }else{
          return this.displayView("../common/error_404");
      }
  }
  // React教程
  async reactAction(){
      let aid= await this.get("aid");
      let articleInfo=await this.model('doc').getOneArticle('article',{id:aid,tag:20});
      if(articleInfo.ispublished===1){
          this.assign('articleInfo',articleInfo);
          return this.displayView("index_react");
      }else{
          return this.displayView("../common/error_404");
      }
  }
  Î
}
