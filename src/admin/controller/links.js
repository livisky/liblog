'use strict';
let init = {
    mydb: "links",
    title: "友情链接管理",
    action: "links"
}
import Base from './base.js';
export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {
        let info = {
            db: init.mydb,
            page: this.get("page") || 1,
            pagesize: this.get("pagesize") || 10
        }
        let mydata = await this.model('util').getIndex(info, { flag: 0 });
        this.assign("itemList", mydata.itemList);
        this.assign('pageData', mydata.pageData);
        this.assign("title", init.title);
        this.assign("action", init.action);
        return this.display();
    }
    async listAction() {
            let info = {
                db: init.mydb,
                page: this.get("page") || 1,
                pagesize: this.get("pagesize") || 10
            }
            let mydata = await this.model('util').getList(info);
            this.assign("itemList", mydata.itemList);
            this.assign('pageData', mydata.pageData);
            this.assign("title", init.title);
            this.assign("action", init.action);
            return this.display();
        }
        // 列表页
    async itemAction() {
            let info = {
                db: init.mydb,
                edit: init.edit,
                add: init.add,
                id: this.get('id')
            }
            let mydata = await this.model('util').getItem(info);
            this.assign("title", mydata.title);
            this.assign('item', mydata.item);
            this.assign("action", init.action);
            return this.display();
        }
        //编辑或者新增接口
    async saveAction() {
            let info = {
                db: init.mydb,
                data: this.post(),
                id: this.post('id')
            }
            let mydata = await this.model('util').doSave(info);
            if (mydata.status === 1) return this.success();
        }
        // 更新友情链接状态
    async upstatusAction() {
            let newData = this.post();
            let rs = this.model("links").where({ id: this.post("id") }).update(newData);
            if (rs) return this.success();
        }
        //删除或批量删除接口
    async delsomeAction() {
        let info = {
            db: init.mydb,
            arr: this.post('delarr[]')
        }
        let where = { id: ["IN", info.arr] };
        let rs = await this.model("admin").deleteRecord(info.db, where);
        if (rs) return this.success();
    }

}