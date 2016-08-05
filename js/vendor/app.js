(function(angular) {
  'use strict';
angular.module('bussinesInit', ['ngRoute'])

 .controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })
 
.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/index', {
    templateUrl: 'index.html',
    controller: 'MainController'
  })
  .when('/about', {
    templateUrl: 'about.html'
  });

  // configure html5 to get links working on jsfiddle
  $locationProvider.html5Mode(true);
});
})(window.angular);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
