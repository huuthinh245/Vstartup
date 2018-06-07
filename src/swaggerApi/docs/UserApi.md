# RemsApi.UserApi

All URIs are relative to *http://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**forgot**](UserApi.md#forgot) | **POST** /user/forgot | 
[**getUser**](UserApi.md#getUser) | **GET** /user/{id} | 
[**me**](UserApi.md#me) | **GET** /user/me | 
[**updatePassword**](UserApi.md#updatePassword) | **POST** /user/update-password | 
[**updateUser**](UserApi.md#updateUser) | **POST** /user/me | 
[**uploadAvatar**](UserApi.md#uploadAvatar) | **POST** /user/avatar | 


<a name="forgot"></a>
# **forgot**
> GenericSuscess forgot(email)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.UserApi();

var email = "email_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.forgot(email, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **String**|  | 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="getUser"></a>
# **getUser**
> User getUser(id)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.UserApi();

var id = 56; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getUser(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**User**](User.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="me"></a>
# **me**
> User me()



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.UserApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.me(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**User**](User.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updatePassword"></a>
# **updatePassword**
> GenericSuscess updatePassword(currentPassword, newPassword)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.UserApi();

var currentPassword = "currentPassword_example"; // String | 

var newPassword = "newPassword_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updatePassword(currentPassword, newPassword, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **currentPassword** | **String**|  | 
 **newPassword** | **String**|  | 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="updateUser"></a>
# **updateUser**
> LoginView updateUser(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.UserApi();

var opts = { 
  'body': new RemsApi.UserRegister() // UserRegister | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateUser(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserRegister**](UserRegister.md)|  | [optional] 

### Return type

[**LoginView**](LoginView.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="uploadAvatar"></a>
# **uploadAvatar**
> GenericSuscess uploadAvatar(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.UserApi();

var opts = { 
  'avatar': "/path/to/file.txt" // File | upload file avatar
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.uploadAvatar(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **avatar** | **File**| upload file avatar | [optional] 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

