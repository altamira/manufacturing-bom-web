altamiraApp.factory('ImportOrders', function($http, $log, $q) {
	return {
		getOrder: function(orderNum) {
			var deferred = $q.defer();
			//get the data from api
			$http({
				method: 'GET', 
				url: 'http://integracao.altamira.com.br/manufacturing/bom?'+orderNum,
				headers: {'Content-Type':'application/json',
					'Authorization': 'Basic QWRtaW5pc3RyYXRvcjohYkZDWC45WCpUSg=='
				}
			}).success(function(data) {
				console.log("data");
				//post data to api
				$http({
                    method: "post",
					url: "http://data.altamira.com.br/data/rest/sales/order",
					data: data,
					xhrFields: {
				       withCredentials: true
				    },
				    crossDomain: true  
				}).success(function(data) {
				
				}).error(function(data, status) { // called asynchronously if an error occurs

				});
			}).error(function(msg, code) {
				deferred.reject(msg);
				//$log.error(msg, code);
				console.log("error");

				$log.error(msg, code);
			});
			return deferred.promise;
		}
	}
});