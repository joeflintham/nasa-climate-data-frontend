"use strict";

/**
 *
 * @namespace ncd
 * @description namespace for the nasa climate data frontend
 * Nasa Climate Data
 *
 */
var ncd = (function(_ncd){
    
    /**
     * bootstrap the _ncdlication<br />
     * detects a div#map element and instantiates the _ncd if it is found <br />
     * @function ncd.Bootstrap
     **/
    _ncd.Bootstrap = function(){

        var mapEl = document.getElementById("map");
        if (mapEl){
            var myMap = new ncd.NcdMap(mapEl);
        }
    }

    return _ncd;

}(ncd || {}));

