'use strict';
import Geetest from 'geetest';
let geetest = new Geetest({
  geetest_id: think.config('geetest.geetest_id'),
  geetest_key: think.config('geetest.geetest_key')
});
export default class extends think.service.base {
  /**
   * init
   * @return {}         []
   */
  init(http){
    super.init(http);
  }
  //初始化
 async register(type){
    //初始
        let register=() =>{
             let deferred = think.defer();
             // 向极验申请一次验证所需的challenge
             geetest.register(function (data) {
                 deferred.resolve({
                     gt: geetest.geetest_id,
                     challenge: data.challenge,
                     success: data.success
                 });
             });
             return deferred.promise;
         }
  return await register();
  }
// 二次服务器验证
  async validate(data,type){
    //验证
    let validate = (data)=>{
      let deferred = think.defer();
      geetest.validate({

        challenge: data.geetest_challenge,
        validate: data.geetest_validate,
        seccode: data.geetest_seccode

      }, function (err, result) {
        console.log(result);
        var data = {status: "success"};

        if (err || !result) {
          console.log(err);
          data.status = "fail";
        }
        deferred.resolve(data);
      });
      return deferred.promise;
    }
    return await validate(data);
  }
}
