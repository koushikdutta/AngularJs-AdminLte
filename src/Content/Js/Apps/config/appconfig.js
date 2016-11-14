'use strict';

define(['app', 'module'], function (app, module) {
    app.constant("AppConfig", {
        "cacheBustSuffix": module.uri.split("?v=").pop(),
        //DesktopApp
        "templatePath": "Content/Js/Apps/templates/",
        "defaultIconPath": "Content/Images/",
        //Common
        "unhandle_exception": "Unhandled exception occurred. Please try again after few minutes and report this error.",
        "footer_copyright": "<strong>Copyright &copy; 2015-2016 <a href='#'>Company Name</a>.</strong> All rights reserved."
    });
    app.run(['AppConfig', '$rootScope', '$state', '$stateParams', function (AppConfig, $rootScope, $state, $stateParams) {
            $rootScope.footer_content = AppConfig.footer_copyright;
            $rootScope.version = AppConfig.cacheBustSuffix; //AppConfig.cacheBustSuffix.substring(0, 3);
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

        }]);
    app.provider('AppUrl', [function (AppConfig) {
            this.path = '';
            this.$get = function () {
                var _path = "http://localhost:8282/";
                return {"path": _path};
            };
        }]);
});