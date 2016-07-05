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
      host: 'localhost',
      port: '3306',
      database: 'liblog',
      user: 'root',
      password: 'root',
      prefix: 'li_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};
