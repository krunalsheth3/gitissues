'use strict';

/**
 * @ngdoc service
 * @name gitissuesApp.shared
 * @description
 * # shared
 * Factory in the gitissuesApp.
 */
angular.module('gitissuesApp')
  .factory('sharedSvc', ['$log', function($log){
    return {
      messageCount : 0,

      /*
       * This function parses the entire LINK header and returns the value of the page element with the rel="last"
      */
      parseLinkHeader: function(linkHeader) {
        var querystring = "";
        //Split links by Comma

        try{
          var linksArr = linkHeader.split(',');
          var obj = {};

          // Parse each part into a named link
          angular.forEach(linksArr, function (value) {
            var section = value.split(';');
            if (section.length != 2) {
              throw new Error("section could not be split on ';'");
            }
            var url = section[0].replace(/<(.*)>/, '$1').trim();
            var name = section[1].replace(/rel="(.*)"/, '$1').trim();
            obj[name] = url;
          });

          //fetch the URL for the page item with last key
          querystring = obj.last;
          querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
          var params = {}, pair, d = decodeURIComponent;
          // march and parse
          for (var i = querystring.length - 1; i >= 0; i--) {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1]);
          }

          return params.page;
        } catch(e) {
          //default the max limit of the entries
          return 1;
        }

      },

      /*
      * setLabelColor will append a style element and send it to the respective View
       */
      setLabelColor: function(color) {
        if (color) {
          color = "#" + color;
          return {
            'background-color': color,
            'color' : '#FFFFFF',
            'height': '19px'
          };
        }
      },

      /*
       *   Logger function to print console logs every where throughout the Portal
       */
      log: function(response){
        $log.info("(LOG + " + this.messageCount++ + ") "+ response);

        if(angular.isDefined(response.config)){
          $log.info("for url : "+response.config.url);
        }
      },

      /*
       *   error function to print console error logs
       */
      error: function(response){

        if(angular.isObject(response)){
          $log.error("(LOG + " + this.messageCount++ + ") ");
        } else {
          $log.error("(LOG + " + this.messageCount++ + ") "+ response);
        }
      }

    };
  }])
