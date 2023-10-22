
Router.controller('StudentsController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  
  $scope.UpdateStatus= async function(User,Status)
  {
    var Status='Active';if(User.Status=='Active')Status='Suspended';
    await $http({
      url: $rootScope.url + "api/users/UpdateUserStatus/" + User._id+"/"+Status,
      method: "GET",
      //params: $scope.User
    }).then(function (response) {
      console.log(response.data); 
      //$scope.Post=response.data;
      User.Status=Status;
      alertify.success('Status Updated');
  
  }, "JSON");
    console.log(Status);
  }
  

  
});