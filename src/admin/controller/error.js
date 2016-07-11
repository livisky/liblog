'use strict';
import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
      async nopermissionAction(){
          this.assign("title","没有权限访问！");
          return this.display();
      }
}
