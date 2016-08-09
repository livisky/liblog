'use strict';

import Base from './base.js';

export default class extends Base {

    async indexAction() {
        this.assign("title","系统设置");
        let sysdata=await this.model('admin').findOne('system');
        this.assign('sysdata',sysdata);
        return this.display();
     }
    async editAction(){
                let mydata =await this.post();
                let rs=await this.model('admin').updateRecord('system',{id:1},mydata);
                if(rs) return this.success();
    }
    async commenteditAction(){
        let mydata =await this.post();
        let rs=await this.model('admin').updateRecord('system_comment',{id:1},mydata);
        if(rs) return this.success();
    }
    async setcommentAction(){
        this.assign("title","评论设置");
        let sysdata=await this.model('admin').findOne('system_comment',{id:1});
        this.assign('sysdata',sysdata);
        return this.display();
    }
}
