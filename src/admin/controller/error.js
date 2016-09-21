'use strict';
import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
      async nopermissionAction(){
          this.assign("title","访问受限!");
          return this.display();
      }
}
