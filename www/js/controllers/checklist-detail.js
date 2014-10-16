//orders detail controller
altamiraApp.controller('CheckListDetailCtrl', function($scope, $ionicScrollDelegate, $ionicSideMenuDelegate, $http, $ionicPopup, $window, $stateParams, Restangular) {
	
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
				// var order = Restangular.one('manufacturing/bom',id);
				// order.put();
				/*$http({
					method: "PUT",
					url: "http://data.altamira.com.br/manufacturing/bom/"+id,
					data: $scope.order,
					headers: {'Content-Type':'application/json'}
				}).success(function(data, status) {
					$state.go('app.checklists');
				}).error(function(data, status) { // called asynchronously if an error occurs
					alert("Failed due to some error.");
				});*/
				$scope.order.customPUT().then(function () {
					alert("Order Mark as Checked Successfully.");
					$state.go('app.checklists');
				});
			} else {
				console.log("NO");	
			}
		});
	};
	
	// open the report in a new tab
	$scope.openReport = function() { 
		$window.open(' http://report.altamira.com.br/manufacturing/bom/'+ $stateParams.orderNumber);
	};
	
});