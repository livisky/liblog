'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  adapter: {
    mysql: {
      host: '139.196.185.229',
      port: '3306',
      database: 'online',
      user: 'root',
      password: '6286871',
      prefix: 'li_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};