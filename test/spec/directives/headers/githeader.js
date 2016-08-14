'use strict';

describe('Directive: gitHeader', function () {

  // load the directive's module
  beforeEach(module('gitissuesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<git-header></git-header>');
    element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the gitHeader directive');
  }));
});
