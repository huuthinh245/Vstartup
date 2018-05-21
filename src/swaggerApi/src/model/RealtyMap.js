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
    define(['ApiClient', 'model/Coordinate'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Coordinate'));
  } else {
    // Browser globals (root is window)
    if (!root.RemsApi) {
      root.RemsApi = {};
    }
    root.RemsApi.RealtyMap = factory(root.RemsApi.ApiClient, root.RemsApi.Coordinate);
  }
}(this, function(ApiClient, Coordinate) {
  'use strict';




  /**
   * The RealtyMap model module.
   * @module model/RealtyMap
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>RealtyMap</code>.
   * @alias module:model/RealtyMap
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>RealtyMap</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/RealtyMap} obj Optional instance to populate.
   * @return {module:model/RealtyMap} The populated <code>RealtyMap</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('coordinate')) {
        obj['coordinate'] = Coordinate.constructFromObject(data['coordinate']);
      }
      if (data.hasOwnProperty('is_favorite')) {
        obj['is_favorite'] = ApiClient.convertToType(data['is_favorite'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {module:model/Coordinate} coordinate
   */
  exports.prototype['coordinate'] = undefined;
  /**
   * @member {Number} is_favorite
   */
  exports.prototype['is_favorite'] = undefined;



  return exports;
}));


