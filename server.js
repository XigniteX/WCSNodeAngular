var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var request = require('request');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//routes
//api
app.get('/api/search/:searchTerm', function(req, res){
  request({
      uri: 'https://rest-dev.blokker.nl/nl/search/resources/productview/bySearchTerm/*',
      headers: {
        'apiKey': '7V6YCN9IBeKmyd1M0LRC1O35wWrPJ4E2'
      },
      qs: {
        profileName: 'Blokker_SearchBasicProduct',
        searchTerm: req.params.searchTerm
      }

    }).pipe(res);
})

app.listen(8080);
console.log("App listening on port 8080");
