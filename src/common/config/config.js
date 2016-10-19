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
     on:true,//true上传oss服务器，false上传应用服务器
     domain: "http://statics.jsout.com",
     img_url:"static/upload/pics/",
     region: 'oss-cn-shanghai',
     accessKeyId: 'LTAIHYb49fOa6fS6',
     accessKeySecret: 'iemKN1qFkwbz1QP1Uhho8G9oNBFcGM',
     bucket: 'jsout'
  },
  point:{
      addcollect:1,
      addtopic:5,
      addcomment:3
  },
  resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/,
};
