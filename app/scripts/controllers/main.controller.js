'use strict';

/**
 * @ngdoc function
 * @name gitissuesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitissuesApp
 */
angular.module('gitissuesApp')
  .controller('MainCtrl',['mainSvc', 'fetchIssues', 'defaultConst', 'sharedSvc', '$state',
                function (mainSvc, fetchIssues, defaultConst, sharedSvc, $state) {

    var self = this;
    self.itemsPerPage = defaultConst.itemsPerPage;
    self.maxPaginationSize = defaultConst.maxPaginationSize;
    self.currentPage = defaultConst.currentPage;
    self.defaultSortOrder = "created";
    self.state = "all";
    self.direction = "desc";
    self.dateSortText = "Newest";

    self.listOfIssues = fetchIssues.data;

    self.totalItems = sharedSvc.parseLinkHeader(fetchIssues.headers().link) * defaultConst.itemsPerPage;

    self.sortReverse = false;

    self.typesOfStates = [
      {name: 'open'},
      {name: 'closed'},
      {name: 'all'}
    ];

    self.typesOfSorting = [
      {name: 'Recently Created', value: 'created'},
      {name: 'Recently updated', value: 'updated'},
      {name: 'Number of comments', value: 'comments'}
    ]

    /*
    * on any kinds of state change trigger the pageChanged fucntion to load new data
     */
    self.onStateChange = function() {
      this.pageChanged(self.current, self.defaultSortOrder, self.state, self.direction)
    }

    /*
    * on Change of date
    */
    self.onDateChange = function () {
      self.sortReverse = !self.sortReverse;
      if(self.sortReverse) {
        self.direction = 'asc';
        self.dateSortText = "Oldest";
      } else {
        self.direction = 'desc';
        self.dateSortText = "Newest";
      }
      this.pageChanged(self.current, self.defaultSortOrder, self.state, self.direction);
    }

    /*
    * Invoked when pagination or dropdown action changesto fetch data for next page
     */
    self.pageChanged = function(page, sort, state, direction) {
      self.currentPage = page;
      self.defaultSortOrder = sort;
      self.state = state;
      self.direction = direction;

      var issuesList = mainSvc.fetchIssues(self.currentPage, self.defaultSortOrder, self.state, self.direction);
      issuesList.then(
        function(response) {
          self.listOfIssues = response.data;
        },
        function(errResponse) {
          self.listOfIssues = {};
          sharedSvc.log("Failed to make api call to fetchIssues");
        }
      )
    };

    /*
    * set color for labels
    */
    self.set_color = function (color) {
      return sharedSvc.setLabelColor(color);
    }

    /*
    * Navigate to issue details page
    */
    self.goToDetailsPage = function(number) {
      $state.go("issues-detail", {issueId: number});
    }



  }])


