# RemsApi.SettingApi

All URIs are relative to *http://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changeLanguage**](SettingApi.md#changeLanguage) | **POST** /setting/language/{lang} | 


<a name="changeLanguage"></a>
# **changeLanguage**
> Setting changeLanguage(lang)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.SettingApi();

var lang = "lang_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.changeLanguage(lang, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **lang** | **String**|  | 

### Return type

[**Setting**](Setting.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

