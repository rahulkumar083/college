
Router.controller('NotificationController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Notification={Title:'',Description:''};


$scope.AddNewNotification=function()
{
  //console.log('Notification', $scope.Notification);return;
  $http({
    url: $rootScope.url+"api/notifications/create",
    method: "POST",
    params: $scope.Notification
  }).then(function (response) {

    //console.log(response.data);
    if(response.data._id){
     $rootScope.Notifications.push(response.data);
      // $location.url('/newsfeed');
     $("#NotificationModal").modal('hide');
      alertify.success("Notification Added !!!")
    
    }
  });



}

  
$scope.Delete=function(Notification)
{
  if(!confirm("Are u sure ?? "))return;
  var id = Notification._id;
  $http({
    url: $rootScope.url+"api/notifications/delete/"+Notification._id,
    method: "GET",
    //params: $scope.Notification
  }).then(function (response) {

    console.log(response.data);
    
     // $location.url('/newsfeed');
    var i=0;
     $rootScope.Notifications.forEach(Notification => {
       if(Notification._id==id) { 
         $rootScope.Notifications.splice(i,1);
        alertify.success("Notification Deleted !!!") ;
      
      }
      i++;
     });
      
    
    if(response.data.DeletedCount==1){}
  });

}









  //$rootScope.ShowFootbar = false;
  
});