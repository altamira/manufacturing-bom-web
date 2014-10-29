altamiraApp.service('mfgModalService', function ($ionicPopup, $ionicModal, $window, $state, $stateParams, Restangular) {
	var items = [];
	return {
		//to show alert box
		modalPopupBox: function(url){
			// Create the modal that we will use later
			$ionicModal.fromTemplateUrl('templates/'+url, {
				//scope: $scope
			}).then(function(modal) {
				items.modal = modal;
				modal.show();
			});
			
		},
		
		closeModal: function(){
			items.modal.hide();
		}
	};
});