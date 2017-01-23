'use strict';
/**
 * model
 */
export default class extends think.model.base {
    //返回全部列表
    findAll(db, where) {
            return this.model(db).where(where).select();
        }
        //返回特定记录
    findOne(db, where) {
        return this.model(db).where(where).find();
    }
    getOneArticle(db, where) {
            return this.model(db).where(where).find();
        }
        //获取友情链接列表
    getLinksList() {
        return this.model("links").where({ flag: 1 }).order("orders").select();
    }

}