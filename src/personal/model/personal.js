'use strict';
/**
 * model
 */
export default class extends think.model.base {

    //保存用户信息
    saveUserInfo(data, where) {
        return this.model('user').where(where).update(data);
    }

    //查找用户
    findUser(where) {
        return this.model('user').where(where).select();
    }

    //返回全部列表
    findAll(db, where) {
        return this.model(db).where(where).select();
    }

    //返回特定记录
    findOne(db, where) {
        return this.model(db).where(where).find();
    }

    //更新数据
    updateRecord(db, where, data) {
        return this.model(db).where(where).update(data);
    }

    //添加数据
    addRecord(db, data) {
        return this.model(db).add(data);
    }

    //添加数据
    deleteRecord(db, where) {
        return this.model(db).where(where).delete();
    }

    decrepoint(where, count) {
        return this.model("user").where(where).decrement('point', count);
    }

    increpoint(where, count) {
        return this.model("user").where(where).increment('point', count);
    }

    getMytopic(where) {
        return this.model('topic').field("*,li_topic.id as tid,li_topic.createtime as mytime").join({
            user: {on: "author,name"}
        }).where(where).select();
    }

    getMycollect(where) {
        return this.model('user_collect').field("*,li_user_collect.createtime as mytime").join({
            user: {on: "author,name"}
        }).where(where).select();
    }

    // 积分排行
    getPointList() {
        return this.model('user').field("id,name,point").order("point desc").limit(10).select();
    }

    // 所有积分排行
    getAllPoint() {
        return this.model('user').field("id,point").order("point desc").select();
    }

    //获取排序后的列表
    getOrderList(db, where) {
        return this.model(db).where(where).order("orders").select();
    }
}