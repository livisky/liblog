'use strict';
/**
 * model
 */
export default class extends think.model.base {

    //返回全部列表
    findAll(db,where){
        return this.model(db).where(where).select();
    }
    //返回特定记录
    findOne(db,where){
        return this.model(db).where(where).find();
    }
    //更新数据
    updateRecord(db,where,data){
        return this.model(db).where(where).update(data);
    }
    //添加数据
    addRecord(db,data){
        return this.model(db).add(data);
    }
    //返回文章列表
    getArticleList(where){
        return this.model("article").where(where).order("createtime DESC").limit(5).select();
    }
    //返回点击排行列表
    getPopularList(where){
        return this.model("article").where(where).order("view DESC").limit(5).select();
    }
    //返回点击排行列表
    addViewCount(where){
        return this.model("article").where(where).increment('view',1);
    }
    //分页初始数据
    getPageSelect(where,page,pagesize){
        return this.model("article").where(where).order("createtime DESC").page(page,pagesize).select();
    }
    //分页thinkjs分页数据
    getPageCountSelect(where,page,pagesize){
        return this.model("article").where(where).order("createtime DESC").page(page,pagesize).countSelect();
    }

}
