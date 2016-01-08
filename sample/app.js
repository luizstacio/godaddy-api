var godaddy = require('../')({
  key: 'aaa',
  secret: 'bbb'
});
var domain = new godaddy.Domain('my.domain.sample');

domain.addCname('cdn', 'mycdn').then((data) => {
  console.log(data);
}).catch((erro) => console.log('Erro: ', erro));