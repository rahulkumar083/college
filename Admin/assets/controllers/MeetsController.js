
Router.controller('MeetsController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Meet={};


  $scope.AddNewMeet=function()
  {
    //console.log('Meet', $scope.Meet);return;
    $http({
      url: $rootScope.url+"api/Meets/create",
      method: "POST",
      params: $scope.Meet
    }).then(function (response) {
  
      //console.log(response.data);
      if(response.data._id){
       $rootScope.Meets.push(response.data);
        // $location.url('/newsfeed');
       $("#MeetModal").modal('hide');
        alertify.success("Meet Added !!!")
      
      }
    });
  
  
  
  }












  $scope.Delete=function(Meet)
  {
    if(!confirm("Are u sure ?? "))return;
    var id = Meet._id;
    $http({
      url: $rootScope.url+"api/Meets/delete/"+Meet._id,
      method: "GET",
      //params: $scope.Meet
    }).then(function (response) {
  
      console.log(response.data);
      
       // $location.url('/newsfeed');
      var i=0;
       $rootScope.Meets.forEach(Meet => {
         if(Meet._id==id) { 
           $rootScope.Meets.splice(i,1);
          alertify.success("Meet Deleted !!!") ;
        
        }
        i++;
       });
        
      
      if(response.data.DeletedCount==1){}
    });
  
  }
  
  
});