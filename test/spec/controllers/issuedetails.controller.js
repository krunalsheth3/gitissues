'use strict';

describe('Controller: IssuedetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('gitissuesApp'));
  //
   var IssuedetailsCtrl,mockDefaultConst, mockSharedSvc,mockIssueDetailsSvc;
  var mockIssueDetails = {
    config:{},
    data: [{
      'comments': 3
    }],
    headers: function() {
      var link = {};
      return link;
    },
    status: 200,
    statusText: "OK"
  };

  var mockCommentsData = [
    {},
    {}
  ]

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, defaultConst, sharedSvc, issuedetailsSvc, $stateParams) {

    mockDefaultConst = defaultConst
    mockSharedSvc = sharedSvc,
    mockIssueDetailsSvc = issuedetailsSvc;

    IssuedetailsCtrl = $controller('IssuedetailsCtrl', {
      issueDetails: mockIssueDetails,
      commentsData: mockCommentsData
    });
  }));


  it('totalItems should be a numerical Values', function () {
    console.log("test for totalItems should be a valid number: ",IssuedetailsCtrl.totalItems );
    expect(isNaN(IssuedetailsCtrl.totalItems)).toBeFalsy();
  });

  it('should have itemsPerPage be a numerical Values', function () {
    console.log("test for itemsPerPage should be a valid number: ",IssuedetailsCtrl.itemsPerPage );
    expect(isNaN(IssuedetailsCtrl.itemsPerPage)).toBeFalsy();
  });

  it('should have maxPaginationSize be a numerical Values & should be 25', function () {
    console.log("test for maxPaginationSize should be a valid number & it should be 25: ",IssuedetailsCtrl.maxPaginationSize);
    expect(isNaN(IssuedetailsCtrl.maxPaginationSize)).toBeFalsy();
    expect(IssuedetailsCtrl.maxPaginationSize).toBe(5);
  });

  it('should have currentPage be a numerical value', function () {
    console.log("test for currentPage should be a valid number : ",IssuedetailsCtrl.currentPage);
    expect(isNaN(IssuedetailsCtrl.currentPage)).toBeFalsy();

  });

  it('should have returned an object with color set into it', function() {
    var color = "FF0000";
    var actualSetColor = IssuedetailsCtrl.set_color(color);

    color = "#" + color;
    var expectedSetColor = {
      'background-color': color,
      'color': '#FFFFFF',
      'height': '16px',
      'line-height': 1
    }
    console.log("test for expected color when calling set_color ");
    expect(actualSetColor).toEqual(expectedSetColor);
    expect(actualSetColor).toBeTruthy();
  });

  it('should have response object to be valid when comments is more than 0', function () {
    console.log("test for issuedetails comments if greater or less than 0");
    if(IssuedetailsCtrl.issueDetails[0].comments > 0) {
      expect(IssuedetailsCtrl.commentsData).toBeDefined();
    } else {
      expect(IssuedetailsCtrl.commentsData).toEqual("No comments available");
    }
  })
});
