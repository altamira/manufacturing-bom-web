// Restangular service that uses a different url then the base url
altamiraApp.factory('ImportOrders', function(Restangular) {
	return Restangular.withConfig(function(RestangularConfigurer) {
		RestangularConfigurer.setBaseUrl(' http://integration.altamira.com.br');
	});
});