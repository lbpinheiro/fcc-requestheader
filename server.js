var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var useragent = require('useragent');

var app = express();

app.use(favicon(path.join(__dirname,'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send(getAttributes(req));
});

app.get('/test', function (req, res) {
  res.sendFile('public/test.html', { root: __dirname });
});

function getAttributes(req) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  var acceptLang = req.headers['accept-language']; 
  var language = acceptLang.substr(0, acceptLang.indexOf(','));

  var agent = useragent.parse(req.headers['user-agent']);
  var software = agent.os.toString();

  return {"ipaddress": ip, "language": language, "software": software};
}

module.exports = app;