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

module.exports = pkg;