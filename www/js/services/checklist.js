// Restangular service that uses Bing
// altamiraApp.factory('ImportOrder', function(Restangular) {
  // return Restangular.withConfig(function(RestangularConfigurer) {
    // RestangularConfigurer.setBaseUrl(' http://integration.altamira.com.br/manufacturing/bom');
	// RestangularConfigurer.setDefaultHeaders({Authorization: "Basic QWRtaW5pc3RyYXRvcjohYkZDWC45WCpUSg=="});
  // });
// });
altamiraApp.factory('ImportOrders', function($http, $log, $q) {
	return {
		getOrder: function(orderNum) {
			var deferred = $q.defer();
			//get the data from api
			$http({
				method: 'GET', 
				url: 'http://integracao.altamira.com.br/manufacturing/bom?' + orderNum,
				crossDomain: true  
			}).success(function(data) {
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
				$log.error(msg, code);
			});
			return deferred.promise;
		}
	}
});