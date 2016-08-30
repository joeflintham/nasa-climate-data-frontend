import { describe, before, it } from 'mocha';
import {assert, expect, should} from 'chai';
import mockery from 'mockery';
import { spy, stub } from 'sinon';

const openSpy = spy();
const sendSpy = spy();

const XHRMock = function () {};
XHRMock.prototype = {
  open: openSpy,
  send: sendSpy
};

mockery.enable({
  warnOnUnregistered: false
});
mockery.registerMock('./xhr.js', XHRMock);

const API = require('../../lib/api.js');

describe('api module', function () {

  it('should be defined', function () {
    assert.equal(typeof API, "object");
  });

  it('should handle missing co-ordinates', function () {
    assert.equal(typeof API.GetByCoords, 'function');
    assert.equal(API.GetByCoords(), undefined);
  });

  let coords = {
    lat: 51.1,
    lng: 1.1
  };
  
  it('should get data by co-ordinates', function () {
    assert.equal(typeof API.GetByCoords, 'function');

    let apiCall = API.GetByCoords(coords);
    expect(apiCall instanceof Promise)
    expect(openSpy.called).to.equal(true);
    expect(sendSpy.called).to.equal(true);

    Promise.resolve(apiCall);
  });
});
