
Router.controller('LoginController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $scope.LoginDetails = { Email: '', PWD: '' };
    
  //localStorage.removeItem('User');
  $rootScope.ShowFootbar = false;
  $scope.Login = function () {

    

    var data = $scope.LoginDetails;
    $http({
      url: $rootScope.url+"api/users/Login",
      method: "POST",
      params: data
    }).then(function (response) {

      
      try {
        if (response.data.UserType!='Admin') {alertify.error("Unauthorize Access"); return;}
         {
          var User = response.data;
          localStorage.setItem("User", angular.toJson(User));
          $rootScope.User = User;$rootScope.IsLoggedIn =true;
          
          $rootScope.ShowFootbar=true;
          $rootScope.LoadData();
          $location.url('/adminpolls');
         }
      } catch (error) { alertify.error("Invalid Credentials"); }
      

    });
  }
});