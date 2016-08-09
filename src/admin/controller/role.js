'use strict';
let init={
    mydb:"manage_role",
    title:"角色管理",
    edit:"角色编辑",
    add:"角色添加",
    action:"role"
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

     async itemAction(){

           let info={
             db:init.mydb,
             edit:init.edit,
             add:init.add,
             id:this.get('id')
           }
           let mydata=await this.model('util').getItem(info);
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
    //权限列表
    async perlistAction(){

      let tagList=await this.model('admin').findAll('manage_tag');
      let rolePermissions=await this.model('admin').findOne('manage_role',{id:this.get('id')});
      let arr=[];
      for(var i in tagList){
        let ilist={},obj={};
        ilist=await this.model('admin').findAll('manage_permission',{tag:tagList[i].id});
        let prr=[],pbj={};
        //循环权限
        for(var j in ilist){
          pbj={
             'id':ilist[j].id,
             'pername':ilist[j].pername,
             'permission':ilist[j].permission
          }
          prr.push(pbj);
        }
        //拼组数据
        obj={
          'name':tagList[i].name,
          'perlist':prr
        }
        arr.push(obj);
      }

      //转换成数字数组
      let newArr=[]
      if(!think.isEmpty(rolePermissions.pid)){
        let roleArr=(rolePermissions.pid).split(",");
        let item;
        for(var k in roleArr){
          item=roleArr[k]*1
          newArr.push(item);
        }
      }

      this.assign('itemList',arr);
      this.assign('rid',this.get('id'));
      this.assign('title','权限列表');
      this.assign('newArr',newArr);
      return this.display();
    }
    async rolesaveAction(){
           let newdata=await this.post();
           console.log(newdata);
           if(!think.isEmpty(this.post('id'))){
               let rs=await this.model('admin').updateRecord('manage_role',{id:this.post('id')},newdata);
               if(rs) return this.success();
           }
    }

}
