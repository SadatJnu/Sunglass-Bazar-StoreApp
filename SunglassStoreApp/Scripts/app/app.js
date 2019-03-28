/// <reference path="../angular.js" />

var app = angular.module("SunglassBazar", ['ngRoute', 'ngResource', 'ngMessages', 'ngCookies', 'angularUtils.directives.dirPagination', ]);

app.config(['$httpProvider', function ($httpProvider) {
    var interceptor = function ($cookies, $q, $window) {
        return {
            request: function (config) {
                var access_token = $cookies.get('utoken');
                if (access_token != null) {
                    config.headers['Authorization'] = 'Bearer ' + access_token;
                }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $window.location.href = "#/";
                    return $q.reject(rejection);
                }
                return $q.reject(rejection);
            }
        }
    }
    var params = ['$cookies', '$q', '$window'];
    interceptor.$inject = params;
    $httpProvider.interceptors.push(interceptor);
}]);