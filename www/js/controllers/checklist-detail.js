//orders detail controller
altamiraApp.controller('CheckListDetailCtrl', function($scope, $ionicScrollDelegate, $ionicSideMenuDelegate, $http, $ionicPopup, $window, $stateParams, Restangular) {
	
	//get data from api
	/*Restangular.one($stateParams.orderId).get().then(function(response) {
		$scope.order = response.data;
		var ordertotal = 0;
		
		angular.forEach($scope.order.item, function(item){
			angular.forEach(item.product, function(prd){
				ordertotal += prd.weight				
			})			
		})
		$scope.total = ordertotal;
		
	}, function(response) {
		alert('error')
	});*/
	$http.get('js/order_72510.json').success (function(response){
		$scope.order = response;
		//$scope.order = _($scope.order).toArray();
		console.log($scope.order.items);
	});
	
	$scope.getWeek = function(time) {  
		var weekInfo = moment(time).week() + "/" + moment(time).year() + " ( "+ moment(time).startOf('week').format("DD/MM/YYYY") + " a " + moment(time).endOf('week').format("DD/MM/YYYY") + ")";
		return weekInfo;			
	};
	
	$scope.getItemTotal = function(item) {     
		var itemtotal = 0;
		angular.forEach(item.product, function(prd){
			//itemtotal += prd.quantity * prd.weight
			itemtotal += prd.weight
		})
		return itemtotal;
	};	
	
	// Triggered to mark as checked orders
	$scope.checkedOrder = function(index) {     

		var confirmPopup = $ionicPopup.confirm({
			title: 'Checke Order',
			template: 'Is the order checked completly ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
								
			} else {
				
			}
		});
	};
	
	// open the report in a new tab
	$scope.openReport = function() { 
		$window.open(' http://altamira.elasticbeanstalk.com/webapi/reports/materials/'+ $stateParams.orderId);
	};
	
});