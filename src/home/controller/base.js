'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
    async __before() {
        await this.getConfig();
        //设置CSRF值
        let csrf=await this.session("__CSRF__");
        this.assign("csrf",csrf);

        //获取tags
        let tagList=await this.model("home").findAll('tags',{appear:1});
        this.assign('tagList',tagList);

        //获取图文推荐列表
        let picrecomList=await this.model("home").getArticleList({topicrecom:1,ispublished:1});
        this.assign("picrecomList",picrecomList);

        //获取站长推荐列表
        let torecomList=await this.model("home").getArticleList({torecom:1,ispublished:1});
        this.assign("torecomList",torecomList);

        //获取点击排行列表
        let popularList=await this.model("home").getPopularList({ispublished:1});
        this.assign("popularList",popularList);

         //获取最新文章列表
        let newestList=await this.model("home").getArticleList({ispublished:1})
        this.assign("newestList",newestList);

        //获取导航链接
        let navList=await this.model("home").findAll('menu');
        this.assign("navList",navList);

    }
    async getConfig() {
        let sysdata=await this.model("home").findOne('system');
        this.assign('_web',sysdata);
    }
}
