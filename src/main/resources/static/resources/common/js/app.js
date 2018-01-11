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
/*App.config(function ($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('session.ns_resource_b.library', {
	            url: '/activiti',
	            templateUrl: 'partials/activiti.html',
	            controllerUrl: 'static/partials/activiti.js',
	            controller: 'activitiController',
	            portal: {
	                title: '设备管理',
	                access: { },
	                isModulePage: true
	            },
	            dependencies: []
	        })
	        .state('session.ns_clue.library', { 
	            url: '/clue',
	            templateUrl: 'partials/clue.html',
	            controllerUrl: 'static/partials/clue.js',
	            controller: 'clueController',
	            dependencies: []
	        })
		}
	)*/
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
