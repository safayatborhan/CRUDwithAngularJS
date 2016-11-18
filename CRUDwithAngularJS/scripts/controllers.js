/// <reference path="angular.js" />

angular.module("CrudDemoApp.controllers", [])
.controller("MainController", function ($scope, PlayerService) {
    $scope.message = "This is crud demo app controller";

    //this will get all data from the table
    PlayerService.getPlayerFromDB().then(function (d) {
        $scope.listOfPlayers = d.data.list;
    })

    //this is responsible for deleting particular player data
    $scope.DeletePlayer = function (id) {
        PlayerService.deletePlayerFromDB(id);
    }
})
.controller("AddPlayerController", function ($scope, PlayerService) { //we will call the services in factory we have created below
    $scope.message = "This is from add player controller";            //here, the parameter of the function should be the name of
    $scope.AddPlayer = function () {                                  //corresponding service, otherwise function will not be able to find
        PlayerService.addPlayerToDB($scope.Player);
    }
})
.controller("EditPlayerController", function ($scope, PlayerService,$routeParams) {   //$routeParams is used to get the id from the parameter which is in the route
    $scope.message = "This is from edit player controller";
    //This is generating the same values as in the main table
    var id = $routeParams.id;
    PlayerService.getPlayerByID(id).then(function (d) {
        $scope.Player = d.data.player;
    });
    //This is updating the values
    $scope.UpdatePlayer = function () {
        PlayerService.updatePlayerToDB($scope.Player);
    }
})
.factory("PlayerService", ["$http", function ($http) {

    var fac = {};

    //this function return all the players
    fac.getPlayerFromDB = function () {
        return $http.get("/Player/GetPlayers");  //Players is name of Controller and GetPlayers is the method
    }

    //this function return specific player of correspoding id
    fac.getPlayerByID = function (id) {    //the id parameter name should be matched with the name of the method in the controller
        return $http.get("/Player/GetPlayerByID", { params: { id: id } });
    }

    //this function adds player to the database
    fac.addPlayerToDB = function (player) {
        return $http.post("/Player/AddPlayer", player).success(function (response) {
            alert(response.status);
        });
    }

    //this function updates player to the database
    fac.updatePlayerToDB = function (player) {
        return $http.post("/Player/UpdatePlayer", player).success(function (response) {
            alert(response.status);
        });
    }

    //this function deletes player from database
    fac.deletePlayerFromDB = function (id) {
        return $http.post("/Player/DeletePlayer", { id: id }).success(function (response) {
            alert(response.status);
        });
    }

    return fac;

}])