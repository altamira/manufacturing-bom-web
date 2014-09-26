//orders detail controller
altamiraApp.controller('ManufcOprtnFormCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, $stateParams, Restangular) {
	//get data from api
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
			
	// Form data for the new item modal
	$scope.newItemData = {};

	// Create the item modal that we will open from operation form
	$ionicModal.fromTemplateUrl('templates/add-item.html', {
		scope: $scope
	}).then(function($ionicModal) {
		$scope.modal = $ionicModal;
	});

	// Triggered in the add item modal to close it
	$scope.closeNewItemModal = function() {
		$scope.modal.hide();
	};
// Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
	// Open the add item modal
	$scope.openAddItem = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.addItem = function() {
		console.log('Adding New Item', $scope.newItemData);

	};
});