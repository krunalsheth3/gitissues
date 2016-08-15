'use strict';

/**
 * @ngdoc function
 * @name gitissuesApp.controller:IssuedetailsCtrl
 * @description controller for Issue details html page
 * # IssuedetailsCtrl
 * Controller of the gitissuesApp
 */
angular.module('gitissuesApp')
  .controller('IssuedetailsCtrl',['issueDetails', 'defaultConst', 'sharedSvc', 'issuedetailsSvc', '$stateParams','$window',
                function (issueDetails, defaultConst, sharedSvc, issuedetailsSvc, $stateParams, $window) {

    var self = this;
    self.itemsPerPage = defaultConst.itemsPerPage;
    self.maxPaginationSize = defaultConst.maxPaginationSize;
    self.currentPage = defaultConst.currentPage;
    self.commentsData = [];
    self.issueDetails = issueDetails.data;
    self.totalItems = defaultConst.maxPaginationSize;

    if(self.issueDetails.comments > 0) {
      getComments(self.currentPage);
    }

    /*
    * getComments function will fetch the comments if pagination is clicked or default comments is greater than 0
     */
    function getComments(currentPage) {

      var commentsList = issuedetailsSvc.fetchCommentsDetails($stateParams.issueId, currentPage);
      commentsList.then(
        function(response) {
          sharedSvc.log("Retrieved data from fetchCommentDetails");
          self.commentsData = response.data;

          if(currentPage == 1)
            self.totalItems = sharedSvc.parseLinkHeader(response.headers().link) * defaultConst.itemsPerPage;
        },
        function(errResponse) {
          sharedSvc.error("Failed to make api call to fetchCommentsDetails");
        }
      )
    }

    /*
    * Api call to fetch the URL for userName provided
     */
    self.fetchUserProfile = function (userName) {
      var modUserName = userName.slice(1);

      sharedSvc.fetchUserProfileLink(modUserName).then(
        function(response){
          if(angular.isDefined(response))
            $window.open(response.data.html_url);
          else
            $window.alert("No github account found");
        },
        function(errResponse) {
          sharedSvc.error("Profile link not found for the given user");
        }
      )
    }


    /*
    * Invoked when pagination clicked
    */
    self.pageChanged = function(page) {
      self.currentPage = page;
      getComments(self.currentPage);

    }
    /*
    * set color for labels
    */
    self.set_color = function (color) {
      return sharedSvc.setLabelColor(color);
    }

  }]);
