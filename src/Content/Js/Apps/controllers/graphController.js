/* 
 Created on : 14 Auguest, 2016, 5:31:40 PM
 Author     : Koushik
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$state', '$rootScope', 'AppConfig', 'RestService'];
    var graphController = function ($scope, $state, $rootScope, AppConfig, RestService) {
        console.log("Controller CommonCtrl Loaded");

    };
    graphController.$inject = injectParams;
    app.controller('GraphCtrl', graphController);
});