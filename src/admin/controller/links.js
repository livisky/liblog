'use strict';
let init={
    mydb:"links",
    title:"友情链接管理",
    action:"links"
}
import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
      let info={
        db:init.mydb,
        page:this.get("page")||1,
        pagesize:this.get("pagesize")||10
      }
      let mydata=await this.model('util').getIndex(info);
      this.assign("itemList",mydata.itemList);
      this.assign('pageData',mydata.pageData);
      this.assign("title",init.title);
      this.assign("action",init.action);
      return this.display();
  }
  //删除或批量删除接口
  async delsomeAction(){
        let info={
          db:init.mydb,
          arr:this.post('delarr[]')
        }
        let where={id: ["IN", info.arr]};
        let rs=await this.model("admin").deleteRecord(info.db,where);
        if(rs) return this.success();
  }

}
