
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
        if (response.data.Email == $scope.LoginDetails.Email) {
        var User = response.data;
          localStorage.setItem("User", angular.toJson(User));
          $rootScope.User = User;$rootScope.IsLoggedIn =true;
       //console.log(User);return;
         //if($rootScope.User.UserType=='Admin') $location.url('/admin/');
          $rootScope.ShowFootbar=true;
          $rootScope.LoadData();
          if( User.UserType=='Admin') $location.url('/crs');
          if( User.UserType=='CR') $location.url('/jobs');
          if( User.UserType=='Student') $location.url('/searchjobs');
          
        }
      else { alertify.error("Invalid Credentials"); }
      } catch (error) { alertify.error("Invalid Credentials"); }
      

    });
  }
});