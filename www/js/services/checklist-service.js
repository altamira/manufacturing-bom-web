altamiraApp.service('checklistService', function ($ionicPopup, $window, $state, $stateParams, Restangular) {
	return {
		getCheckList: function(offset, limit) {
			var OrderData = {};
			//get data from api
			Restangular.one('manufacturing/bom').get({start:offset,max:limit}).then(function(response) {
				OrderData = response.data;
			}, function(response) {
				OrderData = null;
			});
			return OrderData;
		},
		total: function() {		
			var total = Restangular.one('manufacturing/bom').get().length;
			return total;
		}		
	};
});