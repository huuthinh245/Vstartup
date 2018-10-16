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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Agency', 'model/City', 'model/Contact', 'model/Coordinate', 'model/Direction', 'model/District', 'model/Feedback', 'model/GenericError', 'model/GenericSuscess', 'model/ListCity', 'model/ListOption', 'model/Login', 'model/LoginView', 'model/Method', 'model/PriceUnit', 'model/Project', 'model/ProjectList', 'model/ProjectType', 'model/Realty', 'model/RealtyKeyword', 'model/RealtyList', 'model/RealtyMap', 'model/RealtyProject', 'model/RealtyType', 'model/Setting', 'model/User', 'model/UserRegister', 'model/UserSocial', 'model/Utility', 'model/Ward', 'api/AgencyApi', 'api/AuthApi', 'api/ContactApi', 'api/FeedbackApi', 'api/ListApi', 'api/ProjectApi', 'api/RealtyApi', 'api/SettingApi', 'api/UserApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/Agency'), require('./model/City'), require('./model/Contact'), require('./model/Coordinate'), require('./model/Direction'), require('./model/District'), require('./model/Feedback'), require('./model/GenericError'), require('./model/GenericSuscess'), require('./model/ListCity'), require('./model/ListOption'), require('./model/Login'), require('./model/LoginView'), require('./model/Method'), require('./model/PriceUnit'), require('./model/Project'), require('./model/ProjectList'), require('./model/ProjectType'), require('./model/Realty'), require('./model/RealtyKeyword'), require('./model/RealtyList'), require('./model/RealtyMap'), require('./model/RealtyProject'), require('./model/RealtyType'), require('./model/Setting'), require('./model/User'), require('./model/UserRegister'), require('./model/UserSocial'), require('./model/Utility'), require('./model/Ward'), require('./api/AgencyApi'), require('./api/AuthApi'), require('./api/ContactApi'), require('./api/FeedbackApi'), require('./api/ListApi'), require('./api/ProjectApi'), require('./api/RealtyApi'), require('./api/SettingApi'), require('./api/UserApi'));
  }
}(function(ApiClient, Agency, City, Contact, Coordinate, Direction, District, Feedback, GenericError, GenericSuscess, ListCity, ListOption, Login, LoginView, Method, PriceUnit, Project, ProjectList, ProjectType, Realty, RealtyKeyword, RealtyList, RealtyMap, RealtyProject, RealtyType, Setting, User, UserRegister, UserSocial, Utility, Ward, AgencyApi, AuthApi, ContactApi, FeedbackApi, ListApi, ProjectApi, RealtyApi, SettingApi, UserApi) {
  'use strict';

  /**
   * ERROR_UNKNOWN.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var RemsApi = require('index'); // See note below*.
   * var xxxSvc = new RemsApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new RemsApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new RemsApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new RemsApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 1.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The Agency model constructor.
     * @property {module:model/Agency}
     */
    Agency: Agency,
    /**
     * The City model constructor.
     * @property {module:model/City}
     */
    City: City,
    /**
     * The Contact model constructor.
     * @property {module:model/Contact}
     */
    Contact: Contact,
    /**
     * The Coordinate model constructor.
     * @property {module:model/Coordinate}
     */
    Coordinate: Coordinate,
    /**
     * The Direction model constructor.
     * @property {module:model/Direction}
     */
    Direction: Direction,
    /**
     * The District model constructor.
     * @property {module:model/District}
     */
    District: District,
    /**
     * The Feedback model constructor.
     * @property {module:model/Feedback}
     */
    Feedback: Feedback,
    /**
     * The GenericError model constructor.
     * @property {module:model/GenericError}
     */
    GenericError: GenericError,
    /**
     * The GenericSuscess model constructor.
     * @property {module:model/GenericSuscess}
     */
    GenericSuscess: GenericSuscess,
    /**
     * The ListCity model constructor.
     * @property {module:model/ListCity}
     */
    ListCity: ListCity,
    /**
     * The ListOption model constructor.
     * @property {module:model/ListOption}
     */
    ListOption: ListOption,
    /**
     * The Login model constructor.
     * @property {module:model/Login}
     */
    Login: Login,
    /**
     * The LoginView model constructor.
     * @property {module:model/LoginView}
     */
    LoginView: LoginView,
    /**
     * The Method model constructor.
     * @property {module:model/Method}
     */
    Method: Method,
    /**
     * The PriceUnit model constructor.
     * @property {module:model/PriceUnit}
     */
    PriceUnit: PriceUnit,
    /**
     * The Project model constructor.
     * @property {module:model/Project}
     */
    Project: Project,
    /**
     * The ProjectList model constructor.
     * @property {module:model/ProjectList}
     */
    ProjectList: ProjectList,
    /**
     * The ProjectType model constructor.
     * @property {module:model/ProjectType}
     */
    ProjectType: ProjectType,
    /**
     * The Realty model constructor.
     * @property {module:model/Realty}
     */
    Realty: Realty,
    /**
     * The RealtyKeyword model constructor.
     * @property {module:model/RealtyKeyword}
     */
    RealtyKeyword: RealtyKeyword,
    /**
     * The RealtyList model constructor.
     * @property {module:model/RealtyList}
     */
    RealtyList: RealtyList,
    /**
     * The RealtyMap model constructor.
     * @property {module:model/RealtyMap}
     */
    RealtyMap: RealtyMap,
    /**
     * The RealtyProject model constructor.
     * @property {module:model/RealtyProject}
     */
    RealtyProject: RealtyProject,
    /**
     * The RealtyType model constructor.
     * @property {module:model/RealtyType}
     */
    RealtyType: RealtyType,
    /**
     * The Setting model constructor.
     * @property {module:model/Setting}
     */
    Setting: Setting,
    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User: User,
    /**
     * The UserRegister model constructor.
     * @property {module:model/UserRegister}
     */
    UserRegister: UserRegister,
    /**
     * The UserSocial model constructor.
     * @property {module:model/UserSocial}
     */
    UserSocial: UserSocial,
    /**
     * The Utility model constructor.
     * @property {module:model/Utility}
     */
    Utility: Utility,
    /**
     * The Ward model constructor.
     * @property {module:model/Ward}
     */
    Ward: Ward,
    /**
     * The AgencyApi service constructor.
     * @property {module:api/AgencyApi}
     */
    AgencyApi: AgencyApi,
    /**
     * The AuthApi service constructor.
     * @property {module:api/AuthApi}
     */
    AuthApi: AuthApi,
    /**
     * The ContactApi service constructor.
     * @property {module:api/ContactApi}
     */
    ContactApi: ContactApi,
    /**
     * The FeedbackApi service constructor.
     * @property {module:api/FeedbackApi}
     */
    FeedbackApi: FeedbackApi,
    /**
     * The ListApi service constructor.
     * @property {module:api/ListApi}
     */
    ListApi: ListApi,
    /**
     * The ProjectApi service constructor.
     * @property {module:api/ProjectApi}
     */
    ProjectApi: ProjectApi,
    /**
     * The RealtyApi service constructor.
     * @property {module:api/RealtyApi}
     */
    RealtyApi: RealtyApi,
    /**
     * The SettingApi service constructor.
     * @property {module:api/SettingApi}
     */
    SettingApi: SettingApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi
  };

  return exports;
}));
