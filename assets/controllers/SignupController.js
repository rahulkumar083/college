Router.controller('SignupController', function ($scope, $http, $location, Shared, $rootScope) {
    $http.defaults.headers.post["Content-Type"] = "application/json";
    $rootScope.ShowFootbar = false;

    $scope.User = { UserName: "", Email: "", Mobile: "", PWD: "aa", UserType: "Student" };
    $scope.ChangeUserType = function () {
        delete $scope.User.RollNumber;
        delete $scope.User.EmployeeNumber;
        
    }
    $scope.CreateUser = function () {

       //alert($rootScope.url + "api/users/Create");
       //console.log($scope.User); return;
        $http({
            url: $rootScope.url + "api/users/Create",
            method: "POST",
            params: $scope.User
          }).then(function (response) {
            console.log(response.data);
            if (response.data._id) {
               
                
                // localStorage.setItem("User", JSON.stringify(response.data));
                
                alertify.alert("Profile Created .. Proceed to login",function(){
                    location.href = "#!login";
                });
                
            }
            else { alertify.error(response.data.Message); }

        }, "JSON");


    }

});