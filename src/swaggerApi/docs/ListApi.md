# RemsApi.ListApi

All URIs are relative to *https://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**city**](ListApi.md#city) | **GET** /list/city | 
[**option**](ListApi.md#option) | **GET** /list/option | 


<a name="city"></a>
# **city**
> ListCity city()



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.ListApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.city(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ListCity**](ListCity.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="option"></a>
# **option**
> ListOption option()



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.ListApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.option(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**ListOption**](ListOption.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

