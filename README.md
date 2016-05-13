# nk-node-util
simple Library for nodejs apps.

### Installation

use --save or --save-dev along with following command will save to package.json

```
npm i nk-node-util
```

### Starts (geting package reference)

``` javscript
var pkg = require('./index');
```

- [MVC Url params extractor](#MVC Url params extractor)
- [Encoding and Decoding JSON data] (#Encoding and Decoding JSON data)


### MVC Url params extractor
As now a days we are prety much using mvc based urls for our applications, like....

```
/books/:id => /books/24 (id is '24')

/movies/:moviename => /movies/civil-war (moviename is 'civil-war')

/:category/:categoryId => /food/1234 (category is 'food', categoryId is '1234')
```

Here we will parse that url and return collection of url params and those values, for e.g.,

#### Usage

``` javascript
  var parsed = pkg.parseUrl("/:category/:id", "/books/24");
  console.log(parsed.IsMatch, parsed.Params); // true { category: 'books', id: '24' }
  console.log('selected id : ', parsed.Params.id); //24

  var parsed2 = pkg.parseUrl("/category/:id", "/books/24");
  console.log(parsed2.IsMatch, parsed2.Params); //false {}

  var parsed3 = pkg.parseUrl("/books/:id", "/books/24");
  console.log(parsed3.IsMatch, parsed3.Params); //true { id: '24' }


```


### Encoding and Decoding JSON data

As JSON is  evary day element in our web development, we are dealing with JSON request and response, JSON database....etc.,
browser and server communicating in  JSON format as it is simple, fast and easy to understand, parsing JSON is simpler than XML.

If we see below JSON object for holding list of objects, that having collection of objects, each object having two properties 'Id' and 'Name'

``` javascript
var data = [{"Id":0,"Name":"Jason Bourne"},{"Id":1,"Name":"Tony Stark"},{"Id":2,"Name":"Winter Soldier"}];
```
As you can see we are repeating property names in every object.And observe below format of JSON object which represents same object

``` javascript
var encodedData = {
    "Properties": ["ID", "Name"],
    "Data": [[1, "Jason Bourne"], [2, "Tony Stark"], [3, "Winter Soldier"]]
};
```

Now we are not repeating property names in each object instead we are seperating property names and data in symetric way.

#### Usage

If data having 10 records it wont make must difference in transfer(request and response time), But whenever dealing with bulk data more than 1000 records will make better in request/response time

##### Encoding

After encoding the size of JSON will reduced, that can be used in transfer(client-server or between servers)

``` javascript
var data = [{"Id":0,"Name":"Jason Bourne"},{"Id":1,"Name":"Tony Stark"},{"Id":2,"Name":"Winter Soldier"}];
var encodedData = pkg.encodeData(data);

/*
console.log(encodedData);
//prints below data
{
    "Properties": ["ID", "Name"],
    "Data": [[1, "Jason Bourne"], [2, "Tony Stark"], [3, "Winter Soldier"]]
};
*/
```

Some numbers :

count of the Records :  10    ; Length of JSON Before Encoding  : 241     ; After Encoding : 163  ~67%

count of the Records :  100   ; Length of JSON  Before Encoding : 2581    ; After Encoding : 1423 ~55%

count of the Records :  10000 ; Length of JSON  Before Encoding : 297781  ; After Encoding : 177818  ~60%


##### Decoding

Usage for decoding the endoced data previously. will generate actual JSON object to consume in application

``` javascript
var encodedData = {
    "Properties": ["ID", "Name"],
    "Data": [[1, "Jason Bourne"], [2, "Tony Stark"], [3, "Winter Soldier"]]
};

var decodedData = pkg.decodeData(encodedData);
//[{"Id":0,"Name":"Jason Bourne"},{"Id":1,"Name":"Tony Stark"},{"Id":2,"Name":"Winter Soldier"}]
```


