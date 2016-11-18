/// <reference path="angular.js" />

var app = angular.module("CrudDemoApp", ["CrudDemoApp.controllers", "ngRoute"]);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "Partials/PlayerList.html", controller: "MainController" })
        .when("/addPlayer", { templateUrl: "Partials/AddPlayer.html", controller: "AddPlayerController" })
        .when("/editPlayer/:id", { templateUrl: "Partials/EditPlayer.html", controller: "EditPlayerController" })
        .otherwise({ redirectTo: "/" });
}]);


//app.config(function ($routeProvider) {
//    $routeProvider
//    .when("/", {
//        templateUrl: "Partials/PlayerList.html",
//        controller: "MainController"
//    })    
//    .otherwise({ redirectTo: "/" });
//});