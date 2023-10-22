
Router.controller('FullPostController', function ($scope, $http, $location,$rootScope,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Post={};
  $scope.CommentText='';

  $scope.AddComment=function()
  {
    var Comment={
      UserID: $rootScope.User._id,
      PostID: $scope.Post._id,
      CommentUser : $rootScope.User,
      CommentText : $scope.CommentText
    }
    console.log('Comment Sent',Comment);
    
    $http({
      url: $rootScope.url+"api/posts/AddPostComment",
      method: "POST",
      params: (Comment)
    }).then(function (response) {
      console.log(response.data);
      if(response.data._id){
        $('#CommentModal').modal('hide');
        alertify.success("Comment Added !!!");

        $scope.Post.PostComments.push(angular.copy(Comment));
      }
    });
  }
  $scope.DeleteComment=function(Comment,Index)
  {
   
   if(!confirm('Confirm Delete ???'))return;
    
    $http({
      url: $rootScope.url+"api/posts/deleteComment/" + Comment._id,
      method: "GET",
    }).then(function (response) {
      console.log(response.data);
     
      $scope.Post.PostComments.splice(Index,1);
        alertify.error("Comment Deleted !!!");      
    });
  }




  $scope.ToggleLike=function()
  {
    var data={
      UserID: $rootScope.User._id,
      PostID: $scope.Post._id
    }

    $http({
      url: $rootScope.url+"api/posts/togglelike",
      method: "POST",
      params: (data)
    }).then(function (response) {
      console.log(response.data);
     if(!$scope.Post.Likes.includes($rootScope.User._id)) $scope.Post.Likes.push($rootScope.User._id);
     else $scope.Post.Likes.splice($scope.Post.Likes.indexOf($rootScope.User._id),1);

     $rootScope.Posts.forEach(Post => {
       if(Post._id==$scope.Post._id) {Post.Likes = $scope.Post.Likes;return;}
     });
    });

  }















$scope.Load= async function()
{
  await $http({
    url: $rootScope.url + "api/posts/" + $routeParams.PostID,
    method: "GET",
    //params: $scope.User
  }).then(function (response) {
    console.log(response.data); 
    $scope.Post=response.data;


}, "JSON");

}
$scope.Load();








  //$rootScope.ShowFootbar = false;
  
});