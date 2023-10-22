
Router.controller('AdminPollsController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Poll={};
  //$scope.Polls=[];
  $scope.CommentText='';

if($rootScope.Polls.length==0)$rootScope.LoadData();



$scope.SavePoll=function()
{
  console.log('Sent',$scope.Poll);
  $http({
    url: $rootScope.url+"api/polls/create",
    method: "POST",
    params: ($scope.Poll)
  }).then(function (response) {
    console.log(response.data);
    if(response.data._id){
      
      $rootScope.Polls.push(response.data);
      console.log($rootScope.Polls);
      alertify.success("Poll Created !!!");
     // $scope.Load();
      $('#myModal').modal('hide'); 
      //$scope.$apply();
    }
  });


}




$scope.Delete=function(Poll)
{
  if(!confirm("Are u sure ?? "))return;
  var id = Poll._id;
  $http({
    url: $rootScope.url+"api/polls/delete/"+Poll._id,
    method: "GET",
    //params: $scope.Poll
  }).then(function (response) {

    console.log(response.data);
       
    $scope.Polls.splice($scope.Polls.indexOf(Poll),1);


    alertify.error("Poll Deleted !!!");
      
    
    if(response.data.DeletedCount==1){}
  });

}




  //$rootScope.ShowFootbar = false;
  
});