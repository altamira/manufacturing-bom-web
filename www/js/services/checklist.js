// Restangular service that uses Bing
altamiraApp.factory('ImportOrder', function(Restangular) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(' http://integration.altamira.com.br/manufacturing/bom');
  });
});