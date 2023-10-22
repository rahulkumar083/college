
Router.controller('NewJobController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
 


// $scope.Load= async function()
// {
//   await $http({
//     url: $rootScope.url + "api/posts/" + $routeParams.PostID,
//     method: "GET",
//     //params: $scope.User
//   }).then(function (response) {
//     console.log(response.data); 
//     $scope.Post=response.data;


// }, "JSON");

// }
// $scope.Load();








  //$rootScope.ShowFootbar = false;
  
});