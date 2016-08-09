'use strict';
let init={
    mydb:"guest",
    title:"留言管理",
    edit:"留言编辑",
    add:"留言添加",
    action:"guest"
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
