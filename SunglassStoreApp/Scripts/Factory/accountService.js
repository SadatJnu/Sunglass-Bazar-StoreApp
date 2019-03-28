/// <reference path="../app.js" />

app.factory('accSvc', function ($resource) {
    var userUrl = "http://localhost:2454/odata/Admin_Login/";

    return $resource("", {}, {
        'signUpUser': { method: "POST", url: userUrl },
    });
});

