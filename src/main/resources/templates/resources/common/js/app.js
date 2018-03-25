var App = angular.module('App', ['ngResource', 'ngRoute', 'ngAnimate', 'angularUUID2', 'angularFileUpload', 'ui.bootstrap', 'ui.router']);
/* 配置信息 */
App.config(['$routeProvider', '$provide', function($routeProvider, $provide) {
		$routeProvider
		  .when('/activiti', {
            templateUrl: 'resources/session/view/activiti.html',
            controller: 'activitiController'
        }).when('/clue', {
            templateUrl: 'resources/session/view/clue.html',
            controller: 'clueController'
        }).when('/mytopic', {
			templateUrl: 'resources/session/view/myTopic.html',
			controller: 'mytopicController'
		}).otherwise({
			redirectTo: '/'
		});
	}])
	.controller('MainController', ['$rootScope', '$scope', '$uibModal',
		function($rootScope, $scope, $uibModal) {

		}
	])
	.directive('elementDisable', [function(){
		return {
			restrict: "EA",
			scope: {
				isDisable: "="
			},
			link: function(scope, element, attrs){
				if(scope.isDisable != "0"){
					element.attr("disabled",true);
					element.attr("style","color:#798296");
				}
			}
		}
	}])
