'use strict';
/**
 * config
 */
export default {
    //key: value
    host: "127.0.0.1", //禁止端口访问，如 http://115.29.109.30:8361；删除则不限制。
    port: 8361,
    pagesize: 10,
    route_on: true,
    encoding: "utf-8",
    OSS: {
        on: false, //true上传oss服务器，false上传应用服务器
        domain: "", //例：http://statics.jsout.com
        img_url: "static/upload/pics/",
        region: '', //例：oss-cn-shanghai
        accessKeyId: '', //id
        accessKeySecret: '', //key
        bucket: '' //jsout
    },
    geetest: {
        //极验验证码配置，申请地址：http://www.geetest.com，请改成自己帐号！
        geetest_id: 'a4ba8061bc9741e47980e8b69e9afbf6',
        geetest_key: '4da57a23875809329871b4e0be3a53d6'
    },
    point: {
        addcollect: 1,
        addtopic: 5,
        addcomment: 3
    },
    resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/,
};