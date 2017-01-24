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
        //更新数据
    updateRecord(db, where, data) {
            return this.model(db).where(where).update(data);
        }
        //添加数据
    addRecord(db, data) {
        return this.model(db).add(data);
    }

    getTopicOneJoinRecord(tid) {
        return this.model('topic').field("*,li_topic.id as tid").where({ tid: tid }).join({
            topic_item: { on: "item,name" }
        }).find();
    }

    getReplyListInfo(where) {
        return this.model('topic_comment').field("*,li_topic_comment.id as tid,li_topic_comment.createtime as mytime").where(where).join({
            user: { on: "author,name" }
        }).select();
    }

    getTopicListJoinRecord(where) {
        return this.model('topic').field("*,li_topic.id as tid,li_topic.createtime as mytime").join({
            user: { on: "author,name" },
            topic_item: { on: "item,name" }
        }).where(where).order("mytime DESC").select();
    }

    //分页初始数据
    getPageSelect(where, page, pagesize) {
            return this.model('topic').field("*,li_topic.id as tid").join({
                user: { on: "author,name" },
                topic_item: { on: "item,name" }
            }).where(where).order("li_topic.createtime DESC").page(page, pagesize).select();
        }
        //分页thinkjs分页数据
    getPageCountSelect(where, page, pagesize) {
        return this.model('topic').field("*,li_topic.id as tid").join({
            user: { on: "author,name" },
            topic_item: { on: "item,name" }
        }).where(where).order("li_topic.createtime DESC").page(page, pagesize).countSelect();
    }

    getMemberList(where, limit) {
        return this.model('user').where(where).order("createtime DESC").limit(limit).select();
    }

    decrepoint(where, count) {
        return this.model("user").where(where).decrement('point', count);
    }

    increpoint(where, count) {
        return this.model("user").where(where).increment('point', count);
    }

    getUserPic(where) {
            return this.model("user").field("pic").where(where).find();
        }
        //获取排序后的列表
    getOrderList(db, where) {
        return this.model(db).where(where).order("orders").select();
    }
}