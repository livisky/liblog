'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */
    async __before() {

        // assign后台设置
        let _web = await this.getConfig();
        this.assign('_web', _web);

        //设置CSRF值
        let csrf = await this.session("__CSRF__");
        this.assign("csrf", csrf);

        // 是否登录
        let uinfo = await this.session('uInfo');
        let islogin = (!think.isEmpty(uinfo)) ? 1 : 0;
        this.assign("islogin", islogin);
        if (!think.isEmpty(uinfo)) {
            let logininfo = await this.model('topic').findAll('user', { name: uinfo.name });
            this.assign("logininfo", logininfo[0]);
        }
        //是否登录

        // 获取最新会员
        let memberList = await this.model("topic").getMemberList({ role: 4 }, 9);
        this.assign("memberList", memberList);

        //获取tags
        let tagList = await this.model("topic").getOrderList("tags", { appear: 1 });
        this.assign('tagList', tagList);

        //获取导航链接
        let navList = await this.model("topic").getOrderList('menu', { appear: 1 });
        this.assign("navList", navList);

        //获取友情链接
        let linksList = await this.model("topic").getOrderList("links", { flag: 1 });
        this.assign("linksList", linksList);

        // 设置主题地址
        this.THEME_VIEW_PATH = `${think.THEME_PATH}${think.sep}${_web.theme}${think.sep}${think.Modules_Src}${think.sep}${this.http.module}${think.sep}`;
        this.assign("theme_url", 'static/theme/' + _web.theme + '/res');

    }
    async getConfig() {
        let sysdata = await this.model('topic').findOne('system', { id: 1 });
        return sysdata;
    }

    // 渲染主题view层
    async displayView(name) {
        return this.display(this.THEME_VIEW_PATH + name + '.html');
    }
}