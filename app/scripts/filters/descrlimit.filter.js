'use strict';

/**
 * @ngdoc filter
 * @name gitissuesApp.filter:descrLimit
 * @function
 * @description
 * # descrLimit
 * Filter in the gitissuesApp.
 */
angular.module('gitissuesApp')

  /*
  * This filter trims the long string to l characters and takes care of not breaking the word space too
  * .{"+l+"} matches any character (except newline)
  * {"+l+"} Exactly l times
  * \S* match any non-white space character
  *  Between zero and unlimited times
   */
  .filter('descrLimit', function () {
    return function (input, l) {
      var x =  input;
      if(angular.isDefined(input))
        x = (input.match(new RegExp(".{"+l+"}\\S*")) || [input]) [0];

      return x;
    };
  })

  .filter('parseUserId', function () {
    return function (input, replacedUrl) {
      var y = input;
      if(angular.isDefined(input))
        y = input.replace(new RegExp('@[a-zA-Z]+'), '<a href="'+replacedUrl+'" target="_blank" class="userId">$&</a>')

      return y;
    };
  });

