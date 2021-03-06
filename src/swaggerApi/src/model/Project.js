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
    define(['ApiClient', 'model/Coordinate', 'model/ProjectType', 'model/User', 'model/Utility'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Coordinate'), require('./ProjectType'), require('./User'), require('./Utility'));
  } else {
    // Browser globals (root is window)
    if (!root.RemsApi) {
      root.RemsApi = {};
    }
    root.RemsApi.Project = factory(root.RemsApi.ApiClient, root.RemsApi.Coordinate, root.RemsApi.ProjectType, root.RemsApi.User, root.RemsApi.Utility);
  }
}(this, function(ApiClient, Coordinate, ProjectType, User, Utility) {
  'use strict';




  /**
   * The Project model module.
   * @module model/Project
   * @version 1.0.0
   */

  /**
   * Constructs a new <code>Project</code>.
   * @alias module:model/Project
   * @class
   */
  var exports = function() {
    var _this = this;





























  };

  /**
   * Constructs a <code>Project</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Project} obj Optional instance to populate.
   * @return {module:model/Project} The populated <code>Project</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('author_id')) {
        obj['author_id'] = ApiClient.convertToType(data['author_id'], 'Number');
      }
      if (data.hasOwnProperty('type_id')) {
        obj['type_id'] = ApiClient.convertToType(data['type_id'], 'Number');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ProjectType.constructFromObject(data['type']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'Number');
      }
      if (data.hasOwnProperty('excerpt')) {
        obj['excerpt'] = ApiClient.convertToType(data['excerpt'], 'Number');
      }
      if (data.hasOwnProperty('body')) {
        obj['body'] = ApiClient.convertToType(data['body'], 'Number');
      }
      if (data.hasOwnProperty('thumb')) {
        obj['thumb'] = ApiClient.convertToType(data['thumb'], 'String');
      }
      if (data.hasOwnProperty('thumb_map')) {
        obj['thumb_map'] = ApiClient.convertToType(data['thumb_map'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], ['String']);
      }
      if (data.hasOwnProperty('featured')) {
        obj['featured'] = ApiClient.convertToType(data['featured'], 'Boolean');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'String');
      }
      if (data.hasOwnProperty('block')) {
        obj['block'] = ApiClient.convertToType(data['block'], 'Number');
      }
      if (data.hasOwnProperty('floor')) {
        obj['floor'] = ApiClient.convertToType(data['floor'], 'Number');
      }
      if (data.hasOwnProperty('apartment')) {
        obj['apartment'] = ApiClient.convertToType(data['apartment'], 'Number');
      }
      if (data.hasOwnProperty('project_status')) {
        obj['project_status'] = ApiClient.convertToType(data['project_status'], 'String');
      }
      if (data.hasOwnProperty('start_date')) {
        obj['start_date'] = ApiClient.convertToType(data['start_date'], 'String');
      }
      if (data.hasOwnProperty('finish_date')) {
        obj['finish_date'] = ApiClient.convertToType(data['finish_date'], 'String');
      }
      if (data.hasOwnProperty('product_status')) {
        obj['product_status'] = ApiClient.convertToType(data['product_status'], 'String');
      }
      if (data.hasOwnProperty('video')) {
        obj['video'] = ApiClient.convertToType(data['video'], 'String');
      }
      if (data.hasOwnProperty('address')) {
        obj['address'] = ApiClient.convertToType(data['address'], 'String');
      }
      if (data.hasOwnProperty('commission')) {
        obj['commission'] = ApiClient.convertToType(data['commission'], 'Number');
      }
      if (data.hasOwnProperty('coordinate')) {
        obj['coordinate'] = Coordinate.constructFromObject(data['coordinate']);
      }
      if (data.hasOwnProperty('utility')) {
        obj['utility'] = Utility.constructFromObject(data['utility']);
      }
      if (data.hasOwnProperty('agency')) {
        obj['agency'] = ApiClient.convertToType(data['agency'], [User]);
      }
      if (data.hasOwnProperty('link_share')) {
        obj['link_share'] = ApiClient.convertToType(data['link_share'], 'String');
      }
      if (data.hasOwnProperty('investor')) {
        obj['investor'] = ApiClient.convertToType(data['investor'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * @member {Number} author_id
   */
  exports.prototype['author_id'] = undefined;
  /**
   * @member {Number} type_id
   */
  exports.prototype['type_id'] = undefined;
  /**
   * @member {module:model/ProjectType} type
   */
  exports.prototype['type'] = undefined;
  /**
   * @member {Number} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {Number} excerpt
   */
  exports.prototype['excerpt'] = undefined;
  /**
   * @member {Number} body
   */
  exports.prototype['body'] = undefined;
  /**
   * @member {String} thumb
   */
  exports.prototype['thumb'] = undefined;
  /**
   * @member {String} thumb_map
   */
  exports.prototype['thumb_map'] = undefined;
  /**
   * @member {Array.<String>} image
   */
  exports.prototype['image'] = undefined;
  /**
   * @member {Boolean} featured
   */
  exports.prototype['featured'] = undefined;
  /**
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {String} price
   */
  exports.prototype['price'] = undefined;
  /**
   * @member {Number} block
   */
  exports.prototype['block'] = undefined;
  /**
   * @member {Number} floor
   */
  exports.prototype['floor'] = undefined;
  /**
   * @member {Number} apartment
   */
  exports.prototype['apartment'] = undefined;
  /**
   * @member {String} project_status
   */
  exports.prototype['project_status'] = undefined;
  /**
   * @member {String} start_date
   */
  exports.prototype['start_date'] = undefined;
  /**
   * @member {String} finish_date
   */
  exports.prototype['finish_date'] = undefined;
  /**
   * @member {String} product_status
   */
  exports.prototype['product_status'] = undefined;
  /**
   * @member {String} video
   */
  exports.prototype['video'] = undefined;
  /**
   * @member {String} address
   */
  exports.prototype['address'] = undefined;
  /**
   * @member {Number} commission
   */
  exports.prototype['commission'] = undefined;
  /**
   * @member {module:model/Coordinate} coordinate
   */
  exports.prototype['coordinate'] = undefined;
  /**
   * @member {module:model/Utility} utility
   */
  exports.prototype['utility'] = undefined;
  /**
   * @member {Array.<module:model/User>} agency
   */
  exports.prototype['agency'] = undefined;
  /**
   * @member {String} link_share
   */
  exports.prototype['link_share'] = undefined;
  /**
   * @member {String} investor
   */
  exports.prototype['investor'] = undefined;



  return exports;
}));


