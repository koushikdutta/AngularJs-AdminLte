define([], function () {

    var app = angular.module('DemoApp', [
        'LocalStorageModule',
        'ui.router', // Routing 
        'oc.lazyLoad', // ocLazyLoad 
        'ui.bootstrap', // Ui Bootstrap
        'ngIdle', // Idle timer
        'ngSanitize', // ngSanitize
        'ngResource',
        'dialogs.main'
    ]);
    var enableLog = true;
    app.run(['$rootScope', '$location', function ($rootScope, $location) {

            $rootScope
                    .$on('$stateChangeStart',
                            function (event, toState, toParams, fromState, fromParams) {
                                //console.log("State Change: transition begins!!!");
                            });
            $rootScope
                    .$on('$stateChangeSuccess',
                            function (event, toState, toParams, fromState, fromParams) {
                                //console.log("State Change: State change success!");
                            });
            $rootScope
                    .$on('$stateChangeError',
                            function (event, toState, toParams, fromState, fromParams) {
                                //console.log("State Change: Error!");
                            });
            $rootScope
                    .$on('$stateNotFound',
                            function (event, toState, toParams, fromState, fromParams) {
                                //console.log("State Change: State not found!");
                            });
            $rootScope
                    .$on('$viewContentLoading',
                            function (event, viewConfig) {
                                //console.log("View Load: the view is loaded, and DOM rendered!");
                            });
            $rootScope
                    .$on('$viewcontentLoaded',
                            function (event, viewConfig) {
                                //console.log("View Load: the view is loaded, and DOM rendered!");
                            });
        }]);
    app.run(['$http',
        function ($http) {
            $http.defaults.headers.common.Accept = 'application/json';
        }
    ]);
    return app;
});