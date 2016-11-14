'use strict';

define(['app'], function (app) {
    //escapeHTML
    app.filter('escapeHTML', function () {
        return function (text) {
            return text.
                    replace(/'/g, "&apos").
                    replace(/&/g, '&amp;').
                    replace(/</g, '&lt;').
                    replace(/>/g, '&gt;');
        };
    });
    app.filter('trustedHtml', ['$sce', function ($sce) {
            var div = document.createElement('div');
            return function (text) {
                div.innerHTML = text;
                return $sce.trustAsHtml(div.textContent);
            };
        }]);
});