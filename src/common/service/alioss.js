'use strict';
import path from "path";
export default class extends think.service.base {
    /**
     * init
     * @return {}         []
     */
    init(http) {
            super.init(http);
        }
        //初始化
    upload(imgobj) {
        var co = require('co');
        var OSS = require('ali-oss')
        var client = new OSS.Wrapper({
            region: think.config('OSS.region'),
            accessKeyId: think.config('OSS.accessKeyId'),
            accessKeySecret: think.config('OSS.accessKeySecret'),
            bucket: think.config('OSS.bucket')
        });
        let filepath = imgobj.path;
        let basename = path.basename(filepath);
        let newpath = liFormatDate(new Date().toLocaleDateString());
        let uploadPath = think.config('OSS.img_url') + newpath + basename;

        return new Promise(function(resolve, reject) {
            let result = client.put(uploadPath, filepath);
            if (result) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    }
}