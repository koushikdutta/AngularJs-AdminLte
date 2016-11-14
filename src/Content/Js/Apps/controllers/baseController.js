/* 
 Created on : 14 Auguest, 2016, 5:31:40 PM
 Author     : Koushik
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$state', '$rootScope', 'AppConfig', 'RestService', 'dialogs'];
    var baseController = function ($scope, $state, $rootScope, AppConfig, RestService, dialogs) {
        console.log("Controller BaseCtrl Loaded");
        var present_state = "";
        var _dialog_path = "Content/Js/Apps/templates/dialog-share/";
        $scope.left_bar_state = "JointJsView";

        $rootScope
                .$on('$stateChangeSuccess',
                        function (event, toState, toParams, fromState, fromParams) {
                            state_init(toState, toParams, fromState);
                        });
        //#endregion

        $scope.init = function () {
            state_init($state.current, $state.params, null);
        };

        var state_init = function (currentstate, params, fromState) {
            //
            if ((present_state == currentstate.name)) //&& (current_state != 'app.casefolder')
                return;
            present_state = currentstate.name;
            //
            switch (present_state) {
                case "app.dashboard":
                    $scope.dash_state = "JointJsView";
                    _loaddashboard();
                    break;
                case "app.ngtable":
                    $scope.dash_state = "NgTableView";
                    _loadngtable();
                    break;
                default:
            }
        };

        var _loaddashboard = function () {
            console.log("_loaddashboard");
        };
        
        var _loadngtable = function () {
            console.log("_loadngtable");
        };

        $scope.ModelDialogView = function () {
            $scope.left_bar_state = "ModelDialog";
            var dlg = dialogs.create(_dialog_path + "dialog-container.tpl.html", 'CustomDialogCtrl', {data: "data", anotherVar: 'value'}, {}, 'ctrl');
            dlg.result.then(function (name) {
                $scope.name = name;
            }, function () {
                if (angular.equals($scope.name, ''))
                    $scope.name = 'You did not enter in your name!';
            });
        };
    };
    baseController.$inject = injectParams;
    app.controller('BaseCtrl', baseController);
});