App.controller('activitiController', ['$scope', '$http', '$timeout', '$uibModal', function($scope, $http, $timeout, $uibModal, Message) {

    var app = angular.module('app', []);
    /* 列表对象 */
    $scope.condition = {
		moreShow: false, //是否显示更多
		funcMore: function() {
			this.moreShow = !this.moreShow;
		},
    };
    
    $scope.activitiEditor = {
    	createTables: function() {
    		 $http({
                 url:'/ns/task',
                 method:'POST',
             }).success(function (resp) {
                 console.log(resp);
             });
    	}
    };


}]);

/*define(function(require) {
	
	var app = require('app.js');
	
	app.controller('activitiController', function(){
		
		$scope.condition = {
			moreShow: false, //是否显示更多
			funcMore: function() {
				this.moreShow = !this.moreShow;
			},
	    };
		$scope.activitiEditor = {
	    	createTables: function() {
	    		 $http({
	                 url:'/ns/task',
	                 method:'POST',
	             }).success(function (resp) {
	                 console.log(resp);
	             });
	    	}
	    };
	})
	
})*/