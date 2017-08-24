var express = require('express');
var session = require('express-session');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config.properties');

var request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));
app.use(methodOverride());
app.use(session({
  secret: 'sshhggss'
}));

var sess;

var baseURL = properties.get('main.wcs.baseURL');
var apiKey = properties.get('main.wcs.APIKey');

//routes
//api
app.get('/api/search/:searchTerm', function(req, res) {

  request.get({
    uri: baseURL + 'search/resources/productview/bySearchTerm/*',
    headers: {
      'apiKey': apiKey
    },
    qs: {
      profileName: 'Blokker_SearchBasicProduct',
      searchTerm: req.params.searchTerm
    }

  }).pipe(res);
})

app.get('/api/menu', function(req, res) {
  request.get({
    uri: baseURL + 'search/resources/categoryview/@top',
    headers: {
      'apiKey': apiKey
    },
    qs: {
      profileName: 'BLKH_findSubCategories_CustomFilter',
      depthAndLimit: '*,*'
    }

  }).pipe(res);
})

app.get('/api/product/:productId', function(req, res){
  request.get({
    uri: baseURL + 'search/resources/productview/byId/'+ req.params.productId,
    headers: {
      'apiKey': apiKey
    },
  }).pipe(res);
})

app.post('/api/guestsession', function(req, res) {
  let body = [];
  request.post({
    uri: baseURL + 'wcs/resources/guestidentity',
    headers: {
      'apiKey': apiKey
    }
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
    console.log(body.WCToken);
    console.log(body.WCTrustedToken);
  }).pipe(res);

})

app.post('/api/cart', function(req, res) {
  var url = baseURL + 'wcs/resources/cart'

  var postData =  {
    orderId: '.',
    orderItem: [{
      quantity: req.body.quantity,
      productId: req.body.productId
    }]
  };

  var options = {
    method: 'post',
    body: postData,
    json: true,
    url: url,
    headers: {
      'apiKey': apiKey,
      'WCToken': req.headers.wctoken,
      'WCTrustedToken': req.headers.wctrustedtoken

    }
  }

  request(options, function (err, res, body) {
    if (err) {
      console.error('error posting json: ', err)
      throw err
    }
    var headers = res.headers
    var statusCode = res.statusCode

  }).pipe(res);
})

//html
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
})



app.listen(8080);
console.log("App listening on port 8080");
