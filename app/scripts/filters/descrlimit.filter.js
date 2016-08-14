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
  * \r matches carriage return, \n matches newline, \b will take care of word boundary
  * . will match any character {1,140} between 1 to 140 chars
  *  Between zero and unlimited times
   */
  .filter('descrLimit', function () {
    return function (input, l) {
      var x =  input;
      if(angular.isDefined(input))
        x = input.match(/^(\r\n|.){1,140}\b/g);
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

