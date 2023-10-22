
Router.controller('SearchEventsController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $scope.Keyword='';
  $scope.CommentText='';

  $scope.SetKeyword=function(Keyword){$scope.Keyword=Keyword};
  $scope.ToggleCampus=function(){
    if($scope.Keyword!='') $scope.Keyword='';
    else $scope.Keyword=$rootScope.User.College;
    console.log($scope.Keyword);
  }
  
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

$scope.ToggleParticipate=function(Event)
{
  var data={
    UserID: $rootScope.User._id,
    EventID: Event._id,
  }

  $http({
    url: $rootScope.url+"api/events/ToggleEventParticipation",
    method: "POST",
    params: (data)
  }).then(function (response) {
    console.log(response.data);

    
   if(!Event.EventParticipants.includes($rootScope.User._id)) Event.EventParticipants.push($rootScope.User._id);
   else Event.EventParticipants.splice(Event.EventParticipants.indexOf($rootScope.User._id),1);

  //  $rootScope.Posts.forEach(Post => {
  //    if(Post._id==$scope.Post._id) {Post.Likes = $scope.Post.Likes;return;}
  //  });
  });

}
  
});