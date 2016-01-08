'use strict';

var assert = require('assert');
var config = {
  api: 'https://api.godaddy.com/v1',
  key: 'aaa',
  secret: 'bbb'
};
var godaddy = require('../index.js')(config);
var lang = require('../lang');
var nock = require('nock');
var lodash = require('lodash');
var nockurl = nock(`${config.api}`);
var nockurlAuth = nock(`${config.api}`, {
  reqheaders: {
    Authorization: `sso-key ${config.key}:${config.secret}`
  }
});

function ErrorHandler (err) {
  let erro = new Error('Error: ' + err);
  throw erro;
}

describe('ErrorHandler', () => {
  it('ErrorHandler()', () => {
    try {
      ErrorHandler('teste');  
    } catch(e) {
      assert.ok(e, 'Error: testte');
    }
  });
})

describe('Godaddy', () => {

  describe('Domain', () => {

    it('#suggest()', (done) => {
      let response = [
        { domain: 'undefinedweb.com.br' },
        { domain: 'undefinedpro.com.br' },
        { domain: 'undefined.com.br' },
        { domain: 'undefinedhub.com.br' },
        { domain: 'undefinedshop.com.br' }
      ];

      nockurlAuth
        .get('/domains/suggest?query=teste&tlds=com.br')
        .reply(200, response);

      godaddy
        .Domain
        .suggest('teste')
        .then((e) => {
          let reponseIsEqual = lodash.isEqual(e, response);

          assert.ok(reponseIsEqual);
          
          done();
        })
        .catch(ErrorHandler);
    });

    it('#available()', (done) => {
      let response = {
        available: true
      }

      nockurlAuth
        .get('/domains/available?domain=noname.com')
        .reply(200, response);
      
      godaddy
        .Domain
        .available('noname.com')
        .then((isAvailable) => {

          done(assert.strictEqual(isAvailable, true));
        })
        .catch(ErrorHandler);
    });

    it('#addCname()', (done) => {
      let name = 'aaaa';
      let Domain = new godaddy.Domain('teste.com');
      let records = '@';

      nockurlAuth
        .put(`/domains/teste.com/records/CNAME/${name}`)
        .reply(200, {});
      
      Domain
        .addCname(name, records)
        .then((reponse) => {
          done(assert.strictEqual(reponse.message, lang('pt-br')["message success addCname"]));
        })
        .catch(ErrorHandler);
    });
  });
});
