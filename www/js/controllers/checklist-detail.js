//orders detail controller
altamiraApp.controller('CheckListDetailCtrl', function($scope, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, $http, $ionicPopup, $window, $stateParams, Restangular) {
	
	//get data from api
	Restangular.one('manufacturing/bom', $stateParams.orderNumber).get().then(function(response) {
		$scope.order = response.data;
		
		var ordertotal = 0;
		angular.forEach($scope.order.items, function(item){
			angular.forEach(item.parts, function(prd){
				ordertotal += prd.weight				
			})			
		})
		$scope.total = ordertotal;
		
	}, function(response) {
		alert('error')
	});
	
	//calculate the "PRAZO DE ENTREGA" field value
	$scope.getWeek = function(time) {  
		var weekInfo = moment(time).week() + "/" + moment(time).year() + " ( "+ moment(time).startOf('week').format("DD/MM/YYYY") + " a " + moment(time).endOf('week').format("DD/MM/YYYY") + ")";
		return weekInfo;			
	};
	
	//calculate the value for field "PESO TOTAL"
	$scope.getItemTotal = function(item) {     
		var itemtotal = 0;
		angular.forEach(item.parts, function(prd){
			//itemtotal += prd.quantity * prd.weight
			itemtotal += prd.weight
		})
		return itemtotal;
	};	
	
	// Triggered to mark as checked orders
	$scope.checkedOrder = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Checke Order',
			template: 'Is the order checked completly ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.order.customPUT().then(function () {
					$ionicPopup.alert({
						title: 'Success',
						content: 'Order Mark as Checked Successfully.'
					}).then(function(res) {
						$state.go('app.checklists');
					});					
				});
			} else {
				console.log("NO");	
			}
		});
	};
	
	// Triggered to delte orders
	$scope.deleteOrder = function(orderNumber) {   	
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Order',
			template: 'Are you sure you want to delete this order ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/bom/'+orderNumber).remove().then(function () {
					$ionicPopup.alert({
						title: 'Success',
						content: 'Order deleted Successfully.'
					}).then(function(res) {		
						$state.go('app.checklists');
					});	
				});				
			} else {				
			}
		});
	};
	
	// open the report in a new tab
	$scope.openReport = function() { 
		$window.open(' http://report.altamira.com.br/manufacturing/bom/'+ $stateParams.orderNumber);
	};
	
});