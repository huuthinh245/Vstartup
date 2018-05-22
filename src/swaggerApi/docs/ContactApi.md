# RemsApi.ContactApi

All URIs are relative to *http://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listContact**](ContactApi.md#listContact) | **GET** /contact | 
[**postContact**](ContactApi.md#postContact) | **POST** /contact | 


<a name="listContact"></a>
# **listContact**
> [Contact] listContact(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.ContactApi();

var opts = { 
  'page': 56, // Number | 
  'keyword': "keyword_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listContact(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **keyword** | **String**|  | [optional] 

### Return type

[**[Contact]**](Contact.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="postContact"></a>
# **postContact**
> GenericSuscess postContact(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.ContactApi();

var opts = { 
  'body': new RemsApi.Contact() // Contact | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postContact(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Contact**](Contact.md)|  | [optional] 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

