var wcsSearch = angular.module('wcsSearch', []);


function mainController($scope, $http) {
  $scope.formData = {};
  $scope.se

  // $http.get('/api/menu')
  //   .success(function(data) {
  //     $scope.menu = data.catalogGroupView;
  //     console.log(data.catalogGroupView);
  //   })
  //   .error(function(data) {
  //     console.log('Error: ' + data);
  //   });

  $http.get('/api/guestsession')
  .success(function(data){
      console.log('gelukt');
      $scope.token = data.WCToken;
      $scope.trustedToken = data.WCTrustedToken;
  })
  .error(function(data){
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

$scope.orderProduct = function(productId){
  console.log("order product: " + productId);
}
}
