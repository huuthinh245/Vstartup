# RemsApi.AuthApi

All URIs are relative to *https://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**login**](AuthApi.md#login) | **POST** /auth/login | 
[**logout**](AuthApi.md#logout) | **GET** /auth/logout/ | 
[**register**](AuthApi.md#register) | **POST** /auth/register | 
[**registerSocial**](AuthApi.md#registerSocial) | **POST** /auth/register-social | 


<a name="login"></a>
# **login**
> LoginView login(body)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.AuthApi();

var body = new RemsApi.Login(); // Login | The email/password


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.login(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Login**](Login.md)| The email/password | 

### Return type

[**LoginView**](LoginView.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="logout"></a>
# **logout**
> GenericSuscess logout()



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.AuthApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.logout(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="register"></a>
# **register**
> LoginView register(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.AuthApi();

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
apiInstance.register(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserRegister**](UserRegister.md)|  | [optional] 

### Return type

[**LoginView**](LoginView.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="registerSocial"></a>
# **registerSocial**
> LoginView registerSocial(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.AuthApi();

var opts = { 
  'body': new RemsApi.UserSocial() // UserSocial | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.registerSocial(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserSocial**](UserSocial.md)|  | [optional] 

### Return type

[**LoginView**](LoginView.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

