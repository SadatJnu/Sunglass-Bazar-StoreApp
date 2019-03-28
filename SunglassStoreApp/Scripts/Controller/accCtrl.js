/// <reference path="../app.js" />
/// <reference path="../services/accountService.js" />

app.controller("accCtrl", function ($q, $scope, $http, $window, $rootScope, $cookies, accSvc) {
    var serviceBaseUrl = "http://localhost:2454/";

    $scope.uid = $cookies.get('uid');
    $scope.utoken = $cookies.get('utoken');

    $scope.toSignInOrDashboard = function () {
        if ($cookies.get('uid') && $cookies.get('utoken')) {
            if ($cookies.get('urole') == "Admin") {
                $window.location.href = "#/admin";
            }
            else if ($cookies.get('urole') == "Employee") {
                $window.location.href = "#/emcrud";
            }
            else {
                $window.location.href = "#/cuscrud";
            }
        }
        else {
            openDialog("accountPage");
        }
    }

    $scope.initialize = function () {
        $scope.current = {};
        //It Will Check Sign In Status
        if ($cookies.get('uid') && $cookies.get('utoken')) {
            $scope.hideSignInOptions = true;
        }
        else {
            $scope.hideSignInOptions = false;
        }
    }

    $scope.login = function () {
        var obj = { 'username': $scope.logn.Email, 'password': $scope.logn.UserPassword, 'grant_type': 'password' };

        Object.toparams = function ObjectsToParams(obj) {
            var p = [];
            for (var key in obj) {
                p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
        }

        $http({
            method: 'POST',
            url: serviceBaseUrl + "Token",
            data: Object.toparams(obj),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }).then(function (response) {
            $cookies.put('uid', response.data.userid);
            $cookies.put('utoken', response.data.access_token);
            $cookies.put('urole', response.data.role);

            $scope.username = response.data.role;
            $scope.initialize();
            $window.location.reload();

            $scope.getUserData();
            $scope.toSignInOrDashboard();
        }, function () {
            $scope.message = "Username or Password is invalid!";
        });
    }

    $scope.logout = function () {
        $scope.current = null;

        $cookies.remove('uid');
        $cookies.remove('urole');
        $cookies.remove('utoken');

        $window.location.href = "#/";
    }

    $scope.getUserData = function () {
        $http.get(serviceBaseUrl + "odata/AppUser(" + $cookies.get('uid') + ")"
        ).then(function (response) {
            $scope.user = response.data;
        }, function (error) {
            $scope.message = "Error : " + error.data;
        });
    }

    $scope.signUpUser = function () {
        var newUser = $scope.current;
        return (new accSvc({
            "EmpID": newUser.EmpID,
            "UserName": newUser.UserName,
            "Password": newUser.Password,
            "RoleType": "Customer",
            "Note": null
        })).$signUpUser().then(function (data) {
            alert(newUser.UserName + ",Thanks to be with us\nYour account has been created successfully..");
        });
    };


    //Dialog Open 
    $scope.openDialog = function openDialog(id) {
        $scope.closeDialog();
        document.getElementById(id).getElementsByClassName("jp-modal-body")[0].classList.remove("animated");
        document.getElementById(id).getElementsByClassName("jp-modal-body")[0].classList.remove("bounceOutDown");
        document.getElementById(id).getElementsByClassName("jp-modal-body")[0].classList.add("animated");
        document.getElementById(id).getElementsByClassName("jp-modal-body")[0].classList.add("bounceInDown");
        document.getElementById(id).style.display = "block";
    }

    $scope.closeDialog = function closeDialog() {
        for (var i = 0; i < document.querySelectorAll(".jp-modal").length; i++) {
            document.querySelectorAll(".jp-modal")[i].style.display = "none";
            document.querySelectorAll(".jp-modal")[i].getElementsByClassName("jp-modal-body")[0].classList.remove("animated");
            document.querySelectorAll(".jp-modal")[i].getElementsByClassName("jp-modal-body")[0].classList.remove("bounceInDown");
            document.querySelectorAll(".jp-modal")[i].getElementsByClassName("jp-modal-body")[0].classList.add("animated");
            document.querySelectorAll(".jp-modal")[i].getElementsByClassName("jp-modal-body")[0].classList.add("bounceOutDown");
        }
    }
    //Dialog Close


    ////----------------------UserInfo-----------------------------------
    //$scope.getallUserInfo = function () {
    //    (new accSvc()).$getallUser()
    //    .then(function (data) {
    //        $scope.users = data.value;
    //    });
    //}

});

