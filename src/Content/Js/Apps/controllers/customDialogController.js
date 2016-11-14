/* 
 Created on : 10 Sep, 2015, 5:31:40 PM
 Author     : Koushik
 */
'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope', '$state', '$rootScope', '$uibModalInstance'];
    var customDialogController = function ($scope, $state, $rootScope, $uibModalInstance) {

        $scope.CloseCustomerDiag = function () {
            $uibModalInstance.dismiss('Canceled');
            $scope.left_bar_state = "JoinJsView";
        };

    };

    customDialogController.$inject = injectParams;
    app.controller('CustomDialogCtrl', customDialogController);
});