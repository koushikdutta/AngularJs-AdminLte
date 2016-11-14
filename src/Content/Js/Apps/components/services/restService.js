'use strict';

define(['app'], function (app) {

    var injectParams = ['$http', '$rootScope', 'AppUrl'];

    var restFactory = function ($http, $rootScope, AppUrl) {

        var restFactory = {};

        restFactory.getDefaultTreeData = function (parent_scope) {
            return [
                {title: "Test01", key: "1", type: 0, folder: true},
                {title: "Test02", key: "2", folder: true, iconClass: "fancytree-custom-icon", children: [
                        {title: "Node 2.1", key: "3", myOwnAttr: "abc"},
                        {title: "Node 2.2", key: "4"}
                    ]}
            ];
        };

        return restFactory;
    };

    restFactory.$inject = injectParams;

    app.factory('RestService', restFactory);

});