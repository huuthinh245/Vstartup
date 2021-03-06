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
    root.RemsApi.GenericSuscess = factory(root.RemsApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GenericSuscess model module.
   * @module model/GenericSuscess
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>GenericSuscess</code>.
   * @alias module:model/GenericSuscess
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>GenericSuscess</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GenericSuscess} obj Optional instance to populate.
   * @return {module:model/GenericSuscess} The populated <code>GenericSuscess</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('ids')) {
        obj['ids'] = ApiClient.convertToType(data['ids'], ['Number']);
      }
    }
    return obj;
  }

  /**
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {Array.<Number>} ids
   */
  exports.prototype['ids'] = undefined;



  return exports;
}));


