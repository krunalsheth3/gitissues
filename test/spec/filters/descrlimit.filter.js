'use strict';

describe('Filter: descrLimit', function () {

  // load the filter's module
  beforeEach(module('gitissuesApp'));

  // initialize a new instance of the filter before each test
  var descrLimit;
  beforeEach(inject(function ($filter) {
    descrLimit = $filter('descrLimit');
  }));

  it('should return the input prefixed with "descrLimit filter:"', function () {
    var text = 'angularjs';
    expect(descrLimit(text)).toBe('descrLimit filter: ' + text);
  });

});
