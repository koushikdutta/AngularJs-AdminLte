'use strict';

define(['app'], function (app) {
    //app.filter('searchCase', function () {
    //    return function (item) {
    //        return item.toUpperCase();
    //    };
    //});
    app.filter('toArray', function () {
        return function (obj) {
            if (!(obj instanceof Object))
                return obj;
            return _.map(obj, function (val, key) {
                return Object.defineProperty(val, '$key', {__proto__: null, value: key});
            });
        };
    });
});
