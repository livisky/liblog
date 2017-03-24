'use strict';
/**
 * config
 */
export default {
    //key: value
    host: "127.0.0.1",
    domain: "http://www.jsout.dev",
    subdomain: {
        bbs: "topic", //表示将 bbs.example.com 映射到 topic 模块下
    },
    port: 8361,
    pagesize: 10,
    route_on: true,
    encoding: "utf-8",
    OSS: {
        on: true, //true上传oss服务器，false上传应用服务器
        domain: "https://statics.jsout.com",
        img_url: "static/upload/pics/",
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAIHYb49fOa6fS6',
        accessKeySecret: 'iemKN1qFkwbz1QP1Uhho8G9oNBFcGM',
        bucket: 'jsout'
    },
    geetest: {
        //极验验证码配置，申请地址：http://www.geetest.com
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