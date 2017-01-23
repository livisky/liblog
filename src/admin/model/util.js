'use strict';
export default class extends think.model.base {

    async getIndex(info, where) {

        let itemList = await this.model(info.db).where(where).page(info.page, info.pagesize).select();
        let result = await this.model(info.db).page(info.page, info.pagesize).countSelect();
        let Page = think.adapter("template", "page");
        let page = new Page();
        let pageData = page.pagination(result, info.page);

        return {
            itemList: itemList,
            pageData: pageData
        };
    }
    async getList(info) {

        let itemList = await this.model(info.db).where({
            flag: 1
        }).page(info.page, info.pagesize).select();
        let result = await this.model(info.db).page(info.page, info.pagesize).countSelect();
        let Page = think.adapter("template", "page");
        let page = new Page();
        let pageData = page.pagination(result, info.page);

        return {
            itemList: itemList,
            pageData: pageData
        };
    }
    async getItem(info) {
        let title = "",
            item = {};
        if (info.id) {
            title = info.edit;
            item = await this.model(info.db).where({ id: info.id }).find();
        } else {
            title = info.add;
            item = {}
        }
        return {
            title: title,
            item: item
        }
    }
    async doSave(info) {
        let status = 0
        if (!think.isEmpty(info.id)) {
            let rs = await this.model(info.db).where({ id: info.id }).update(info.data);
            if (rs) status = 1;
        } else {
            let rs = await this.model(info.db).add(info.data);
            if (rs) status = 1;
        }
        return {
            status: status
        }
    }
}