var chai = require('chai');
var should = require('should');
var request = require('request');
var expect = require('expect');


describe("Hompage test", function() {
   var url = "http://localhost:8080";

   it("returns status 200", function(done) {
     request.get(url, function (error, response, body) {
       if(error){
         done(error)
       }
       expect(response.statusCode).toEqual(200);
       done();
     });
   });
 });
