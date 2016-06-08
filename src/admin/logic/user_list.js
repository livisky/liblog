'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  async indexAction(){
    // let userModel =await this.model('user');
    //   // 设置分页
    //   let param=this.get();
    //   let page=param.page;
    //   let pagesize=param.pagesize;
    //   if(page){
    //      let userList=await userModel.page(this.get("page"), this.get("pagesize")).select(); 
    //      let pageData = await userModel.page(this.get("page"), this.get("pagesize")).countSelect();
    //      this.assign("nameList",userList);
    //      this.assign("pageData",pageData);
    //      //设置disable
    //      let nextclass='',
    //          nextlink='',
    //          preclass='',
    //          prelink='';
    //      //下一页判断
    //      if(pageData.currentPage===pageData.totalPages){
    //             nextclass='disabled';
    //             nextlink='javascript:void(0)';
    //      }else{
    //          var nextpage=pageData.currentPage+1;
    //              nextclass='';
    //              nextlink='?page='+nextpage+'&pagesize='+pageData.numsPerPage;
    //     }
    //     //上一页判断
    //     if(pageData.currentPage===1){
    //             preclass='disabled';
    //             prelink='javascript:void(0)';
    //      }else{
    //          var prepage=pageData.currentPage-1;
    //              preclass='';
    //              prelink='?page='+prepage+'&pagesize='+pageData.numsPerPage;
    //     }
    //     //页面赋值
    //      this.assign("nextclass",nextclass);
    //      this.assign("preclass",preclass);
    //      this.assign("nextlink",nextlink);
    //      this.assign("prelink",prelink);
    //   }
    //    //设置分页
  }
  __before(){
      
  }  
}