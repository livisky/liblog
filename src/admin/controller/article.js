'use strict';
/**
 * rest controller
 * @type {Class}
 */
export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
    this._method='method';
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  async __before(){
  }
}