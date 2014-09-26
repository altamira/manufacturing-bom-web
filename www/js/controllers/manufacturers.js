altamiraApp.controller('ManufacturingProcsSearchCtrl', function($scope, $stateParams, $ionicPopup, $timeout,  $state) {
	
	$scope.processes = [
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" },
            { "code": "PPLCOL00113000000000", "customer": "COLUNA NORMAL CH12 2800MM" }
		];
		
	
	// Triggered to delte processes
	$scope.deleteProcesses = function(index) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Process',
			template: 'Are you sure you want to delete this process ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.processes.splice(index, 1);					
			} else {
				
			}
		});
	};
	
	//trigered when user click on process row
	$scope.goDetail = function (id) {
		$state.go('app.mfgprocessform', {code: id});		
    }
	
});