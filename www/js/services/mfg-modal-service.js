altamiraApp.service('mfgModalService', function ($scope, $rootScope, $ionicPopup, $ionicModal, $window, $state, $stateParams, Restangular) {
	return {
		//to show alert box
		modalPopupBox: function(url){
			// Create the modal that we will use later
			$ionicModal.fromTemplateUrl('templates/add-item.html', {
				scope: $scope
			}).then(function(modal) {
				$scope.modal = modal;
				modal.show();
			});
			
		}
	};
});