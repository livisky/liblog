'use strict';
let init={
    mydb:"user",
    title:"用户管理",
    edit:"用户编辑",
    add:"用户添加",
    action:"user"
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
          let itemList = await this.model('admin').getUserListJoinRecord({},info.page,info.pagesize);
          let result = await this.model(info.db).page(info.page,info.pagesize).countSelect();
          let Page=think.adapter("template", "page");
          let page = new Page();
          let pageData=page.pagination(result,info.page);
          this.assign("itemList",itemList);
          this.assign('pageData',pageData);
          this.assign("title",init.title);
          this.assign("action",init.action);
          return this.display();
      }
      async adminlistAction(){
        let info={
          db:init.mydb,
          page:this.get("page")||1,
          pagesize:this.get("pagesize")||10
        }
        let map={'li_user.role':{'>':0}};
        let itemList = await this.model('admin').getUserListJoinRecord(map,info.page,info.pagesize);
        let result = await this.model(info.db).page(info.page,info.pagesize).where(map).countSelect();
        let Page=think.adapter("template", "page");
        let page = new Page();
        let pageData=page.pagination(result,info.page);
        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign("title",init.title);
        this.assign("action",init.action);
        return this.display('index');
      }
     async itemAction(){

           let info={
             db:init.mydb,
             edit:init.edit,
             add:init.add,
             id:this.get('id')
           }
           let mydata=await this.model('util').getItem(info);
           let roleList=await this.model('admin').findAll('manage_role');
           this.assign("roleList",roleList);
           this.assign("title",mydata.title);
           this.assign('item',mydata.item);
           this.assign("action",init.action);
           return this.display();
     }

     //编辑或者新增接口
     async saveAction() {
          let newData=this.post();
              newData.password=think.md5(newData.password);
          let info={
            db:init.mydb,
            data:newData,
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
