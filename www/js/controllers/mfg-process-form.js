//orders detail controller
altamiraApp.controller('ManufcProcsFormCtrl', function($scope, $ionicPopup, $window, $stateParams, Restangular) {
	
	//get data from api
	$scope.process = {
		"code": "PPLCOL00113000000000",
		"description": "COLUNA NORMAL CH12 2800MM",
		"color": "Blue",
		"weight": 0,
		"width": 0,
		"length": 0,
		"finish": "finish",
		"revision": [
			{
				"date": 1410895028676,
				"by": "ROBERTO ZELLI"
			},
			{
				"date": 1410895028676,
				"by": "HELIO TODA"
			},
			{
				"date": 1410895028676,
				"by": "HELIO TODA"
			},
			{
				"date": 1410895028676,
				"by": "HELIO TODAAA"
			},
			{
				"date": 1410895028676,
				"by": "HELIO TODACCC"
			}
		],
		"operation": [
			{
				"sequence": 10,
				"name": "PERFILAMENTO",
				"description": "",
				"croqui": "",
				"input": [
					{
						"code": "ALPRFQ30-KG20000F330",
						"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
						"quantity": 32.34,
						"unit": "kg"
					},
					{
						"code": "PERF-PPLTUBO113",
						"description": "PERFILADEIRA TUBO 113",
						"quantity": 3,
						"unit": "min"
					}
				],
				"output": [
					{
						"code": "PPLCOL00113000000000-01",
						"description": "PERFIL LONG TUBO 113",
						"quantity": 52.34,
						"unit": "kg"
					}
				]
			},
			{
				"sequence": 20,
				"name": "PERFILAMENTO 2",
				"description": "THIS IS TEST DESCRIPTION",
				"croqui": "THIS IS TEST DESCRIPTION 2",
				"input": [
					{
						"code": "ALPRFQ30-KG20000F330",
						"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
						"quantity": 32.34,
						"unit": "kg"
					},
					{
						"code": "PERF-PPLTUBO113",
						"description": "PERFILADEIRA TUBO 113",
						"quantity": 3,
						"unit": "min"
					},
					{
						"code": "ALPRFQ30-KG20000F330",
						"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
						"quantity": 32.34,
						"unit": "kg"
					},
					{
						"code": "PERF-PPLTUBO113",
						"description": "PERFILADEIRA TUBO 113",
						"quantity": 3,
						"unit": "min"
					},
					{
						"code": "ALPRFQ30-KG20000F330",
						"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
						"quantity": 32.34,
						"unit": "kg"
					},
					{
						"code": "PERF-PPLTUBO113",
						"description": "PERFILADEIRA TUBO 113",
						"quantity": 3,
						"unit": "min"
					},
					{
						"code": "ALPRFQ30-KG20000F330",
						"description": "ACO FINA QUENTE PRETO ROLO 2,00MM 330MM",
						"quantity": 32.34,
						"unit": "kg"
					},
					{
						"code": "PERF-PPLTUBO113",
						"description": "PERFILADEIRA TUBO 113",
						"quantity": 3,
						"unit": "min"
					}
				],
				"output": [
					{
						"code": "PPLCOL00113000000000-01",
						"description": "PERFIL LONG TUBO 113",
						"quantity": 52.34,
						"unit": "kg"
					}
				]
			}
		]
	};	
	
});