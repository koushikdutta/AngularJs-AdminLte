'use strict';

define(['app'], function (app) {

    var injectParams = ['$rootScope', '$timeout', 'AppConfig', '$injector', '$q'];
    var httpResponseFactory = function ($rootScope, $timeout, AppConfig, $injector, $q) {
        var retries = 0,
                waitBetweenErrors = 1000,
                maxRetries = 5;

        var onResponseError = function (httpConfig) {
            var $http = $injector.get('$http');
            //
            return $timeout(function () {
                return $http(httpConfig);
            }, waitBetweenErrors);
        };

        var responseError = function (response) {
            console.log("Http Retry with Status: ", retries, response.status);
            if (response.config.url.indexOf(AppConfig.templateMobilePath) != -1) {
                return $q.reject(response); // give up
            }
            //if ((response.status === 0 || response.status === 401) && retries < maxRetries) {
            if ((response.status != 200) && (retries < maxRetries)) {
                retries++;
                return onResponseError(response.config); // should retry
                //} else if ((response.status === 0 || response.status === 401) && retries >= maxRetries)
            } else if ((response.status != 200) && (retries >= maxRetries))
            {
                retries = 0;
                switch (response.status)
                {
                    case 0:
                        $rootScope.$broadcast('OnInvalidAccess', response.error, response.status);
                        break;
                    case 401:
                        $rootScope.$broadcast('On401Access', response.error, response.status);
                        break;
                    default:
                        $rootScope.$broadcast('OnInvalidAccess', response.error, response.status);
                }
                return $q.reject(response); // give up
            } else {
                retries = 0;
                return $q.reject(response); // give up
            }
        };

        return {
            responseError: responseError
        }
    };

    httpResponseFactory.$inject = injectParams;
    app.factory('HttpErrorInterceptor', httpResponseFactory).config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('HttpErrorInterceptor');
        }]);
});