'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    
   async __before() {
        //判断登陆
        let userinfo=await this.session("userInfo");
        if(think.isEmpty(userinfo)){
            return this.redirect("/login/redirect");
        }else{
            this.assign('userinfo',userinfo);
        }  
        //判断登陆        
              
    }    
    async indexAction(){
        

        var menu=[

            {
                menu_title:'文章管理',
                link:'/admin/content',
                active:""
            },            
            {
                menu_title:'分类管理',
                link:'/admin/taglist/index',
                active:""
            },  
            {
                menu_title:'用户管理',
                link:'/admin/user_list/index',
                active:""
            },              
            {
                menu_title:'系统设置',
                link:'/admin/system',
                active:""
            }
        ]
        this.assign('menu',menu);
        console.log(menu);
    }
}