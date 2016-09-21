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
  point:{
      addcollect:1,
      addtopic:5,
      addcomment:3
  },
  resource_reg: /^(static\/|theme\/|[^\/]+\.(?!js|html|xml)\w+$)/,
};
