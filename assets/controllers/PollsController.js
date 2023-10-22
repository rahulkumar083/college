
Router.controller('PollsController', function ($scope, $http, $location,$rootScope) {

  $http.defaults.headers.post["Content-Type"] = "application/json";

  $scope.PollReply={UserID:"",SelectedOption:"",SelectedOptionValue:""};
  console.log($rootScope.Polls);
      
      $scope.SelectedOption ="";

      $scope.SelectOption=function(Poll,Option,OptionNumber)
      {
       
        
        Poll.SelectedOption = Option;
        $scope.PollReply.SelectedOption=OptionNumber;
        $scope.PollReply.SelectedOptionValue=Option;
      }
      $scope.SubmitPoll=function(Poll)
      {
        //console.log(Poll);return;
        var PollReply = {
          UserID: $rootScope.User._id,
          PollID: Poll._id,
          SelectedOption: $scope.PollReply.SelectedOption,
          SelectedOptionValue: $scope.PollReply.SelectedOptionValue
        };
    
        console.log(PollReply);

        $http({
          url: $rootScope.url+"api/polls/AddPollReply",
          method: "POST",
          params: PollReply
        }).then(function (response) {

          console.log(response.data);
          alertify.success("Answer Submitted");
          $rootScope.LoadPolls();
          $scope.PollReply={};
        });
    




      }
  //$rootScope.ShowFootbar = false;
  
});