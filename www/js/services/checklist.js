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
				url: 'http://integracao.altamira.com.br/manufacturing/bom?'+orderNum,
				headers: {'Authorization': 'Basic QWRtaW5pc3RyYXRvcjohYkZDWC45WCpUSg=='}
			}).success(function(data) {
				//post data to api
				$http({
                    method: "post",
					url: "http://data.altamira.com.br/sales/order",
					data: data  
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