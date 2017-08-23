var wcsSearch = angular.module('wcsSearch', []);


function mainController($scope, $http) {
  $scope.formData = {};

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
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
};
}
