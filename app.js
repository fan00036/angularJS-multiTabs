'use strict';


window.angular.module('app', ['ngRoute','LocalStorageModule'])
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('demoPrefix');

    })


    .config(function($routeProvider) {
        $routeProvider
        .when('/home/:listID', {
        templateUrl: 'home.html',
        controller : 'ListCtrl'
        });
        $routeProvider.otherwise('/home/1');
        
    })

    .controller('ListCtrl',
        function ($scope, $route, $routeParams, $location,localStorageService) {
        var listID = ($routeParams.listID);
            var items = localStorageService.get('localStorageDemoItems'+listID) || [];

            $scope.$watch(function () {
                return localStorageService.get('localStorageDemoItems'+listID);
            }, function (value) {
                $scope.localStorageDemoItems = value;
            });

            $scope.clearAll = function () {
                items = [];
                localStorageService.set("localStorageDemoItems"+listID, items);

            }

            $scope.addItem = function (item) {
                items.push(item);
                localStorageService.set("localStorageDemoItems"+listID, items);
                $scope.localStorageDemo = "";
            }
            $scope.remove = function (item) {
                var itemindex = items.indexOf(item);
                items.splice(itemindex, 1);


                localStorageService.set("localStorageDemoItems"+listID, items);



            }

        }
    );