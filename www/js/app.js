// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var altamiraApp = angular.module('starter', ['ionic', 'starter.controllers', 'ngAnimate', 'ngResource', 'restangular']);

altamiraApp.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
	
    /*.state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })*/
	
    .state('app.checklists', {
      url: "/checklist",
      views: {
        'menuContent' :{
          templateUrl: "templates/checklist.html",
          controller: 'ChecklistCtrl'
        }
      }
    })
	.state('app.single', {
      url: "/checklist/:orderNumber",
      views: {
        'menuContent' :{
          templateUrl: "templates/checklist-form.html",
          controller: 'CheckListDetailCtrl'
        }
      }
    })
	
	.state('app.manufacturesearch', {
      url: "/manufacturing/process",
      views: {
        'menuContent' :{
          templateUrl: "templates/mfg-process-search.html",
          controller: 'ManufacturingProcsSearchCtrl'
        }
      }
    })
	.state('app.mfgprocessform', {
		url: "/manufacturing/process/:processid",
		views: {
			'menuContent' :{
			  templateUrl: "templates/mfg-process-form.html",
			  controller: 'ManufcProcsFormCtrl'
			}
		}
    })
	.state('app.mfgoperationform', {
		url: "/manufacturesearch/process/:processid/operation/:operationid",
		views: {
			'menuContent' :{
			  templateUrl: "templates/mfg-operation-form.html",
			  controller: 'ManufcOprtnFormCtrl'
			}
		}
    });
	
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/checklist');

  //Enable cross domain calls
  //$httpProvider.defaults.useXDomain = true;
  //$httpProvider.defaults.withCredentials = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

})
.config(function(RestangularProvider) {
	//RestangularProvider.setBaseUrl('http://data.altamira.com.br/data/rest');
	RestangularProvider.setBaseUrl('http://data.altamira.com.br');
	RestangularProvider.setFullResponse(true);
	RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json; charset=iso-8859-1'});
	/*RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});*/
	RestangularProvider.setRestangularFields({
		id: "id"
	});
	//RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});
});

