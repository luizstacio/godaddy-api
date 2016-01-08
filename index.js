'use strict';

var request = require('request-promise');
var util = require('./util');
var lang = require('./lang');
var _ = require('lodash');

var config = {
  "api": "https://api.godaddy.com/v1",
  "key": "",
  "secret": "",
  "tlds": "com.br",
  "lang": "pt-br"
};

class Domain {
  constructor(domain) {
    this.domain = domain;
  }

  addCname (name, data) {
    let req = util.applyAuth({
      method: 'PUT',
      url: `${config.api}/domains/${this.domain}/records/CNAME/${name}`,
      json: true
    }, config.key, config.secret);

    let promise = new Promise((done, reject) => {
      request(req).then((reponse) => {
        done({ message: lang(config.lang)["message success addCname"] });
      }).catch(reject);
    })

    return promise;
  }

  static suggest (query) {
    let req = util.applyAuth({
      method: 'GET',
      url: `${config.api}/domains/suggest?query=${query}&tlds=${config.tlds}`,
      json: true
    }, config.key, config.secret);

    return request(req);
  }

  static available (domain) {
    let req = util.applyAuth({
      method: 'GET',
      url: `${config.api}/domains/available?domain=${domain}`,
      json: true
    }, config.key, config.secret);

    let promise = new Promise((done, reject) => {
      request(req).then((reponse) => {
        done(reponse.available);
      }).catch(reject);
    })

    return promise;
  }
}

module.exports = function (cfg) {
  config = _.merge(config, cfg);

  return {
    Domain
  } 
}