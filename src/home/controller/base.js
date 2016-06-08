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
        let tagList=await this.model("tags").select(); 
        this.assign('tagList',tagList); 
        
        //获取图文推荐列表
        let picrecomList=await this.model("article").where({topicrecom:1,ispublished:1}).limit(5).select();
        this.assign("picrecomList",picrecomList);
        
        //获取站长推荐列表
        let torecomList=await this.model("article").where({torecom:1,ispublished:1}).limit(5).select();
        this.assign("torecomList",torecomList);
        
        //获取点击排行列表
        let popularList=await this.model("article").where({ispublished:1}).order("view DESC").limit(5).select();
        this.assign("popularList",popularList);  
              
         //获取最新文章列表
        let newestList=await this.model("article").where({ispublished:1}).order("createtime DESC").limit(5).select();
        this.assign("newestList",newestList);                 
                
    }
    async getConfig() {
        let sysdata=await this.model('system').where({id:1}).find();
        this.assign('_web',sysdata);
    }
}