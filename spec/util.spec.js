'use strict';

var assert = require('assert');
var util = require('../util');

describe('util', () => {

  it('#applyAuth()', () => {
    var request = {};
    var key = 'key';
    var secrect = 'secrect';

    util.applyAuth(request, key, secrect);

    assert.equal(request.headers.Authorization, `sso-key ${key}:${secrect}`);
  });
});
