# RemsApi.RealtyApi

All URIs are relative to *https://vishome.com.vn/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteFavorite**](RealtyApi.md#deleteFavorite) | **DELETE** /realty/favorite/{realty_id} | 
[**deleteKeyword**](RealtyApi.md#deleteKeyword) | **DELETE** /realty/keyword | 
[**listFavorite**](RealtyApi.md#listFavorite) | **GET** /realty/favorite | 
[**listKeyword**](RealtyApi.md#listKeyword) | **GET** /realty/keyword | 
[**listRealty**](RealtyApi.md#listRealty) | **GET** /realty | 
[**mapRealty**](RealtyApi.md#mapRealty) | **GET** /realty/map | 
[**postFavorite**](RealtyApi.md#postFavorite) | **POST** /realty/favorite | 
[**postRealty**](RealtyApi.md#postRealty) | **POST** /realty | 
[**saveKeyword**](RealtyApi.md#saveKeyword) | **POST** /realty/keyword | 
[**uploadImages**](RealtyApi.md#uploadImages) | **POST** /realty/upload | 
[**viewMapRealty**](RealtyApi.md#viewMapRealty) | **GET** /realty/mapView | 
[**viewRealty**](RealtyApi.md#viewRealty) | **GET** /realty/{id} | 


<a name="deleteFavorite"></a>
# **deleteFavorite**
> GenericSuscess deleteFavorite(realtyId)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var realtyId = 56; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteFavorite(realtyId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **realtyId** | **Number**|  | 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteKeyword"></a>
# **deleteKeyword**
> GenericSuscess deleteKeyword(ids)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var ids = "ids_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.deleteKeyword(ids, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | **String**|  | 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="listFavorite"></a>
# **listFavorite**
> [RealtyList] listFavorite(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var opts = { 
  'page': 56, // Number | 
  'sort': "sort_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listFavorite(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **sort** | **String**|  | [optional] 

### Return type

[**[RealtyList]**](RealtyList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listKeyword"></a>
# **listKeyword**
> [RealtyKeyword] listKeyword()



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listKeyword(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[RealtyKeyword]**](RealtyKeyword.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listRealty"></a>
# **listRealty**
> [RealtyList] listRealty(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.RealtyApi();

var opts = { 
  'page': 56, // Number | 
  'method': 56, // Number | 
  'lat': 8.14, // Number | 
  'lng': 8.14, // Number | 
  'type': 56, // Number | 
  'bathroom': 56, // Number | 
  'bedroom': 56, // Number | 
  'area': "area_example", // String | 
  'price': "price_example", // String | 
  'utils': "utils_example", // String | 
  'authorId': 56, // Number | 
  'userId': 56 // Number | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listRealty(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **Number**|  | [optional] 
 **method** | **Number**|  | [optional] 
 **lat** | **Number**|  | [optional] 
 **lng** | **Number**|  | [optional] 
 **type** | **Number**|  | [optional] 
 **bathroom** | **Number**|  | [optional] 
 **bedroom** | **Number**|  | [optional] 
 **area** | **String**|  | [optional] 
 **price** | **String**|  | [optional] 
 **utils** | **String**|  | [optional] 
 **authorId** | **Number**|  | [optional] 
 **userId** | **Number**|  | [optional] 

### Return type

[**[RealtyList]**](RealtyList.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="mapRealty"></a>
# **mapRealty**
> [RealtyMap] mapRealty(opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.RealtyApi();

var opts = { 
  'method': 56, // Number | 
  'lat': 8.14, // Number | 
  'lng': 8.14, // Number | 
  'type': 56, // Number | 
  'bathroom': 56, // Number | 
  'bedroom': 56, // Number | 
  'area': "area_example", // String | 
  'price': "price_example", // String | 
  'utils': "utils_example", // String | 
  'authorId': 56, // Number | 
  'userId': 56 // Number | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.mapRealty(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **method** | **Number**|  | [optional] 
 **lat** | **Number**|  | [optional] 
 **lng** | **Number**|  | [optional] 
 **type** | **Number**|  | [optional] 
 **bathroom** | **Number**|  | [optional] 
 **bedroom** | **Number**|  | [optional] 
 **area** | **String**|  | [optional] 
 **price** | **String**|  | [optional] 
 **utils** | **String**|  | [optional] 
 **authorId** | **Number**|  | [optional] 
 **userId** | **Number**|  | [optional] 

### Return type

[**[RealtyMap]**](RealtyMap.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="postFavorite"></a>
# **postFavorite**
> RealtyList postFavorite(realtyId)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var realtyId = 56; // Number | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postFavorite(realtyId, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **realtyId** | **Number**|  | 

### Return type

[**RealtyList**](RealtyList.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="postRealty"></a>
# **postRealty**
> Realty postRealty(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var opts = { 
  'body': new RemsApi.Realty() // Realty | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.postRealty(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Realty**](Realty.md)|  | [optional] 

### Return type

[**Realty**](Realty.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="saveKeyword"></a>
# **saveKeyword**
> RealtyKeyword saveKeyword(address, lat, lng, opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var address = "address_example"; // String | 

var lat = 8.14; // Number | 

var lng = 8.14; // Number | 

var opts = { 
  'filter': "filter_example" // String | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.saveKeyword(address, lat, lng, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **address** | **String**|  | 
 **lat** | **Number**|  | 
 **lng** | **Number**|  | 
 **filter** | **String**|  | [optional] 

### Return type

[**RealtyKeyword**](RealtyKeyword.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json

<a name="uploadImages"></a>
# **uploadImages**
> GenericSuscess uploadImages(opts)



### Example
```javascript
var RemsApi = require('rems_api');
var defaultClient = RemsApi.ApiClient.instance;

// Configure API key authorization: Bearer
var Bearer = defaultClient.authentications['Bearer'];
Bearer.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//Bearer.apiKeyPrefix = 'Token';

var apiInstance = new RemsApi.RealtyApi();

var opts = { 
  'images': "/path/to/file.txt" // File | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.uploadImages(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **images** | **File**|  | [optional] 

### Return type

[**GenericSuscess**](GenericSuscess.md)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="viewMapRealty"></a>
# **viewMapRealty**
> [RealtyMap] viewMapRealty(ids)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.RealtyApi();

var ids = "ids_example"; // String | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.viewMapRealty(ids, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | **String**|  | 

### Return type

[**[RealtyMap]**](RealtyMap.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="viewRealty"></a>
# **viewRealty**
> Realty viewRealty(id, opts)



### Example
```javascript
var RemsApi = require('rems_api');

var apiInstance = new RemsApi.RealtyApi();

var id = 56; // Number | 

var opts = { 
  'userId': 56 // Number | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.viewRealty(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **userId** | **Number**|  | [optional] 

### Return type

[**Realty**](Realty.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

