# RemsApi.AgencyApi

All URIs are relative to *http://rems.dfm-engineering.com/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listAgency**](AgencyApi.md#listAgency) | **GET** /agency | 
[**viewAgency**](AgencyApi.md#viewAgency) | **GET** /agency/{id} | 


<a name="listAgency"></a>
# **listAgency**
> [Agency] listAgency(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.AgencyApi();

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
apiInstance.listAgency(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **keyword** | **String**|  | [optional] 

### Return type

[**[Agency]**](Agency.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="viewAgency"></a>
# **viewAgency**
> Agency viewAgency(id)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.AgencyApi();

var id = 56; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.viewAgency(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**Agency**](Agency.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

