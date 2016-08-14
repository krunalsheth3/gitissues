'use strict';

describe('Service: sharedSvc', function () {

  // load the service's module
  beforeEach(module('gitissuesApp'));

  // instantiate service
  var shared;
  beforeEach(inject(function (_shared_) {
    shared = _shared_;
  }));

  it('should do something', function () {
    expect(!!shared).toBe(true);
  });

});
