var wcsSearch = angular.module('wcsSearch', ['ngCookies']);

function mainController($scope, $http, $cookies) {
  $scope.formData = {};


  // $http.get('/api/menu')
  //   .success(function(data) {
  //     $scope.menu = data.catalogGroupView;
  //     console.log(data.catalogGroupView);
  //   })
  //   .error(function(data) {
  //     console.log('Error: ' + data);
  //   });

  $http.post('/api/guestsession')
    .success(function(data) {
      console.log('gelukt');
      console.log(data);
      $cookies.token = data.WCToken;
      $cookies.trustedToken = data.WCTrustedToken;
    })
    .error(function(data) {
      console.log('error');
    });


  $scope.search = function() {
    $scope.results = {};
    $http.get('/api/search/' + $scope.formData.search)
      .success(function(data) {
        $scope.results = data.catalogEntryView;
        $scope.PDP = false;
        $scope.searchResults = true;

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.getProduct = function(productId) {
    $scope.results = {};
    $http.get('/api/product/' + productId)
      .success(function(data) {
        $scope.searchResults = false;
        $scope.PDP = true;
        $scope.product = data.catalogEntryView[0];


      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };

  $scope.orderProduct = function(sds) {
    console.log("ordering product: " + $scope.product.uniqueID);
    var postData = {
      quantity: '1',
      productId: $scope.product.uniqueID
    };
    var config = {
      headers: {
        'wctoken': $cookies.token,
        'wctrustedtoken': $cookies.trustedToken
      }
    }
    $http.post('/api/cart', postData, config)
      .success(function(data) {
        getCart();
      })
      .error(function(data) {
        console.log("mislukt");
        console.log(data);
      })
  };

  getCart = function() {

    var config = {
      headers: {
        'wctoken': $cookies.token,
        'wctrustedtoken': $cookies.trustedToken
      }
    }
    $http.get('/api/cart', config)
      .success(function(data) {
        $scope.cart = data
      })
      .error(function(data) {
        console.log("mislukt");
        console.log(data);
      })
  };

}
