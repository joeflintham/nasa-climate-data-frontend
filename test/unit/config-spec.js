import { describe, before, it } from 'mocha';
import {assert} from 'chai';
import Config from '../../lib/config.js';

describe('config module', function () {
  
  it('should be defined', function () {
    assert.equal(typeof Config, "object");
  });

  it('should define API root', function () {
    assert.equal(typeof Config.apiRoot, "string");
  });

  it('should define API path', function () {
    assert.equal(typeof Config.apiPath, "string");
  });
});
