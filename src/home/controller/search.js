'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
      // 搜索功能
      let keywords=this.get('keyword');
      let map={content: ["like", "%"+keywords+"%"],ispublished:1,item:["!=", 8]};

      let pagenumber=this.get("page")||1;
      let pagesize=this.get("pagesize")||10;
      let itemId=await this.get("id");
      //分页
      let itemList=await this.model("home").getPageSelect(map,pagenumber,pagesize);
      let result = await this.model("home").getPageCountSelect(map,pagenumber,pagesize);
      var Page=think.adapter("template", "page");
      var page = new Page(this.http);
      var pageData=page.pagination(result);
      this.assign("itemList",itemList);
      this.assign('pageData',pageData);
      //分页

      this.assign("title","全站搜索");
      this.assign("categoryName","全站搜索")
      this.assign("more",0)
      this.assign('menu','search?keyword='+this.get('keyword'));
      return this.displayView("search_index");
  }
}
