/*
 To change this license header, choose License Headers in Project Properties.
 To change this template file, choose Tools | Templates
 and open the template in the editor.
 */
/* 
 Created on : 10 June, 2016, 10:20:40 AM
 Author     : Koushik
 */
'use strict';

define(['app'], function (app) {
    return app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$ocLazyLoadProvider',
        'IdleProvider',
        'AppConfig',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, AppConfig) {

            // Configure Idle settings
            IdleProvider.idle(5); // in seconds
            IdleProvider.timeout(120); // in seconds
            $ocLazyLoadProvider.config({
                // Set to true if you want to see what and when is dynamically loaded
                debug: true,
                loadedModules: ['app']
            });

            $stateProvider

                    .state('login', {
                        url: "/login",
                        templateUrl: AppConfig.templatePath + "loginView.tpl.html?v=" + AppConfig.cacheBustSuffix,
                        controller: 'LoginCtrl',
                        data: {pageTitle: 'DemoApp Login'}
                    })

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: AppConfig.templatePath + "dashboard.tpl.html?v=" + AppConfig.cacheBustSuffix,
                        controller: 'BaseCtrl'
                    })

                    .state('app.dashboard', {
                        url: "/dashboard",
                        controller: 'GraphCtrl',
                        data: {pageTitle: 'DemoApp Dashboard'},
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                ]);
                            }
                        }
                    })

                    .state('app.ngtable', {
                        url: "/dashboard",
                        controller: 'BaseCtrl',
                        data: {pageTitle: 'DemoApp Dashboard'},
                        resolve: {
                            loadPlugin: function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                ]);
                            }
                        }
                    });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/login');
        }
    ]);
});