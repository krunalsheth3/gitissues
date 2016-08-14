'use strict';

describe('Service: issuedetailsSvc', function () {

  // load the service's module
  beforeEach(module('gitissuesApp'));

  // instantiate service
  var issuedetails.service;
  beforeEach(inject(function (_issuedetails.service_) {
    issuedetails.service = _issuedetails.service_;
  }));

  it('should do something', function () {
    expect(!!issuedetails.service).toBe(true);
  });

});
