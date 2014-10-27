//mfg operation form  controller
altamiraApp.controller('ManufcOprtnFormCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, $state, $stateParams, Restangular, mfgService) {
	//get data from api
	if(!$state.newOprtCreation){
		//get data from api
		Restangular.one('manufacturing/operation', $stateParams.id).get().then(function(response) {			
			//get the operation data
			$scope.operation = response.data;			
		}, function(response) {
			$ionicPopup.alert({
				title: 'Failed',
				content: 'Failed to get the Operation data.' 
			}).then(function(response) {
			
				//move to the process list
				$state.go('app.manufacturesearch');
			});	
		});	
	}else{
		$scope.operation = {};
	}
	// Triggered to mark as checked the operation
	$scope.saveOperation = function(index) {     

		var confirmPopup = $ionicPopup.confirm({
			title: 'Save Operation',
			template: 'Do you want to save the changes ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
								
			} else {
				
			}
		});
	};
	
	// Triggered to mark as checked the operation
	$scope.deleteOperation = function(id) { 
		return mfgService.deleteOperation(id);
	};
	
	// Triggered to mark as checked the process
	$scope.deleteProcess = function(id, process) {     
		return mfgService.deleteProcess(id, process);
	};
	
	// Form data for the login modal
	$scope.newItemData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/add-item.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeAddItem = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.addNewItem = function() {
		$scope.modal.show();
	};
	
	// Open the login modal
	$scope.goToProcsSearch = function() {
		$scope.modal.hide();
		$state.go('app.manufacturesearch');
	};
	
	// Perform the login action when the user submits the login form
	$scope.saveItem = function() {
		console.log('Doing login', $scope.newItemData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
			$scope.closeAddItem();
		}, 1000);
	};
});