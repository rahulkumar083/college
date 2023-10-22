
Router.controller('JobsController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $scope.Job={};
  $scope.CommentText='';
  $scope.Participants=[];

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


$scope.SetParticipants=function(Participants){
  console.log('Participants',Participants);
  $scope.Participants=Participants;
}



$scope.Save =function()
{
  
  $scope.Job.UserID = $rootScope.User._id;
  
//console.log($scope.Job);return;
  $http({
    url: $rootScope.url+"api/jobs/create",
    method: "POST",
    params: ($scope.Job)
  }).then(function (response) {
    console.log(response.data);
    $rootScope.Jobs.push($scope.Job);
   
  });

}


$scope.Delete=function(Record,Index)
{
 
 if(!confirm('Confirm Delete ???'))return;
  
  $http({
    url: $rootScope.url+"api/jobs/delete/" + Record._id,
    method: "GET",
  }).then(function (response) {
    console.log(response.data);
   $rootScope.Jobs.splice(Index,1);
      alertify.error("Record Deleted !!!");      
  });
}



  
});