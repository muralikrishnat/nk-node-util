var pkg = require('./index');

//parseUrl
var parsed = pkg.parseUrl("/:category/:id", "/books/24");
console.log(parsed.IsMatch, parsed.Params);
console.log('selected id : ', parsed.Params.id);

var parsed2 = pkg.parseUrl("/category/:id", "/books/24");
console.log(parsed2.IsMatch, parsed2.Params);

var parsed3 = pkg.parseUrl("/books/:id", "/books/24");
console.log(parsed3.IsMatch, parsed3.Params);

//
////
//var data = [{"Id":0,"Name":"Jason Bourne"},{"Id":1,"Name":"Tony Stark"},{"Id":2,"Name":"Winter Soldier"}];
//console.log(pkg.encodeData(data));

//console.log((new Date));
//var lst = [];
//for (var i = 0; i < 10000000; i++) {
//    lst.push({"Id": i, "Name": "Name" + i})
//}
//console.log((new Date));
//
//var encodedData = pkg.encodeData(lst);
////console.log('encoded Data : ', encodedData);
//console.log((new Date));

//var encodedData = pkg.encodeData([ {"Id": 1, "Name": "Murali", "IsStudent": false}, { "Id": 2, "IsStudent": null}]);
//console.log('encoded Data : ', encodedData);


//var encodedData = {
//    "Properties": ["ID", "Name"],
//    "Data": [[1, "Jason Bourne"], [2, "Tony Stark"], [3, "Winter Soldier"]]
//};
//
//var decodedData = pkg.decodeData(encodedData);
//console.log('decoded data ', decodedData);


// length of the 10 records of JSON object is 241 before encoding
// after encoding it will give 163 length of JSON object


// Records Count : 10
// Before Encoding : 241 ; After Encoding : 163  ~67%


// Records Count : 100
// Before Encoding : 2581 ; After Encoding : 1423 ~55%

// Records Count : 10000
// Before Encoding : 297781 ; After Encoding : 177818  ~60%