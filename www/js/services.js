'use strict';

orderApp.factory('Orders', function($resource) {
	return $resource('/orders.json/:id',  { id: '@number' })
});