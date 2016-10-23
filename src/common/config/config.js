'use strict';
/**
 * config
 */
export default {
  //key: value
  port: 8361,
  pagesize: 10,
  route_on: true,
  encoding: "utf-8",
  OSS:{
     on:false,//true上传oss服务器，false上传应用服务器
     domain: "",//例：http://statics.jsout.com
     img_url:"static/upload/pics/",
     region: '',//例：oss-cn-shanghai
     accessKeyId: '',//id
     accessKeySecret: '',//key
     bucket: ''//jsout
  },
  point:{
      addcollect:1,
      addtopic:5,
      addcomment:3
  },
  resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/,
};
