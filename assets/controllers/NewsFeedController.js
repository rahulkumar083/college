
Router.controller('NewsFeedController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Post={};



  $scope.Delete=function(Post)
  {
    if(!confirm("Are u sure ?? "))return;
    var id = Post._id;
    $http({
      url: $rootScope.url+"api/posts/delete/"+Post._id,
      method: "GET",
      //params: $scope.Post
    }).then(function (response) {
  
      console.log(response.data);
    
      var i=0;
       $rootScope.Posts.forEach(Post => {
         if(Post._id==id) { 
           $rootScope.Posts.splice(i,1);
          alertify.error("Post Deleted !!!") ;
        
        }
        i++;
       });
        
      
      if(response.data.DeletedCount==1){}
    });
  
  }








  //$rootScope.ShowFootbar = false;
  
});