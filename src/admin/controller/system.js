'use strict';

import Base from './base.js';

export default class extends Base {
    
    async indexAction() {
        this.assign("title","系统设置");
        let sysdata=await this.model('system').where({id:1}).find();
        this.assign('sysdata',sysdata);
        return this.display();
     }
    async editAction(){
                let mydata =await this.post();
                let rs=await this.model('system').where({id:1}).update(mydata);
                if(rs) return this.success();
    }
}

