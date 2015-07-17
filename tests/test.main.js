'use strict';

describe('main ncd module', function () {

    it('should be defined', function () {
        assert.equal(typeof ncd, "object");
    });
    
    it('should expose config settings', function () {
        assert.equal(typeof ncd.Config, "object", "Config is set");
        assert.equal(ncd.Config.apiPath, "/api", "Config.apiPath is set");
    });

    it('should detect and instantiate maps for valid dom ids', function () {

        var el = document.createElement('div');
        el.setAttribute("id", "map");
        document.body.appendChild(el);

        ncd.Bootstrap(L);

        assert.equal(typeof el, "object");
        
    });
    
});
