altamiraApp.service('mfgModalService', function($ionicModal, $rootScope, $stateParams, Restangular, mfgService) {  
	var itemModal = function(tpl, $scope, type, operationid,  id) {
		var promise;
		var intTest = /^\+?(0|[1-9]\d*)$/;
		
		$scope = $scope || $rootScope.$new();
		$scope.operationid = operationid;
		
		if(type == "CONSUME"){
			$scope.modalHeader = "MATERIA PRIMA/INSUMOS/COMPONENTS";
			$scope.itemType = 'consume';
		}else{
			$scope.modalHeader = "PRODUTO ACABADO/ EM PROCESSO DE FABRICACAO";
			$scope.itemType = 'produce';
		}
		
		if(id == "" && intTest.test(indexValue)){
			$scope.itemIndex = indexValue;
			if(type == "CONSUME"){
				$scope.newItemData = $scope.process.operation.consume[indexValue];
			}else{
				$scope.newItemData = $scope.process.operation.produce[indexValue];
			}			
		}else{

			Restangular.one('manufacturing/process', $stateParams.processid).one('operation', operationid).one($scope.itemType, id).get().then(function(response) {		
				//get the operation data
				$scope.newItemData = response.data;			
			}, function(response) {
				$scope.newItemData = {};	
			})
		}
		
		promise = $ionicModal.fromTemplateUrl(tpl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			return modal;
		});

		$scope.openModal = function() {
			$scope.modal.show();
		};
		$scope.closeAddItem = function() {
			$scope.modal.hide();
		};
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		
		// Perform the login action when the user submits the login form
		$scope.saveItem = function(id) {
			operationid = operationid || "";
			id = id || "";
			if(id == ""){
				if($stateParams.processid != "" && $scope.operationid != ""){
					Restangular.one('manufacturing/process', $stateParams.processid).one('operation', $scope.operationid).all($scope.itemType).post($scope.newItemData).then(function(response) {
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
						if (!$scope.process.operation.consume) {
							$scope.process.operation.consume = [];
						}
						if(intTest.test($scope.itemIndex)){
							$scope.process.operation.consume[$scope.itemIndex] = $scope.newItemData;		
						}else{
							$scope.process.operation.consume.push($scope.newItemData);
						}
					}else{
						if (!$scope.process.operation.produce) {
							$scope.process.operation.produce = [];
						}
						if(intTest.test($scope.itemIndex)){
							$scope.process.operation.produce[$scope.itemIndex] = $scope.newItemData;		
						}else{
							$scope.process.operation.produce.push($scope.newItemData);
						}
						
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
		};
		return promise;
	}

	return {
		itemModal: itemModal
	}

})