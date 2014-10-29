//mfg operation form  controller
altamiraApp.controller('ManufcOprtnFormCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, $state, $stateParams, Restangular, mfgService, mfgModalService) {

	//get data from process api
	var process = Restangular.one('manufacturing/process', $stateParams.processid);
	process.get().then(function(response) {
	
		//get the operation data
		$scope.processdata = response.data;			
	}, function(response) {
		$scope.processdata = {};	
	});	
	
	if(!$state.newOprtCreation){
		//get data from operation api
		process.one('operation', $stateParams.operationid).get().then(function(response) {
		
			//get the operation data
			$scope.operation = response.data;
			
		}, function(response) {
			mfgService.showAlert('Failed', 'Failed to get the Operation data.').then(function(response) {
			
				//move to the process list
				$state.go('app.manufacturesearch');
			});	
		});	
	}else{
		$scope.operation = {};
	}
	
	// Triggered to mark as checked the operation
	$scope.saveOperation = function(id) {     
		mfgService.showConfirmBox('Save Operation', 'Do you want to save the changes ?').then(function(res) {
			if(res) {
				if($state.newOprtCreation){
					//create record
					Restangular.one('manufacturing/process', id).all('operation').post($scope.operation).then(function(response) {
						if(response.status == 201){
							mfgService.showAlert('Success', 'Operation foi importado com sucesso !').then(function(res){
								$state.go($state.current,{operationid:response.data.id});
								$state.newOprtCreation = false;
							});	
						}
					}, function() {
						// alert if an error occurs
						mfgService.showAlert('Falhou', 'Erro ao importar o Pedido.');						
					});	
				}else{
					//save edited record
					mfgService.saveRecordRequest($scope.operation);
				}									
			} else {				
			}
		});
	};
	
	// Triggered to mark as checked the operation
	$scope.deleteOperation = function(processid, operationid, type) { 
		return mfgService.deleteOperation(processid, operationid, type);
	};
	
	// Triggered to mark as checked the process
	$scope.deleteProcess = function(id, process) {     
		return mfgService.deleteProcess(id, process);
	};
	

	// Open the login modal
	$scope.goToProcsSearch = function() {
		$scope.modal.hide();
		$state.go('app.manufacturesearch');
	};
	
	// Perform the login action when the user submits the login form
	$scope.saveItem = function(processid, operationid) {
		Restangular.one('manufacturing/process', processid).one('operation', operationid).all('consume').post($scope.newItemData).then(function(response) {
			if(response.status == 201){
				mfgService.showAlert('Success', 'Processo foi importado com sucesso !').then(function(res){
					$scope.modal.hide();
				});	
			}
		}, function() {
			// alert if an error occurs
			mfgService.showAlert('Falhou', 'Erro ao importar o Pedido.');						
		});	
		console.log($state.current);
	};
	
	// onclick open the modal
	$scope.openConsumeModal = function(processid, operationid, consumeid) {
		consumeid = consumeid || "";
		var url = 'add-item.html';
		$scope.modalHeader = "MATERIA PRIMA/INSUMOS/COMPONENTS";
		
		if(consumeid == ""){
			$scope.newItemData = {};
			$scope.createConsume = true;
		}else{
			Restangular.one('manufacturing/process', processid).one('operation', operationid).one('consume', consumeid).get().then(function(response) {		
				//get the operation data
				$scope.newItemData = response.data;			
			}, function(response) {
				$scope.newItemData = {};	
			})
		}
		
		// Create the modal that we will use later
		$ionicModal.fromTemplateUrl('templates/'+url, {
			scope: $scope
		}).then(function(modal) {
			$scope.modal = modal;
			modal.show();
		});
	};
	
	// Triggered in the login modal to close it
	$scope.closeAddItem = function() {
		$scope.modal.remove();
	};
});