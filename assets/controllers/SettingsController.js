Router.controller('SettingsController', function ($scope, $http, $location, $rootScope) {
    $http.defaults.headers.post["Content-Type"] = "application/json";

    $scope.User = $rootScope.User;
    $scope.ID = $scope.User._id;
    //$rootScope.ShowFootbar = false;
    $scope.Save = function () {
       
        //console.log($rootScope.User);return; 
        $http({
            url: $rootScope.url+"api/users/Update/"+$rootScope.User._id,
            method: "POST",
            params:  $rootScope.User
          }).then(function (response) {
            //alert(JSON.stringify(response.data)); //return;
            alertify.success("Info Updated");
            localStorage.setItem("User", angular.toJson( $scope.User));
        }, "JSON");
    }

});