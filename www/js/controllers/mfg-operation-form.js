//mfg operation form  controller
altamiraApp.controller('ManufcOprtnFormCtrl', function($scope, $ionicPopup, $ionicModal, $timeout, $state, $stateParams, Restangular, mfgService) {
	
	$scope.processdata = mfgService.getData();	
	$scope.operation = {};
	
	//if the process id is present get the data from API
	if($stateParams.processid != ""){
	
		//get data from process api
		var process = Restangular.one('manufacturing/process', $stateParams.processid);
		process.get().then(function(response) {
		
			//get the operation data
			$scope.processdata = response.data;			
		}, function(response) {
			$scope.processdata = {};	
		});	
		
		if($stateParams.operationid != ""){		
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
		}
	}
		
	// Triggered to mark as checked the operation
	$scope.saveOperation = function() {
		mfgService.showConfirmBox('Save Operation', 'Do you want to save the changes ?').then(function(res) {
			if(res) {
				//if process id and operation id are not null
				if($stateParams.processid != "" && $stateParams.operationid != ""){
					mfgService.saveRecordRequest($scope.operation);
				}else{
					//if process id is not null, create  a new process through API
					if($stateParams.processid != ""){
						//create record
						Restangular.one('manufacturing/process', $stateParams.processid).all('operation').post($scope.operation).then(function(response) {
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
						if (!$scope.processdata.operation) {
							$scope.processdata.operation = [];
						}
						$scope.processdata.operation.push($scope.operation);
						//if process id is not there save the data in a array in client side
						mfgService.setData($scope.processdata);
						$state.go($state.current,{operationid:""});
					}
				}										
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
		
	// onclick open the modal
	$scope.openConsumeModal = function(type, id) {
		id = id || "";
		
		if(type == "CONSUME"){
			$scope.modalHeader = "MATERIA PRIMA/INSUMOS/COMPONENTS";
			$scope.itemType = 'consume';
		}else{
			$scope.modalHeader = "PRODUTO ACABADO/ EM PROCESSO DE FABRICACAO";
			$scope.itemType = 'produce';
		}
		
		if(id == ""){
			$scope.newItemData = {};			
		}else{

			Restangular.one('manufacturing/process', $stateParams.processid).one('operation', $stateParams.operationid).one($scope.itemType, id).get().then(function(response) {		
				//get the operation data
				$scope.newItemData = response.data;			
			}, function(response) {
				$scope.newItemData = {};	
			})
		}
		
		// Create the modal that we will use later
		$ionicModal.fromTemplateUrl('templates/add-item.html', {
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
		
	// Perform the login action when the user submits the login form
	$scope.saveItem = function(id) {
		id = id || "";
		if(id == ""){
			if($stateParams.processid != "" && $stateParams.operationid != ""){
				Restangular.one('manufacturing/process', $stateParams.processid).one('operation', $stateParams.operationid).all(itemType).post($scope.newItemData).then(function(response) {
					if(response.status == 201){
						mfgService.showAlert('Success', 'Processo foi importado com sucesso !').then(function(res){
							$scope.modal.remove();
						});	
					}
				}, function() {
					// alert if an error occurs
					mfgService.showAlert('Falhou', 'Erro ao importar o Pedido.');
					$scope.modal.remove();
				});	
			}else{				
				if($scope.itemType == 'consume'){
					if (!$scope.operation.consume) {
						$scope.operation.consume = [];
					}
					$scope.operation.consume.push($scope.newItemData);
				}else{
					if (!$scope.operation.produce) {
						$scope.operation.produce = [];
					}
					$scope.operation.produce.push($scope.newItemData);
				}
				
				$scope.modal.remove();
			}
		}else{
			$scope.newItemData.put().then(function(response) {
				if(response.status == 200){
					mfgService.showAlert('Success', 'Processo foi importado com sucesso !').then(function(res){
						$scope.modal.remove();
					});	
				}
			}, function() {
				mfgService.showAlert('Falhou', 'Erro ao importar o Pedido.').then(function(res){
					$scope.modal.remove();
				});	
			});					
		}
		//$state.go($state.current, {}, {reload: true});
	};
});