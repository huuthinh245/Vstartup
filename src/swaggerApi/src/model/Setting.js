/**
 * REMS API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.RemsApi) {
      root.RemsApi = {};
    }
    root.RemsApi.Setting = factory(root.RemsApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Setting model module.
   * @module model/Setting
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Setting</code>.
   * @alias module:model/Setting
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>Setting</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Setting} obj Optional instance to populate.
   * @return {module:model/Setting} The populated <code>Setting</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('lang')) {
        obj['lang'] = ApiClient.convertToType(data['lang'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {String} lang
   */
  exports.prototype['lang'] = undefined;



  return exports;
}));


