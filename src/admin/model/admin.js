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

    //删除数据
    deleteRecord(db,where){
        return this.model(db).where(where).delete();
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

    //获取文章关联表记录
    getArticleJoinRecord(where,page,pagesize){
      return this.model("article").field("*,li_article.id as aid").join({
          tags: {on: "tag, id"},
          item: {on: ["item", "id"]},
      }).where(where).page(page,pagesize).order("createtime DESC").select();
    }

    //获取草稿箱关联表记录
    getDraftJoinRecord(join,where,page,pagesize){
      return this.model("article").field("*,li_article.id as aid").join(join).where(where).page(page,pagesize).order("createtime DESC").select();
    }

    //获取权限关联表记录
    getRoleJoinRecord(join,page,pagesize){
      return this.model("manage_permission").field("*,li_manage_permission.id as pid").join(join).page(page,pagesize).select();
    }

    //获取用户关联表记录
    getUserJoinRecord(join,where){
      return this.model('user').join(join).where(where).find();
    }

    //获取用户列表关联表记录
    getUserListJoinRecord(where,page,pagesize){
      return this.model('user').field("*,li_user.id as uid").join({
           manage_role: {on: "role, id"}
       }).where(where).page(page,pagesize).select();
    }

    //获取主题列表关联表记录
    getTopicListJoinRecord(page,pagesize){
      return this.model('topic').page(page,pagesize).select();
    }
}
