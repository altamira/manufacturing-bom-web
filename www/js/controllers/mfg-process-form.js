//orders detail controller
altamiraApp.controller('ManufcProcsFormCtrl', function($scope, $ionicPopup, $window, $state, $stateParams, Restangular) {
	
	//get data from api
	if(!$state.newProcessCreation){
	
		//get data from api
		Restangular.one('manufacturing/process', $stateParams.code).get().then(function(response) {	
		
			//get the process data
			$scope.process = response.data;			
		}, function(response) {
			$ionicPopup.alert({
				title: 'Failed',
				content: 'Failed to get the Process data.' 
			}).then(function(response) {
			
				//move to the process list
				$state.go('app.manufacturesearch');
			});	
		});		
	}else{
		$scope.process = {};
	}
	// Triggered to delte sequences
	$scope.deleteOperation = function(index) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Are you sure you want to delete this process operation ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/operation/'+id).remove().then(function () {
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
	
	// Triggered to mark as checked the process
	$scope.saveProcess = function() {     

		var confirmPopup = $ionicPopup.confirm({
			title: 'Save Process',
			template: 'Do you want to save the changes ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				console.log($scope.process);				
			} else {
				
			}
		});
	};
	
	// Triggered to mark as checked the process
	$scope.deleteProcess = function(id, process) {     

		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Do you want to delete the process ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/operation/'+id).remove().then(function () {
					$ionicPopup.alert({
						title: 'Success',
						content: 'Process deleted.'
					}).then(function(res) {	
						$state.go("app.manufacturesearch");
					});	
				});					
			} else {
				
			}
		});
	};
	
	//trigered when user click on sequence row
	$scope.goToOperationForm = function (id) {
		$state.go('app.mfgoperationform',{id:id});
		$state.newOprtCreation = false;
    }
	
	//trigered when user click on to add a new operation
	$scope.newOperationForm = function () {
		$state.go('app.mfgoperationform',{id:""});
		$state.newOprtCreation = true;
    }
	
	//trigered when user click on input row 
	$scope.goToProcessForm = function (id) {
		$state.go('app.mfgprocessform', {code: id});
		$state.newProcessCreation = false;		
    }
});