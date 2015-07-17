"use strict";

/**
 *
 * @namespace ncd.Config
 * @description namespace for the nasa climate data frontend
 * Nasa Climate Data
 *
 */
var ncd = (function(_ncd){

  /**
     * config options<br />
     * @name Config
     * @memberof! ncd
     
     **/
    _ncd.Config = {

        apiPath: "/api",
        apiRoot: "http://localhost:3000"
        
    };

    return _ncd;

}(ncd || {}));

