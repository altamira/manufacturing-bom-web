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
					//get data from api
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
						var postOrder = Restangular.all('manufacturing/bom');
						postOrder.post(data).then(function(response) {
							if(response.status == 201){
								$ionicPopup.alert({
									title: 'Success',
									content: 'Order Imported Successfully.'
								}).then(function(res) {
									$state.go($state.current, {}, {reload: true});
								});	
							}
						}, function() {
							// alert if an error occurs
							$ionicPopup.alert({
								title: 'Fail',
								content: 'Failed to Import Order'
							}).then(function(res) {
								importPopup.close();
							});
						});						
					}).error(function(msg, code) {
						// alert if an error occurs
						$ionicPopup.alert({
							title: 'Fail',
							content: 'Failed to Export Order due to some error.'
						}).then(function(res) {
							importPopup.close();
						});
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
	
	/*// Triggered to delte orders
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
	};*/
	// Triggered to mark as checked orders
	$scope.checkedOrder = function(id) {
		var confirmPopup = $ionicPopup.confirm({
			title: 'Checke Order',
			template: 'Is the order checked completly ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				Restangular.one('manufacturing/bom', id).get().then(function(response) {
					$scope.order = response.data;
					$scope.order.customPUT().then(function () {
						$ionicPopup.alert({
							title: 'Success',
							content: 'Order Mark as Checked Successfully.'
						}).then(function(res) {
							$state.go('app.checklists');
						});					
					});
				}, function(response) {
					alert('error')
				});
				
			} else {
				console.log("NO");	
			}
		});
	};
	
	//trigered when user click on products row
	$scope.goDetail = function (number) {
		$state.go('app.single', {orderNumber: number});
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
