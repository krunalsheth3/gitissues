'use strict';

/**
 * @ngdoc function
 * @name gitissuesApp.controller:IssuedetailsCtrl
 * @description
 * # IssuedetailsCtrl
 * Controller of the gitissuesApp
 */
angular.module('gitissuesApp')
  .controller('IssuedetailsCtrl',['issueDetails', 'defaultConst', 'sharedSvc', 'issuedetailsSvc', '$stateParams','$anchorScroll',
                function (issueDetails, defaultConst, sharedSvc, issuedetailsSvc, $stateParams, $anchorScroll) {

    var self = this;
    self.itemsPerPage = defaultConst.itemsPerPage;
    self.maxPaginationSize = defaultConst.maxPaginationSize;
    self.currentPage = defaultConst.currentPage;
    self.commentsData = [];
    self.issueDetails = issueDetails.data;
    self.totalItems = defaultConst.maxPaginationSize;


    if(self.issueDetails.comments > 0) {
      getComments(self.currentPage);
    } else {
      self.commentsData = "No comments available";
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
    * Invoked when pagination clicked
    */
    self.pageChanged = function(page) {
      self.currentPage = page;
      getComments(self.currentPage);
      $anchorScroll('/');
    }
    /*
    * set color for labels
    */
    self.set_color = function (color) {
      return sharedSvc.setLabelColor(color);
    }

  }]);
