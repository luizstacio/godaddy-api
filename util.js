'use strict';

function applyAuth(request, key, secret) {
  request.headers = request.headers || {};

  request.headers.Authorization = `sso-key ${key}:${secret}`;

  return request;
}

module.exports = {
  applyAuth
}