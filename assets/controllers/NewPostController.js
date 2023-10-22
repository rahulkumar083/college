
Router.controller('NewPostController', function ($scope, $http, $location,$rootScope) {

  $scope.NewPost={PostTitle:"",Description:""}


  $scope.SubmitPost=function () {
    
    $scope.NewPost.UserID=$rootScope.User._id;
    $scope.NewPost.PostUser = $rootScope.User;
    console.log('Send',$scope.NewPost);//return;
    $http({
      url: $rootScope.url+"api/posts/create",
      method: "POST",
      params: angular.fromJson($scope.NewPost)
    }).then(function (response) {

      console.log(response.data);
      if(response.data._id){
        $rootScope.Posts.push(response.data);
        $location.url('/newsfeed');
        alertify.success("Post Added !!!")
      
      }
    });
  }
});