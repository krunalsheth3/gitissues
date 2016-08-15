'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('gitissuesApp'));

  var MainCtrl,mockMainSvc, mockDefaultConst,mockSharedSvc;
  var mockFetchIssues = {
    config:{},
    data: [],
    headers: function() {
      var link = {};
      return link;
    },
    status: 200,
    statusText: 'OK'
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, mainSvc, defaultConst, sharedSvc){
    mockMainSvc  = mainSvc;
    mockDefaultConst = defaultConst;
    mockSharedSvc = sharedSvc;
    MainCtrl = $controller('MainCtrl', {
      fetchIssues: mockFetchIssues
    });

  }));


  it('should have defaultOrder set to created', function () {
    console.log('test for defaultSortOrder: ', MainCtrl.defaultSortOrder);
    expect(MainCtrl.defaultSortOrder).toBe('created');
  });
  it('should have state set to all', function () {
    console.log('test for default value of state: ', MainCtrl.state);
    expect(MainCtrl.state).toBe('all');
  });
  it('should have direction set to desc', function () {
    console.log('test for default value of direction: ', MainCtrl.direction);
    expect(MainCtrl.direction).toBe('desc');
  });
  it('should have dateSortText set to Newest', function () {
    console.log('test for default value of dateSortText: ', MainCtrl.dateSortText);
    expect(MainCtrl.dateSortText).toBe('Newest');
  });
  it('totalItems should be a numerical Values', function () {
    console.log('test for totalItems should be a valid number: ',MainCtrl.totalItems );
    expect(isNaN(MainCtrl.totalItems)).toBeFalsy();
  });

  it('should have itemsPerPage be a numerical Values', function () {
    console.log('test for itemsPerPage should be a valid number: ',MainCtrl.itemsPerPage );
    expect(isNaN(MainCtrl.itemsPerPage)).toBeFalsy();
  });

  it('should have maxPaginationSize be a numerical Values & should be 25', function () {
    console.log('test for maxPaginationSize should be a valid number & it should be 25: ',MainCtrl.maxPaginationSize);
    expect(isNaN(MainCtrl.maxPaginationSize)).toBeFalsy();
    expect(MainCtrl.maxPaginationSize).toBe(5);
  });

  it('should have currentPage be a numerical value', function () {
    console.log('test for currentPage should be a valid number : ',MainCtrl.currentPage);
    expect(isNaN(MainCtrl.currentPage)).toBeFalsy();

  });


  it('should have typesOfStates set to valid array of objects', function () {
    console.log('test for default value of typesOfStates: ', MainCtrl.typesOfStates);
    expect(MainCtrl.typesOfStates).toEqual([
      {name: 'open'},
      {name: 'closed'},
      {name: 'all'}
    ]);
  });

  it('should have typesOfSorting set to valid array of objects', function () {
    console.log('test for default value of typesOfSorting: ', MainCtrl.typesOfSorting);
    expect(MainCtrl.typesOfSorting).toEqual([
      {name: 'Recently Created', value: 'created'},
      {name: 'Recently updated', value: 'updated'},
      {name: 'Number of comments', value: 'comments'}
    ]);
  });

  it('should have returned an object with color set into it', function() {
    var color = 'FF0000';
    var actualSetColor = MainCtrl.set_color(color);

    color = '#' + color;
    var expectedSetColor = {
      'background-color': color,
      'color': '#FFFFFF',
      'height': '16px',
      'line-height': 1
    };

    console.log('test for expected color when calling set_color ');
    expect(actualSetColor).toEqual(expectedSetColor);
    expect(actualSetColor).toBeTruthy();
  });

});


