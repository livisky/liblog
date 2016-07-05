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
      let map={content: ["like", "%"+keywords+"%"]};

      let pagenumber=this.get("page")||1;
      let pagesize=this.get("pagesize")||10;
      let itemId=await this.get("id");
      //
      var itemList=await this.model("article").where(map).order("createtime DESC").page(pagenumber, pagesize).select();
      var result = await this.model("article").where(map).order("createtime DESC").page(pagenumber, pagesize).countSelect();
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
      return this.display();
  }
}
