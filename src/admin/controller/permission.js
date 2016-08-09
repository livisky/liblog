'use strict';
let init={
    mydb:"manage_permission",
    title:"权限管理",
    edit:"权限编辑",
    add:"权限添加",
    action:"permission"
}
import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
       async getIndex(info){

              let itemList = await this.model('admin').getRoleJoinRecord({manage_tag: {on: "tag, id"}},info.page,info.pagesize);
              let result = await this.model(info.db).page(info.page,info.pagesize).countSelect();
              //分页thinkjs分页数据
              let Page=think.adapter("template", "page");
              let page = new Page();
              let pageData=page.pagination(result,info.page);
              return {
                 itemList:itemList,
                 pageData:pageData
              };
       }
      async indexAction(){
          let info={
            db:init.mydb,
            page:this.get("page")||1,
            pagesize:this.get("pagesize")||10
          }
          let mydata=await this.getIndex(info);
          this.assign("itemList",mydata.itemList);
          this.assign('pageData',mydata.pageData);
          this.assign("title",init.title);
          this.assign("action",init.action);
          return this.display();
      }

     async itemAction(){

           let info={
             db:init.mydb,
             edit:init.edit,
             add:init.add,
             id:this.get('id')
           }
           let mydata=await this.model('util').getItem(info);
           let tagList=await this.model('manage_tag').select();
           this.assign("tagList",tagList);
           this.assign("title",mydata.title);
           this.assign('item',mydata.item);
           this.assign("action",init.action);
           return this.display();
     }

     //编辑或者新增接口
     async saveAction() {
          let info={
            db:init.mydb,
            data:this.post(),
            id:this.post('id')
          }
          let mydata=await this.model('util').doSave(info);
          if(mydata.status===1) return this.success();
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
