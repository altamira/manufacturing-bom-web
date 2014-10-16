altamiraApp.controller('ChecklistCtrl', function($scope, $stateParams, $http, $ionicPopup, $timeout,  $state, Restangular, ImportOrders) {
	$scope.searchData = {};
	$scope.searchData.search = "";
	
	//get data from api
	Restangular.one('manufacturing/bom').get({start:0,max:10}).then(function(response) {
		$scope.orders  = response.data;
	}, function(response) {
		alert('error')
	});
	
	//import order pop up data array
	$scope.orderData = {};
	
	$scope.importOrder = function() {
	
		// An elaborate, custom popup
		var importPopup = $ionicPopup.show({
			templateUrl : 'templates/import-order.html',
			title: 'Order Number',
			scope: $scope,
			buttons: [
			{ text: 'Cancel',
				onTap: function(res) {	
					$scope.orderData = {};
					importPopup.close();
				}					
			},
			{ text: '<b>Save</b>',
				type: 'button-positive',
				onTap: function(res) {
					$http({
						method: 'GET', 
						Origin:'http://localhost:8100',						
						url: 'http://integracao.altamira.com.br/manufacturing/bom?'+$scope.orderData.ordernumber,
						headers: {'Content-Type':'application/json',
						'Accept': 'application/json',
						//'Authorization': 'Basic QWRtaW5pc3RyYXRvcjohYkZDWC45WCpUSg=='
						}
					}).success(function(data) {
						//post data to api
						$http({
							method: "POST",
							url: "http://data.altamira.com.br/manufacturing/bom",
							data: data,
							headers: {'Content-Type':'application/json'}
						}).success(function(data, status) {
							if(status == 201){
								alert("Order Imported Successfully.");
								$state.go($state.current, {}, {reload: true});
							}
						}).error(function(data, status) { 
							// alert if an error occurs
							alert("Failed to Import Order.");
						});
					}).error(function(msg, code) {
						alert("Failed to Export Order due to some error.");
					});
				}
			},
			]
		});
		importPopup.then(function(res) {
			
		});
		$timeout(function() {
			importPopup.close(); //close the popup after 3 seconds for some reason
		}, 30000);
	};
	
	$scope.data = {
		showDelete: false
	};
	
	// Triggered to delte orders
	$scope.deleteOrder = function(index,orderNumber) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Order',
			template: 'Are you sure you want to delete this order ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/bom/'+orderNumber).remove();
				$scope.orders.splice(index, 1);
			} else {
				
			}
		});
	};
	
	//trigered when user click on products row
	$scope.goDetail = function (id) {
		$state.go('app.single', {orderId: id});
    };
	
	//function for the search button
	$scope.callSearchRestService= function() {
		if($scope.searchData.search != "" && $scope.searchData.search.trim() != ""){
			Restangular.one('manufacturing/bom/search').get({search:$scope.searchData.search,start:0,max:10}).then(function(response) {
				$scope.orders = response.data;					
			});	 
		}else{
			Restangular.one('manufacturing/bom').get({start:0,max:10}).then(function(response) {
				$scope.orders  = response.data;
			}, function(response) {
				alert('error')
			});
		}
		
	}

});
