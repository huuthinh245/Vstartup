# RemsApi.FeedbackApi

All URIs are relative to *https://vishome.com.vn/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**postFeedback**](FeedbackApi.md#postFeedback) | **POST** /feedback | 


<a name="postFeedback"></a>
# **postFeedback**
> Feedback postFeedback(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.FeedbackApi();

var opts = { 
  'body': new RemsApi.Feedback() // Feedback | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postFeedback(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Feedback**](Feedback.md)|  | [optional] 

### Return type

[**Feedback**](Feedback.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

