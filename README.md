# Range Wizard API
Web Client: [range-wizard.now.sh/](https://range-wizard.now.sh/)
Client code base: [https://github.com/djllap/range-wizard-client](https://github.com/djllap/range-wizard-client)


The Range wizard API is a RESTful API for creating and accessing poker hand ranges. It is the back end of the Range Wizard web app linked above

## Endpoints
Base URL:  https://range-wizard.herokuapp.com/api

~~____________________________________________________~~

**URL**: /charts
**Method**: GET
Used to retrieve all charts

**Success Response**
> **Code** : `200 OK`
> ```json
> [
> {"id":24,"chart_name":"Tight 6-max"},
>  {"id":1,"chart_name":"Basic Range"}
> ]
> ```
**Error Response**
This is an open endpoint without possible user error.

~~____________________________________________________~~

**URL**: /charts
**Method**: POST
Used to Create a new chart

**Headers**:
key| value
--- | --- | ---
Accept | application/json 
Content-Type | application-json
**Data Example**
```json
{"chart_name":"chart 12"}
```
**Success Response**
> **Code** : `200 OK`
> **Content Example**
> ```json
> {
>   "id":12,
>   "chart_name":"chart 12"
> }
> ```
**Error Response**
*If data does not include `"chart_name"`*
> **Code** : `400 Chart name must be included`

~~____________________________________________________~~

**URL**: /charts/:id
**Method**: GET
Used to retrieve a chart by its `id`

**Success Response**
> **Code** : `200 OK`
> **Content Example**
> ```json
> {
>   "id":12,
>   "chart_name":"chart 12"
> }
> ```
**Error Response**
*If `id` does not match a chart`*
> **Code** : `404 Not found`
> **Data**:
>  ```json
> {
>   "error": "Chart doesn't exist"
> }
> ```

~~____________________________________________________~~

**URL**: /charts/:id
**Method**: DELETE
Used to delete chart by its `id`

**Success Response**
> **Code** : `204 No content`

**Error Response**
*If `id` does not match a chart`*
> **Code** : `404 Not found`
> **Data**:
>  ```json
> {
>   "error": "Chart doesn't exist"
> }
> ```

~~____________________________________________________~~

**URL**: /charts
**Method**: PATCH
Used to update an existing chart

**Headers**:
key| value
--- | --- | ---
Accept | application/json 
Content-Type | application-json
**Data Example**
```json
{"chart_name":"updated chart name"}
```
**Success Response**
> **Code** : `200 OK`
> **Content Example**
> ```json
> {
>   "id":12,
>   "chart_name": "updated chart name"
> }
> ```
**Error Response**
*If data does not include `"chart_name"`*
> **Code** : `400 Chart name must be included`

*If `id` does not match a chart
> **Code** : `404 Not found`
> **Data**:
>  ```json
> {
>   "error": "Chart doesn't exist"
> }
> ```

~~____________________________________________________~~

**URL**: /ranges
**Method**: GET
Used to retrieve all ranges

**Success Response**
> **Code** : `200 OK`
> ```json
> [
>   {
>     "id": 25,
>     "range_name": "Range name",
>     "color": "#3333ff",
>     "coords": ["0,0", "1,1", "2,2", "3,3", "4,4", "5,5"]
>   },
>   ...
> ]
> ```
**Error Response**
This is an open endpoint without possible user error.

~~____________________________________________________~~

**URL**: /ranges
**Method**: POST
Used to Create 1 or more new ranges. Adding even a single range must be placed in an array.

**Headers**:
key| value
--- | --- | ---
Accept | application/json 
Content-Type | application-json
**Data Example**
```json
[
	{
		"chart_id": 1,
		"color": "#3333ff",
		"coords": ["0,0", "0,1", "0,2"],
		"range_name": "Range 1"
	},
	{
		"chart_id": 1,
		"color": "#ff33ff",
		"coords": ["1,0", "1,1", "1,2"],
		"range_name": "Range 2"
	}
]
```
**Success Response**
> **Code** : `200 OK`
> **Content Example**
> ```json
> {
>     "id": 44,
>     "range_name": "new range name",
>     "color": "#3333ff",
>     "coords": ["0,0", "1,1", "2,2", "3,3", "4,4", "5,5"]
> }
> ```
**Error Response**
*if `range_name`, `color`, or `coords` not present*
> **Code** : `400 [element name] must be included`

~~____________________________________________________~~

**URL**: /ranges/:id
**Method**: PATCH
Used to edit a range by its `id`. All fields (except id) must be present in the body.

**Headers**:
key| value
--- | --- | ---
Accept | application/json 
Content-Type | application-json
**Data Example**
```json

{
	"chart_id": 1,
	"color": "#3333ff",
	"coords": ["0,0", "0,1", "0,2"],
	"range_name": "updated Range 1"
}
```
**Success Response**
> **Code** : `200 OK`
> **Content Example**
> ```json
> {
>   [
>     "id": 44,
>     "range_name": "updated range 1",
>     "color": "#3333ff",
>     "coords": ["0,0", "0,1", "0,2"]
>   ]
> }
> ```
**Error Response**
*if `range_name`, `color`, or `coords` not present*
> **Code** : `400 [element name] must be included`

~~____________________________________________________~~

**URL**: /ranges/:id
**Method**: DELETE
Used to delete range by its `id`

**Success Response**
> **Code** : `204 No content`

**Error Response**
*If `id` does not match a range`*
> **Code** : `404 Not found`
> **Data**:
>  ```json
> {
>   "error": "Range doesn't exist"
> }
> ```