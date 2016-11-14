/* 
 Created on : 14 Auguest, 2016, 5:31:40 PM
 Author     : Koushik
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$state', '$rootScope', 'AppConfig'];
    var loginController = function ($scope, $state, $rootScope, AppConfig) {
        console.log("Controller BaseCtrl Loaded");
        var present_state = "";

        $scope.doLogin = function () {
            $state.go("app.dashboard");
        };
    };
    loginController.$inject = injectParams;
    app.controller('LoginCtrl', loginController);
});