
Router.controller('EventsController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  //localStorage.removeItem("User");  
  $scope.Event={};
  
  $scope.SetParticipants=function(Participants){
    console.log('Participants',Participants);
    $scope.Participants=Participants;
  }

  $scope.AddNewEvent=function()
  {
    //console.log('Event', $scope.Event);return;
    $http({
      url: $rootScope.url+"api/Events/create",
      method: "POST",
      params: $scope.Event
    }).then(function (response) {
  
      //console.log(response.data);
      if(response.data._id){
       $rootScope.Events.push(response.data);
        // $location.url('/newsfeed');
       $("#EventModal").modal('hide');
        alertify.success("Event Added !!!")
      
      }
    });
  
  
  
  }












  $scope.Delete=function(Event)
  {
    if(!confirm("Are u sure ?? "))return;
    var id = Event._id;
    $http({
      url: $rootScope.url+"api/Events/delete/"+Event._id,
      method: "GET",
      //params: $scope.Event
    }).then(function (response) {
  
      console.log(response.data);
      
       // $location.url('/newsfeed');
      var i=0;
       $rootScope.Events.forEach(Event => {
         if(Event._id==id) { 
           $rootScope.Events.splice(i,1);
          alertify.success("Event Deleted !!!") ;
        
        }
        i++;
       });
        
      
      if(response.data.DeletedCount==1){}
    });
  
  }
  
  
});