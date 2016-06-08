'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //数据库更新
    updateUser(data,id){
        return this.where({id:id}).update(data);
    }
    //查询所有数据
    getAllUser(){
        return this.select();
    }
    //删除数据
    deleteUser(id){
        return this.where({id:id}).delete();
    }
    
    //添加数据
    addUser(data){
        return this.add(data);
    }
    
    //添加多条数据
    addManyUser(data){
        return this.addMany(data);
    }   
    
    //分页
    getUserListByPage(currentPage,everyPage){
        return this.page(currentPage, everyPage).select();
    }
}