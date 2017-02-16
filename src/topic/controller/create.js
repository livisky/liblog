'use strict';
import fs from "fs";
import path from "path";
import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
       this.assign("title","新建主题");
       let uinfo=await this.session('uInfo');
       if(!think.isEmpty(uinfo)){
           let upic=await this.model("topic").getUserPic({name:uinfo.name});
           let itemList=await this.model("topic").findAll("topic_item");
           this.assign('itemList',itemList);
           this.assign('uinfo',uinfo);
           this.assign('upic',upic.pic);
           return this.displayView("create_index");
       }else {
         return this.redirect('/login.html');
       }
  }

  async doaddAction(){   //编辑或者新增主题
      let mycreatetime=think.datetime(this.post('createtime'));
      let updatetime=think.datetime(this.post('updatetime'));
      let data=await this.post();
      data.createtime=mycreatetime;
      data.updatetime=updatetime;
      if(!think.isEmpty(this.post("id"))){
          let rs=await this.model("topic").updateRecord("topic",{id:data.id},data);
          if(rs) return this.success();
      }else{
          let rs=await this.model("topic").addRecord("topic",data);
          let points=await this.model("topic").increpoint({name:data.author},this.config('point.addtopic'));
          if(rs) return this.success();
      }
  }

  async editAction(){
    this.assign("title","编辑主题");
    let myid=this.get("tid");
    let uinfo=await this.session('uInfo');
    if(!think.isEmpty(uinfo)){
        let topicInfo=await this.model("topic").findOne("topic",{id:myid,author:uinfo.name});
        if(!think.isEmpty(topicInfo)){
          let upic=await this.model("topic").getUserPic({name:uinfo.name});
          this.assign('upic',upic.pic);
          let itemList=await this.model("topic").findAll("topic_item");
          this.assign('uinfo',uinfo);
          this.assign("topicInfo",topicInfo)
          this.assign("itemList",itemList)
          return this.displayView("create_edit");
        }else {
          return this.displayView("../common/error_404");
        }
    }else {
      return this.redirect('/login.html');
    }
  }

  async savereplyAction(){
    //编辑或者新增回复
    let marked = require('marked');
    marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
      let mycreatetime=think.datetime(this.post('createtime'));
      let data=await this.post();
      data.createtime=mycreatetime;
      if(data.text===''){
        return this.json({status:0,errno:1,errmsg:'回复不能为空！'});
      }else{
        // 解析markdown
        let html=marked(data.comment);
        // data.comment=html;
        if(!think.isEmpty(data.id)){
          //编辑
          let isexist=await this.model("topic").findOne("topic_comment",{id:data.id});
          let tid=await this.model("topic").findOne("topic",{id:data.tid});
          if(!think.isEmpty(isexist)&&!think.isEmpty(tid)){
            //更新最后回复数据
            let updata={
              updatetime:mycreatetime,
              updateauthor:data.author,
              updatepic:data.pic
            }
            let updatetime=await this.model("topic").updateRecord("topic",{id:data.tid},updata);
            //更新最后回复数据
            // 更新回复
            let rs=await this.model("topic").updateRecord("topic_comment",{id:data.id},data);
            if(rs) return this.success();
          }else{
            return this.fail("该主题或回复不存在或已删除！");
          }
        }else{
          //更新最后回复数据
          let updata={
            updatetime:mycreatetime,
            updateauthor:data.author,
            updatepic:data.pic
          }
          let updatetime=await this.model("topic").updateRecord("topic",{id:data.tid},updata);
          //更新最后回复数据
          //增加
          let rs=await this.model("topic_comment").add(data);
          // 增加积分
          let points=await this.model("topic").increpoint({name:data.author},this.config('point.addcomment'));
          // 增加回复数
          let replycount=await this.model("topic").where({id:data.tid}).increment('replycount',1);
          if(rs) return this.success();
        }
      }
  }

  async postlikeAction(){
      let data=await this.post();
      let liker=data.likers;
      let myid=data.id;
      if(!think.isEmpty(myid)){
          let item=await this.model("topic").findOne("topic_comment",{id:myid});
          let arr=(!item.likers)?[]:(item.likers).split(",");
          let likers=arr||[];
          let n=likers.indexOf(liker);
          if(n<0){
            likers.push(liker);
            let newlikers=likers.join(",");
            let m=likers.length;
            let rs=await this.model("topic_comment").where({id:myid}).update({like:m,likers:newlikers});
            if(rs) return this.success({likeCount:m});
          }else{
            likers.splice(n,1);
            let m=likers.length;
            let newlikers=likers.join(",");
            let rs=await this.model("topic_comment").where({id:myid}).update({like:m,likers:newlikers});
            if(rs) return this.success({likeCount:m});
          }
      }
  }

  async removereplyAction(){
      let data=await this.post();
      let myid=data.id;
      if(!think.isEmpty(myid)){
          let rs=await this.model("topic_comment").where({id:myid}).delete();
          // 减少回复数
          let replycount=await this.model("topic").where({id:data.tid}).decrement('replycount',1);
          if(rs) return this.success();
      }
  }

  async removeitemAction(){
      let data=await this.post();
      let myid=data.id;
      if(!think.isEmpty(myid)){
          let rs=await this.model("topic").where({id:myid}).delete();
          if(rs) return this.success();
      }
  }

  //上传图片接口
  async uploadeditorAction()
  {   
      let IS_USE_OSS=think.config('OSS.on');
      if(IS_USE_OSS){
          //上传OSS图片接口
          let ALIOSS = think.service("alioss"); 
          let alioss = new ALIOSS();
          let file = think.extend({}, this.file('img'));
          let rs=await alioss.upload(file);
          if(rs){
              return this.json(think.config('OSS.domain')+"/"+rs.name);
          }else{
              return this.json("上传失败！");
          }
      }else{
          //上传应用服务器图片接口
          let file = think.extend({}, this.file('img'));
          let filepath = file.path;
          let newpath = liFormatDate(new Date().toLocaleDateString());
          let uploadPath = think.UPLOAD_PATH + '/pics/' + newpath;
          think.mkdir(uploadPath);
          let basename = path.basename(filepath);
          fs.renameSync(filepath, uploadPath + basename);
          this.json("/static/upload/pics/" + newpath + basename);
      }
  }

}
