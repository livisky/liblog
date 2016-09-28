'use strict';
let init={
    mydb:"topic",
    title:"社区管理",
    edit:"",
    add:"",
    action:"topic"
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
          let topicList = await this.model('admin').getTopicListJoinRecord(info.page,info.pagesize);
          let result = await this.model(info.db).page(info.page,info.pagesize).countSelect();
          let Page=think.adapter("template", "page");
          let page = new Page();
          let pageData=page.pagination(result,info.page);
          this.assign("topicList",topicList);
          this.assign('pageData',pageData);
          this.assign("title",init.title);
          this.assign("action",init.action);
          this.assign("info",info);
          return this.display();
      }

     //更新接口
     async updateAction() {
          let newData=this.post();
          let rs=this.model("topic").where({id:this.post("id")}).update(newData);
          if(rs) return this.success();
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
