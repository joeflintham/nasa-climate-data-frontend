import { describe, before, it } from 'mocha';
import {assert, expect, should} from 'chai';
import mockery from 'mockery';

const XHRMock = function () {};
XHRMock.prototype = {
  onload: function() {console.log(arguments);}
};

describe('api module', function () {

  let API;
  
  beforeEach(function () {
    mockery.enable();
    mockery.registerAllowable('../../lib/api.js');

    mockery.registerMock("./xhr.js", XHRMock);

    API = require('../../lib/api.js');
  });
  
  it('should be defined', function () {
    assert.equal(typeof API, "object");
  });

  it('should get data by co-ordinates', function () {
    assert.equal(typeof API.default.GetByCoords, 'function');
    assert.equal(API.default.GetByCoords(), undefined);
  });
});
