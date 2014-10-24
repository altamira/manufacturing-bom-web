//orders detail controller
altamiraApp.controller('ManufcProcsFormCtrl', function($scope, $ionicPopup, $window, $state, $stateParams, Restangular, mfgService) {
	
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
	
	// Triggered to mark as checked the process
	$scope.saveProcess = function() {  

		var confirmPopup = $ionicPopup.confirm({
			title: 'Save Process',
			template: 'Do you want to save the changes ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				console.log($scope.process);
				
				if($state.newProcessCreation){
					var processData = Restangular.all('manufacturing/process');
					var processSave = processData.post($scope.process);
				}else{
					var processSave = $scope.process.customPUT();
				}
				processSave.then(function(response) {
					if(response.status == 201){
						$ionicPopup.alert({
							title: 'Pedido ' ,
							content: 'Pedido  foi importado com sucesso !'
						}).then(function(res) {
							$state.go($state.current, {}, {reload: true});
						});	
					}
				}, function() {
					// alert if an error occurs
					$ionicPopup.alert({
						title: 'Falhou',
						content: 'Erro ao importar o Pedido '
					}).then(function(res) {
						
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
    };
	
	//trigered when user click on to add a new operation
	$scope.newOperationForm = function () {
		$state.go('app.mfgoperationform',{id:""});
		$state.newOprtCreation = true;
    };
	
	// Triggered to mark as checked the process
	$scope.deleteProcess = function(id, process = "") {     
		return mfgService.deleteProcess(id, process);
	};
	
	//trigered when user click on input row 
	$scope.goToProcessForm = function (id) {
		return mfgService.goToProcessForm(id);	
    };
	
	// Triggered to delte sequences
	$scope.deleteOperation = function(id) {     
		return mfgService.deleteOperation(id);
	};
	
});