define([], function () {

    var app = angular.module('DemoApp', [
        'LocalStorageModule',
        'ui.router', // Routing 
        'oc.lazyLoad', // ocLazyLoad 
        'ui.bootstrap', // Ui Bootstrap
        'ngIdle', // Idle timer
        'ngSanitize', // ngSanitize
        'ngResource',
        'dialogs.main',
        'blockUI' //blockUI
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
    app.config(['blockUIConfig', function (blockUIConfig) {
            // Change the default overlay message
            blockUIConfig.message = 'Please wait';
            // Change the default delay to 100ms before the blocking is visible
            blockUIConfig.delay = 100;
            // Provide a custom template to use
            //blockUIConfig.template = '<pre><code>{{ state | json }}</code></pre>';
            // Disable automatically blocking of the user interface
            //blockUIConfig.autoBlock = false;
        }]);
    app.run(['$http',
        function ($http) {
            $http.defaults.headers.common.Accept = 'application/json';
        }
    ]);
    return app;
});