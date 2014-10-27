altamiraApp.controller('ChecklistCtrl', function($scope, $stateParams, $http, $ionicPopup, $timeout,  $state, Restangular) {
	$scope.searchData = {};
	$scope.searchData.search = "";
	$scope.itemsPerPage = 5;
	$scope.currentPage = 0;
	$scope.start = $scope.currentPage*$scope.itemsPerPage;
	
	//get data from api
	Restangular.one('manufacturing/bom').get({start:$scope.start,max:$scope.itemsPerPage}).then(function(response) {
		$scope.orders  = response.data;		
	}, function(response) {
		alert('error')
	});
	
	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
		  $scope.currentPage--;
		}
	};
	
	$scope.prevPageDisabled = function() {
		return $scope.currentPage === 0 ? "disabled" : "";
	};
	
	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pageCount() - 1) {
			$scope.currentPage++;
		}
	};
		
	$scope.nextPageDisabled = function() {
		return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
	};

	$scope.pageCount = function() {
		return Math.ceil($scope.total/$scope.itemsPerPage);
	};

	$scope.$watch("currentPage", function(newValue, oldValue) {
		Restangular.one('manufacturing/bom').get({start:newValue*$scope.itemsPerPage, max:$scope.itemsPerPage}).then(function(response) {
			$scope.orders  = response.data;		
		});
		$scope.total = Restangular.one('manufacturing/bom').get().then(function(response) {
			$scope.total  = response.data.length;
		}, function(response) {
			$scope.total = 0;
		});
	});
	
	$scope.setPage = function(n) {
		$scope.currentPage = n;
	};
	
	$scope.range = function() {
		var rangeSize = 5;
		var ret = [];
		var start;

		start = $scope.currentPage;
		if(rangeSize > $scope.pageCount()){
			rangeSize = $scope.pageCount();
			start = 0;
		}else if ( start > $scope.pageCount()-rangeSize ) {
			start = $scope.pageCount()-rangeSize+1;
		}

		for (var i=start; i < start+rangeSize; i++) {
			ret.push(i);
		}
		return ret;
	};
	
	//import order pop up data array
	$scope.orderData = {};
	
	$scope.importOrder = function() {
	
		// An elaborate, custom popup
		var importPopup = $ionicPopup.show({
			templateUrl : 'templates/import-order.html',
			title: 'Numero do Pedido',
			scope: $scope,
			buttons: [
			{ text: 'Cancelar',
				onTap: function(res) {	
					$scope.orderData = {};
					importPopup.close();
				}					
			},
			{ text: '<b>Importar</b>',
				type: 'button-positive',
				onTap: function(res) {
					//get data from api
					$http({
						method: 'GET', 
						url: 'http://integracao.altamira.com.br/manufacturing/bom?' + $scope.orderData.ordernumber,
						headers: {'Content-Type':'application/json; charset=iso-8859-1',
						'Accept': 'application/json',
						//'Authorization': 'Basic QWRtaW5pc3RyYXRvcjohYkZDWC45WCpUSg=='
						}
					}).success(function(data) {
						//post data to api
						var postOrder = Restangular.all('manufacturing/bom');
						postOrder.post(data).then(function(response) {
							if(response.status == 201){
								$ionicPopup.alert({
									title: 'Pedido ' + $scope.orderData.ordernumber,
									content: 'Pedido ' + $scope.orderData.ordernumber + ' foi importado com sucesso !'
								}).then(function(res) {
									$state.go($state.current, {}, {reload: true});
								});	
							}
						}, function() {
							// alert if an error occurs
							$ionicPopup.alert({
								title: 'Falhou',
								content: 'Erro ao importar o Pedido ' + $scope.orderData.ordernumber
							}).then(function(res) {
								importPopup.close();
							});
						});						
					}).error(function(msg, code) {
						// alert if an error occurs
						$ionicPopup.alert({
							title: 'Falhou',
							content: 'Erro ao exportar o Pedido: ' + $scope.orderData.ordernumber 
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
	
	// Triggered to mark as checked orders
	$scope.checkedOrder = function(isChecked,id) {
		//If order is not checked show pop up for check
		if(!isChecked){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Confirmação',
				template: 'A Lista de Material foi conferida ?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					Restangular.one('manufacturing/bom', id).get().then(function(response) {
						$scope.order = response.data;
						$scope.order.customPUT().then(function () {
							$ionicPopup.alert({
								title: 'Successo',
								content: 'A Lista de Material do Pedido ' + $scope.order.number + ' foi marcada como conferida.' 
							}).then(function(res) {
								$state.go($state.current, {}, {reload: true});
							});					
						});
					}, function(response) {
						alert('Erro, a Lista de Material não foi alterada.')
					});
					
				} else {
					console.log("NO");	
				}
			});
		}else{
			//if order is already checked re-direct to the detail page
			$state.go('app.single', {orderNumber: id});
		}
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
