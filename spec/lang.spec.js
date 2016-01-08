'use strict';

var assert = require('assert');
var lang = require('../lang');

describe('lang', () => {
  it('#lang', () => {
    let isOk = (typeof lang('pt-br') == 'object');
    
    assert.ok(isOk);
  });
});