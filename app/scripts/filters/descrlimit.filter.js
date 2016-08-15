'use strict';

/**
 * @ngdoc filter
 * @name gitissuesApp.filter:descrLimit
 * @function
 * @description Has 2 filters added to it
 * descriLimit filter uses regex to trim space to the given 'l' characters and returns the trimmed text
 * parseUserId identifies a userID with '@' and makes it as a link
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

  /*
  * parseUserId takes input which is body of the comment & using regex replaces all occurences of @userid with
  * a link tag which when clicked makes an api call to fetch userInfo and load his/her github profile page
   */
  .filter('parseUserId', function () {
    return function (input, ctrl) {

      var y = input;
      if(angular.isDefined(input))
        y = input.replace(/@[a-zA-Z|\d|-]+/g,'<a href="" target="_blank" class="userId" ng-click="issueDetailsCtrl.fetchUserProfile(\'$&\')">$&</a>');

      return y;
    };
  });
