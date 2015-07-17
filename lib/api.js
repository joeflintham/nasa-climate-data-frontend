"use strict";

/**
 *
 * @namespace ncd.API
 * @description namespace for the nasa climate data frontend
 * Nasa Climate Data
 *
 */
var ncd = (function(_ncd){

    _ncd.API = {

        GetByCoords: function(coords, callback){
            if (!(coords.lat && coords.lng)){ return; }
            // request the marker info with AJAX for the current bounds
            var apiCall = _ncd.Config.apiRoot + _ncd.Config.apiPath;
            var params = ['year=2005','measures=tasmin','latmin='+coords.lat,'lonmin='+coords.lng];
            apiCall = apiCall + '?' + params.join('&');
            var xhr = new XMLHttpRequest();
	        xhr.onload = function(d){
                if (callback){ callback(xhr.response); };
            };
	        xhr.open('GET', apiCall, true);
	        xhr.send(null);
        }
        
    };

    return _ncd;

}(ncd || {}));

