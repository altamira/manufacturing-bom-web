altamiraApp.service('mfgService', function ($ionicPopup, $window, $state, $stateParams, Restangular) {
	var formData = {};
	this.indexValue = null; 
	var intTest = /^\+?(0|[1-9]\d*)$/;
	
	return {
		setIndex: function (index) {
            this.indexValue = index;
        },
		
		getData: function () {
           
            return formData;
        },
		
        setData: function (newFormData) {
            //You could also set specific attribute of the form data instead
            formData = newFormData;
        },
		
		setOpeartionData: function (operationData) {
			//check the operation array is present or not
			if (!formData.operation) {
				formData.operation = [];
			}
			//check for the exisance of the array element
			if(intTest.test(this.indexValue)){
				//update the element if present
				formData.operation[this.indexValue] = operationData;		
			}else{
				//add to array if it is new element
				formData.operation.push(operationData);
			}            
        },
		
        resetData: function () {
            //To be called when the data stored needs to be discarded
            formData = {};
        },
		
		//to show alert box
		showConfirmBox: function(title, content){
			var confirmPopup = $ionicPopup.confirm({
				title: title,
				template: content
			});
			return confirmPopup;
		},
		
		//to show alert box
		showAlert: function(title, content){
			var alertPopup = $ionicPopup.alert({
				title: title,
				content: content
			});
			return alertPopup;
		},
		
		// Triggered to delte processes
		deleteProcess:function(id, process) { 
			id = id || "";
			process = process || "";
			this.showConfirmBox('Delete Process', 'Are you sure you want to delete this process ?').then(function(res) {
				if(res) {
					if(id != ""){
						Restangular.one('manufacturing/process/'+id).remove().then(function () {
							$ionicPopup.alert({
								title: 'Success',
								content: 'Process deleted.'
							}).then(function(res) {	
								if(process == "Main"){
									$state.go("app.manufacturesearch");
								}else{
									$state.go($state.current, {}, {reload: true});
								}
							});	
						});	
					}else{
						//remove from the client side array
						formData = {};
						$state.go($state.current, {}, {reload: true});
					}					
				}
			});
		},
		
		// Triggered to delte sequences
		deleteOperation:function(processid, operationid, index, type) {     
			type = type || "";
			processid = processid || "";
			operationid = operationid || "";
			this.showConfirmBox('Delete Operation', 'Are you sure you want to delete this process operation ?').then(function(res) {
				if(res) {
					if(processid != "" && operationid != ""){
						Restangular.one('manufacturing/process', processid).one('operation', operationid).remove().then(function () {
							$ionicPopup.alert({
								title: 'Success',
								content: 'Operation deleted.'
							}).then(function(res) {	
								if(type == "Main"){
									$state.go('app.mfgprocessform', {processid: processid});
								}else{
									$state.go($state.current, {}, {reload: true});
								}
							});	
						});	
					}else{
						formData.operation.splice(index);
						$state.go('app.mfgprocessform', {processid: processid});
					}
				} else {
					
				}
			});
		},
		
		
		// Triggered to delte sequences
		goToProcessForm:function(id) {
			id = id || "";
			$state.go('app.mfgprocessform', {processid: id});
		},
		
		//put request for process or operation
		saveRecordRequest: function(data){
			data.put().then(function(response) {
				if(response.status == 200){
					$ionicPopup.alert({
						title: 'Success',
						content: 'Processo foi importado com sucesso !'
					}).then(function(res){
						$state.go($state.current, {}, {reload: true});
					});	
				}
			}, function() {
				// alert if an error occurs
				$ionicPopup.alert({
					title: 'Falhou',
					content: 'Erro ao importar o Pedido.'
				}).then(function(res) {						
				});
			});			
		}
	};
});