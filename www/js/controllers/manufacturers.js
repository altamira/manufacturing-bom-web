altamiraApp.controller('ManufacturingProcsSearchCtrl', function($scope, $stateParams, $ionicPopup, $timeout,  $state, Restangular) {
	
	//get data from api
	Restangular.one('manufacturing/process').get({start:0,max:10}).then(function(response) {
		$scope.processes  = response.data;
	}, function(response) {
		alert('error')
	});
	
	$scope.mfgProcessData = {};	
	
	$scope.importMfgProcess = function() {	
		// An elaborate, custom popup
		var importPopup = $ionicPopup.show({
			templateUrl : 'templates/import-mfg-process.html',
			title: 'Import Process',
			scope: $scope,
			buttons: [
			{ text: 'Cancel' },
			{ text: '<b>Save</b>',
				type: 'button-positive',
				onTap: function(e) {
					
				}
			},
			]
		});
		importPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		
	};
	
	// Triggered to delte processes
	$scope.deleteProcesses = function(id) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Are you sure you want to delete this process ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/process/'+id).remove().then(function () {
					$ionicPopup.alert({
						title: 'Success',
						content: 'Process deleted.'
					}).then(function(res) {	
						$state.go($state.current, {}, {reload: true});
					});	
				});	
								
			} else {
				
			}
		});
	};
	
	//trigered when user click on process row
	$scope.goDetail = function (id) {
		$state.go('app.mfgprocessform', {code: id});
		$state.newProcessCreation = false;		
    }
	
	//trigered when user click on process row
	$scope.newProcess = function () {
		$state.go('app.mfgprocessform', {code: ""});
		$state.newProcessCreation = true;
    }
});