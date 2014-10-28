//orders detail controller
altamiraApp.controller('ManufcProcsFormCtrl', function($scope, $ionicPopup, $window, $state, $stateParams, Restangular, mfgService) {
	
	//get data from api
	if(!$state.newProcessCreation){	
		//get data from api
		Restangular.one('manufacturing/process', $stateParams.processid).get().then(function(response) {	
		
			//get the process data
			$scope.process = response.data;			
		}, function(response) {
			mfgService.showAlert('Falhou', 'Failed to get the Process data.').then(function(response) {
			
				//move to the process list
				$state.go('app.manufacturesearch');
			});	
		});		
	}else{
		$scope.process = {};
	}
	
	// Triggered to mark as checked the process
	$scope.saveProcess = function() { 
		mfgService.showConfirmBox('Save Process', 'Do you want to save the changes ?').then(function(res) {
			if(res) {
				if($state.newProcessCreation){
					
					//create record
					Restangular.all('manufacturing/process').post($scope.process).then(function(response) {
						if(response.status == 201){
							mfgService.showAlert('Success', 'Processo foi importado com sucesso !').then(function(res){
								mfgService.goToProcessForm(response.data.id);
							});	
						}
					}, function() {
						// alert if an error occurs
						mfgService.showAlert('Falhou', 'Erro ao importar o Pedido.');						
					});	
				}else{
					
					//save edited record
					mfgService.saveRecordRequest($scope.process);					
				}								
			} else {				
			}
		});
	};
	
	//trigered when user click on sequence row
	$scope.goToOperationForm = function (processid,id) {
		$state.go('app.mfgoperationform',{processid:processid,operationid:id});
		$state.newOprtCreation = false;
    };
	
	//trigered when user click on to add a new operation
	$scope.newOperationForm = function (processid) {
		$state.go('app.mfgoperationform',{processid:processid,operationid:""});
		$state.newOprtCreation = true;
    };
	
	// Triggered to mark as checked the process
	$scope.deleteProcess = function(id, process) {     
		return mfgService.deleteProcess(id, process);
	};
	
	//trigered when user click on input row 
	$scope.goToProcessForm = function (id) {
		return mfgService.goToProcessForm(id);	
    };
	
	// Triggered to delte sequences
	$scope.deleteOperation = function(processid, operationid) {     
		return mfgService.deleteOperation(processid, operationid);
	};	
	
	// open the report in a new tab
	$scope.openReport = function(id) { 
		$window.open('http://report.altamira.com.br/manufacturing/process/'+ id);
	};
	
});