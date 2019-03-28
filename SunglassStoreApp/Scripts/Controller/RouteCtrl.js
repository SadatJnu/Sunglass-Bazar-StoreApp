/// <reference path="../angular.js" />
/// <reference path="../app/app.js" />

app.config(function ($routeProvider) {
    $routeProvider.
        when("/", {
            templateUrl: 'Sunglass/mainBody',
            controller: 'sunglassCtrl'
        }).
        when("/profile", {
            templateUrl: 'Sunglass/profile',
            controller: 'sunglassCtrl'
        }).
        when('/accountPage', {
            templateUrl: 'Sunglass/account',
            controller: 'accCtrl'
        }).
        when('/menProducts', {
            templateUrl: 'Sunglass/menProducts',
            controller: 'sunglassCtrl'
        }).
         when('/kidsProductsPage', {
             templateUrl: 'Sunglass/kidsProducts',
             controller: 'sunglassCtrl'
         }).
        when('/checkoutPage', {
            templateUrl: 'Sunglass/checkout',
            controller: 'sunglassCtrl'
        }).
        when('/contactPage', {
            templateUrl: 'Sunglass/contact',
            controller: 'sunglassCtrl'
        }).
        when('/womenProductsPage', {
            templateUrl: 'Sunglass/womenProducts',
            controller: 'sunglassCtrl'
        }).
         when('/registerPage', {
             templateUrl: 'Sunglass/register',
             controller: 'accCtrl'
         }).
         when('/singlePage', {
             templateUrl: 'Sunglass/single',
             controller: 'sunglassCtrl'
         }).
         when('/reviews', {
             templateUrl: 'Sunglass/reviews',
             controller: 'sunglassCtrl'
         }).
        when('/newCollectionPage', {
            templateUrl: 'Sunglass/newCollection',
            controller: 'sunglassCtrl'
        }).
        when('/faqPage', {
            templateUrl: 'Sunglass/faq',
            controller: 'sunglassCtrl'
        }).
        when('/bestSellersPage', {
            templateUrl: 'Sunglass/bestSellers',
            controller: 'sunglassCtrl'
        }).
        when('/polarizedPage', {
            templateUrl: 'Sunglass/polarized',
            controller: 'sunglassCtrl'
        }).
        when('/topRatedPage', {
            templateUrl: 'Sunglass/topRated',
            controller: 'sunglassCtrl'
        }).
         when('/ourTeamPage', {
             templateUrl: 'Sunglass/ourTeam',
             controller: 'sunglassCtrl'
         }).
         when('/aboutPage', {
             templateUrl: 'Sunglass/about',
             controller: 'sunglassCtrl'
         }).
        //Admin Route Controller
        when('/admin', {
            templateUrl: 'Default/adminDashboard',
            controller: 'sunglassCtrl'
        }).
        when('/emcrud', {
            templateUrl: 'Default/employeeCrud',
            controller: 'sunglassCtrl'
        }).
        when('/cuscrud', {
            templateUrl: 'Default/customerCrud',
            controller: 'sunglassCtrl'
        }).
        when('/pcrud', {
            templateUrl: 'CrudOperation/productCrud',
            controller: 'sunglassCtrl'
        }).
        otherwise({ redirectTo: '/' });
})

//====================================================================================================

//app.controller("menProductsCtrl", function ($scope) {
//    $scope.message = "MenProducts";
//})
//app.controller("kidsProductsCtrl", function ($scope) {
//    $scope.message = "KidsProducts";
//})
//app.controller("accountCtrl", function ($scope) {
//    $scope.message = "Account";
//})

//app.controller("checkoutCtrl", function ($scope) {
//    $scope.message = "Checkout";
//})

//app.controller("contactCtrl", function ($scope) {
//    $scope.message = "Contact";
//})

//app.controller("womenProductsCtrl", function ($scope) {
//    $scope.message = "WomenProducts";
//})

//app.controller("registerCtrl", function ($scope) {
//    $scope.message = "Register";
//})

//app.controller("singleCtrl", function ($scope) {
//    $scope.message = "Single";
//})

//app.controller("newCollectionCtrl", function ($scope) {
//    $scope.message = "NewCollection";
//})

//app.controller("faqCtrl", function ($scope) {
//    $scope.message = "FAQ";
//})

//app.controller("bestSellersCtrl", function ($scope) {
//    $scope.message = "BestSellers";
//})

//app.controller("polarizedCtrl", function ($scope) {
//    $scope.message = "Polarized";
//})

//app.controller("topRatedCtrl", function ($scope) {
//    $scope.message = "TopRated";
//})

//app.controller("ourTeamCtrl", function ($scope) {
//    $scope.message = "OurTeam";
//})

//app.controller("aboutCtrl", function ($scope) {
//    $scope.message = "About";
//})



