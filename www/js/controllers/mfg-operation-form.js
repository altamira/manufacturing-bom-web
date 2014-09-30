//orders detail controller
altamiraApp.controller('ManufcOprtnFormCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, $state, $stateParams, Restangular) {
	//get data from api
	if(!$state.newOprtCreation){
		$scope.operation = {
			"sequence": 10,
			"name": "PERFILAMENTO",
			"description": "",
			"croqui": "",
			"input": [
				{
					"code": "ALPRFQ30-KG20000F330",
					"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
					"quantity": 32.34,
					"unit": "kg"
				},
				{
					"code": "PERF-PPLTUBO113",
					"description": "PERFILADEIRA TUBO 113",
					"quantity": 3,
					"unit": "min"
				}
			],
			"output": [
				{
					"code": "PPLCOL00113000000000-01",
					"description": "PERFIL LONG TUBO 113",
					"quantity": 52.34,
					"unit": "kg"
				}
			]
		};
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
	$scope.deleteOperation = function(index) {     

		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Operation',
			template: 'Do you want to delete the operation ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
								
			} else {
				
			}
		});
	};
	
	// Triggered to delte sequences input
	$scope.deleteOperationInput = function(index) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Are you sure you want to delete this material ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.operation.input.splice(index, 1);					
			} else {
				
			}
		});
	};

	// Triggered to delte sequences input
	$scope.deleteOperationOutput = function(index) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Are you sure you want to delete this material ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.operation.output.splice(index, 1);					
			} else {
				
			}
		});
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
	$scope.doLogin = function() {
		console.log('Doing login', $scope.newItemData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
		$scope.closeLogin();
		}, 1000);
	};
});