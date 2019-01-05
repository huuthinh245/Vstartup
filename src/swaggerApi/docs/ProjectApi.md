# RemsApi.ProjectApi

All URIs are relative to *https://vishome.com.vn/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listProject**](ProjectApi.md#listProject) | **GET** /project | 
[**viewProject**](ProjectApi.md#viewProject) | **GET** /project/{id} | 


<a name="listProject"></a>
# **listProject**
> [ProjectList] listProject(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.ProjectApi();

var opts = { 
  'page': 56, // Number | 
  'keyword': "keyword_example", // String | 
  'type': 56, // Number | 
  'agencyId': 56 // Number | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listProject(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **keyword** | **String**|  | [optional] 
 **type** | **Number**|  | [optional] 
 **agencyId** | **Number**|  | [optional] 

### Return type

[**[ProjectList]**](ProjectList.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="viewProject"></a>
# **viewProject**
> Project viewProject(id)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.ProjectApi();

var id = 56; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.viewProject(id, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**Project**](Project.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

