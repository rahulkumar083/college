
Router.controller('SearchJobsController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $scope.Keyword='';
  $scope.CommentText='';

  $scope.SetKeyword=function(Keyword){$scope.Keyword=Keyword};
  $scope.ToggleCampus=function(){
    if($scope.Keyword!='') $scope.Keyword='';
    else $scope.Keyword=$rootScope.User.College;
    console.log($scope.Keyword);
  }

  $scope.ToggleParticipate=function(Job)
  {
    var data={
      UserID: $rootScope.User._id,
      JobID: Job._id,
    }

    $http({
      url: $rootScope.url+"api/jobs/ToggleJobParticipation",
      method: "POST",
      params: (data)
    }).then(function (response) {
      console.log(response.data);

      
     if(!Job.JobParticipants.includes($rootScope.User._id)) Job.JobParticipants.push($rootScope.User._id);
     else Job.JobParticipants.splice(Job.JobParticipants.indexOf($rootScope.User._id),1);

    //  $rootScope.Posts.forEach(Post => {
    //    if(Post._id==$scope.Post._id) {Post.Likes = $scope.Post.Likes;return;}
    //  });
    });

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