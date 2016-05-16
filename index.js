var url = require('url');
var pkg = {};


var getParams = function (url) {
    if(url.indexOf('/') >= 0 && url.length > 0){
        var ars = url.split('/');
        ars = ars.filter(function(x){ return x.length > 0;});
        return ars;
    }
    return url;
};

var checkParams = function (srcParams, dstParams) {
    if(dstParams){
        var params = {}, isMatch = true;
        for(var i =0 ;i < srcParams.length; i++){
            if(srcParams[i].indexOf(':') >= 0){
                //it is extract param
                if(typeof dstParams[i] === 'undefined'){
                    params[srcParams[i].substr(1)] = null;
                }else{
                    params[srcParams[i].substr(1)] = dstParams[i];
                }
            }else{
                //if it is hard param, hve to check url to compare
                if(dstParams[i] != srcParams[i]){
                    isMatch = false;
                    break;
                }
            }
        }
        return { IsMatch: isMatch, Params: params};
    }
};
pkg.parseUrl = function (sourceUrl, urlToPrase) {
    var parsedObj = {};
    var paramNames = getParams(sourceUrl);
    var paramValues = getParams(url.parse(urlToPrase).pathname);
    return checkParams(paramNames, paramValues);
};

pkg.encodeData = function (dataToEncode) {
    var isLoopAllow = true, data = [];
    var props = {};
    if(dataToEncode instanceof Array) {
        props = Object.keys(dataToEncode[0]);
        var index = 0;
        while(isLoopAllow) {
            if(!dataToEncode[index]){
                isLoopAllow = false;
            }else{
                data[index] = [];
                for (var k = 0; k < props.length; k++) {
                    if (dataToEncode[index][props[k]] != null && dataToEncode[index][props[k]] != undefined) {
                        data[index][k] = dataToEncode[index][props[k]];
                    } else {
                        data[index][k] = null;
                    }
                }

            }
            index++;
        }
    }
    return {"Properties": props, "Data": data};
};

pkg.decodeData = function (encodedData) {
    var data = [],isLoopAllow = true, index = 0;
    if(encodedData.Properties && encodedData.Data){
        while (isLoopAllow){
            if(encodedData.Data[index] && encodedData.Data[index] instanceof Array){
                data[index] = {};
                for (var k = 0; k < encodedData.Properties.length; k++) {
                    data[index][encodedData.Properties[k]] = encodedData.Data[index][k];
                }
            }else{
                isLoopAllow = false;
            }

            index++;
        }
    }
    return data;
};


module.exports = pkg;