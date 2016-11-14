/* 
 Created on : 10 June, 2016, 10:41:40 AM
 Author     : Koushik
 */
require.config({
    baseUrl: 'Content/Js/Apps/',
    urlArgs: 'v=1.0.0.Alpha'
});

require(
        [
            'app',
            'config/appconfig',
            //Components
            'components/routes',
            //Controller
            'controllers/loginController',
            'controllers/baseController',
            'controllers/graphController',
            'controllers/customDialogController',
            //Utility
            'components/utility/http/httpErrorInterceptor',
            //Service        
            'components/services/restService',
            //Filters
            'components/filters/shortFilter',
            'components/filters/utilityFilter',
            //Directives
            'components/directives/jointjs-diagram'
        ],
        function () {
            angular.bootstrap(document, ['DemoApp']);
        });