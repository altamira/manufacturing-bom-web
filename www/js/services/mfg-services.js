altamiraApp.service('mfgService', function ($ionicPopup, $window, $state, $stateParams, Restangular) {
	return {
		// Triggered to delte processes
		deleteProcess:function(id, process) {     
			process = process || "";
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete Process',
				template: 'Are you sure you want to delete this process ?'
			});
			confirmPopup.then(function(res) {
				if(res) {
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
									
				} else {
					
				}
			});
		},
		
		// Triggered to delte sequences
		deleteOperation:function(id, type) {     
			type = type || "";
			var confirmPopup = $ionicPopup.confirm({
				title: 'Delete Operation',
				template: 'Are you sure you want to delete this process operation ?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					Restangular.one('manufacturing/operation/'+id).remove().then(function () {
						$ionicPopup.alert({
							title: 'Success',
							content: 'Operation deleted.'
						}).then(function(res) {	
							if(type == "Main"){
								$state.go("app.manufacturesearch");
							}else{
								$state.go($state.current, {}, {reload: true});
							}
						});	
					});				
				} else {
					
				}
			});
		},
		// Triggered to delte sequences
		goToProcessForm:function(id) {     
			$state.go('app.mfgprocessform', {code: id});
			$state.newProcessCreation = false;			
		}
	};
});