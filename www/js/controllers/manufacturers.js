altamiraApp.controller('ManufacturingProcsSearchCtrl', function($scope, $stateParams, $http, $ionicPopup, $timeout,  $state, Restangular, mfgService) {
	
	//get data from api
	Restangular.one('manufacturing/process').get({start:0,max:10}).then(function(response) {
		$scope.processes  = response.data;
	}, function(response) {
		alert('error')
	});
	
	$scope.mfgProcessData = {};	
	
	//define variable for search field
	$scope.searchData = {};
	$scope.searchData.search = "";
	
	//function for the search button
	$scope.callSearchRestService= function() {
		if($scope.searchData.search != "" && $scope.searchData.search.trim() != ""){
			Restangular.one('manufacturing/process/search').get({search:$scope.searchData.search,start:0,max:10}).then(function(response) {
				$scope.processes  = response.data;					
			});	 
		}else{
			Restangular.one('manufacturing/process').get({start:0,max:10}).then(function(response) {
				$scope.processes  = response.data;
			}, function(response) {
				alert('error')
			});
		}
		
	}
	
	// Triggered to delte processes
	$scope.deleteProcesses = function(id) {     
		return mfgService.deleteProcess(id);
	};
	
	//trigered when user click on process row
	$scope.goDetail = function (id) {
		return mfgService.goToProcessForm(id);	
    }
	
	//trigered when user click on process row
	$scope.newProcess = function () {
		$state.go('app.mfgprocessform', {code: ""});
		$state.newProcessCreation = true;
    }
});