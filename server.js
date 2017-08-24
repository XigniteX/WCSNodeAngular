var express = require('express');
var session = require('express-session');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var morganBody = require('morgan-body');
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

app.get('/api/guestsession', function(req, res) {
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
  }).pipe(res);

})

app.post('/api/cart', function(req, res) {
  var formData = {
    orderId: '.',
    orderItem: [{
      quantity: '1',
      productId: '320795'
    }]
  };

  request.post({
    uri: baseURL + 'wcs/resources/cart',
    headers: {
      'apiKey': apiKey
    },
    formData: formData
  }).pipe(res);
})

//html
app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
})

morganBody(app);

app.listen(8080);
console.log("App listening on port 8080");
