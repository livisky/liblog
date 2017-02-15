'use strict';
import fs from "fs";
import path from "path";
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
    async logoeditAction(){
        let mydata =await this.post();
        if(mydata.name) return this.success();
       
    }
    async setlogoAction(){
        this.assign("title","Logo设置");
        return this.display();
    }
    //上传图片接口
    async uploadAction()
    {

        let IS_USE_OSS=think.config('OSS.on');
        if(IS_USE_OSS){
            //上传OSS图片接口
            let ALIOSS = think.service("alioss");
            let alioss = new ALIOSS();
            let file = think.extend({}, this.file('file'));
            let rs=await alioss.upload(file);
            console.log(rs);
            if(rs){
                return this.json({path: think.config('OSS.domain')+"/"+rs.name});
            }else{
                return this.json("上传失败！");
            }
        }else{
            //上传应用服务器图片接口
            let file = think.extend({}, this.file('file'));
            let filepath = file.path;
            let oldpath = think.UPLOAD_PATH;
            let newpath = oldpath.split('/upload')[0]
            let uploadPath = newpath + '/theme/liblog/res/common/images/common/';
            let basename = path.basename(filepath);
            fs.renameSync(filepath, uploadPath + "logo.jpg");
            this.json({path: "/static/theme/liblog/res/common/images/common/logo.jpg"});
        }
    }
}
