var chai = require('chai');
var should = require('should');
var request = require('request');


describe("Hex to RGB conversion", function() {
   var url = "http://localhost:8080";

   it("returns status 200", function() {
     request(url, function(error, response, body) {
       expect(response.statusCode).to.equal(200);
       done();
     });
   });


 });
