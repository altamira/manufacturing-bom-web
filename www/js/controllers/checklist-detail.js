//orders detail controller
altamiraApp.controller('CheckListDetailCtrl', function($scope, $state, $ionicScrollDelegate, $ionicSideMenuDelegate, $http, $ionicPopup, $window, $stateParams, Restangular) {
	
	//get data from api
	Restangular.one('manufacturing/bom', $stateParams.orderNumber).get().then(function(response) {
		$scope.order = response.data;
		console.log(response.data);
		var ordertotal = 0;
		angular.forEach($scope.order.items, function(item){
			angular.forEach(item.parts, function(prd){
				//ordertotal += prd.weight
				ordertotal += prd.quantity * prd.weight	
			})			
		})
		$scope.total = ordertotal;
		
	}, function(response) {
		alert('error')
	});
	
	//set the order date using timezone
	$scope.orderDate = function(time) {  
		var orderDateInfo = moment(time).zone('-0300').format("DD/MM/YYYY");
		return orderDateInfo;			
	};
	
	//calculate the "PRAZO DE ENTREGA" field value
	$scope.getWeek = function(time) {  
		var weekInfo = moment(time).week() + "/" + moment(time).year() + " ( "+ moment(time).startOf('week').format("DD/MM/YYYY") + " a " + moment(time).endOf('week').format("DD/MM/YYYY") + ")";
		return weekInfo;			
	};
	
	//calculate the value for field "PESO TOTAL"
	$scope.getItemTotal = function(item) {     
		var itemtotal = 0;
		angular.forEach(item.parts, function(prd){
			itemtotal += prd.quantity * prd.weight
			//itemtotal += prd.weight
		})
		return itemtotal;
	};	
	
	// Triggered to mark as checked orders
	$scope.checkedOrder = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Confirmação',
			template: 'A Lista de Material foi conferida ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.order.customPUT().then(function () {
					$ionicPopup.alert({
						title: 'Concluido com sucesso',
						content: 'A Lista de Material do Pedido ' + $scope.order.number + ' foi marcada como conferida.' 
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
			title: 'Excluir Pedido',
			template: 'Confirma a exclusão do Pedido ' + $scope.order.number + ' ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/bom/'+orderNumber).remove().then(function () {
					$ionicPopup.alert({
						title: 'Success',
						content: 'Pedido excluido com sucesso.'
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
		//$window.open(' http://report.altamira.com.br/manufacturing/bom/'+ $stateParams.orderNumber);
		$window.open('http://altamira.elasticbeanstalk.com/webapi/reports/materials/'+ $stateParams.orderNumber);
	};
	
});