'use strict';
let init={
    mydb:"comment",
    title:"评论管理",
    action:"comment"
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
  //举报列表
  async tiplistAction(){

    let tiplist=await this.model('admin').findAll('comment',{tipoff:1});
    this.assign('tiplist',tiplist);
    this.assign('title','评论举报列表')
    return this.display();
  }
}
