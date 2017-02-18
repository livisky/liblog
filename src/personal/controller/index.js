'use strict';

import Base from './base.js';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        this.assign("title", "个人中心");
        let uinfo = await this.session('uInfo');
        let uname = await this.get('uname');
        let isself, isselftag;
        if (!think.isEmpty(uname)) {
            // 是否登录
            let islogin = (!think.isEmpty(uinfo)) ? 1 : 0;
            //是否本人
            if (!think.isEmpty(uinfo)) {
                //登录
                if (uinfo.name === uname) {
                    isselftag = "我的";
                    isself = 1;
                } else {
                    isselftag = "Ta的";
                    isself = 0;
                }
            } else {
                // 未登录
                isselftag = "Ta的";
                isself = 0;
            }
            this.assign("islogin", islogin);
            this.assign("isself", isself);
            this.assign("isselftag", isselftag);
            // 排行
            let pointList = await think.cache("pointList", () => {
                return this.model("personal").getPointList();
            });
            this.assign("pointList", pointList);

            //我的话题
            let topicList = await this.model('personal').getMytopic({ author: uname });
            this.assign("topicList", topicList);

            //我的回复
            let replyList = await this.model('personal').findAll('topic_comment', { author: uname });
            this.assign("replyList", replyList);

            //我的收藏
            let collectList = await this.model('personal').getMycollect({ author: uname });
            this.assign("collectList", collectList);

            let userinfo = await this.model('personal').findAll('user', { name: uname });
            if (!think.isEmpty(userinfo)) {
                // 个人排名
                let ranking = await think.cache("ranking_" + userinfo[0].id);
                if (ranking === undefined) {
                    let allPoints = await this.model("personal").getAllPoint();
                    for (var i = 0; i < allPoints.length; i++) {
                        if (allPoints[i].id == userinfo[0].id) {
                            ranking = i+1;
                            think.cache("ranking_" + userinfo[0].id, ranking);
                            break;
                        }
                    }
                }

                this.assign("ranking", ranking);

                //他人的个人中心基本信息
                this.assign("userinfo", userinfo[0]);
                return this.displayView("index_index");

            } else {
                return this.displayView("../common/error_404");
            }
        } else {
            return this.displayView("../common/error_404");
        }

    }
    async settingAction() {
        return this.displayView("index_setting");
    }

    //收藏/取消收藏接口
    async savecollectAction() {
        let data = await this.post();
        let mycreatetime = think.datetime(this.post("createtime"));
        if (!think.isEmpty(this.post("cid"))) {
            //已收藏，这里取消收藏。
            let rs = await this.model("personal").deleteRecord("user_collect", { id: data.cid });
            let points = await this.model("personal").decrepoint({ name: data.author }, this.config('point.addcollect'));
            if (rs) return this.success({ status: 0, msg: "取消收藏成功！", cid: data.cid });
        } else {
            //未收藏，这里收藏
            data.createtime = mycreatetime;
            let rs = await this.model("personal").addRecord("user_collect", data);
            let points = await this.model("personal").increpoint({ name: data.author }, this.config('point.addcollect'));
            if (rs) return this.success({ status: 1, msg: "收藏成功！", cid: rs });
        }
    }
}