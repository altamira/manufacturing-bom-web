angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ChecklistCtrl', function($scope, $stateParams, $ionicPopup, $timeout,  $state) {
	
	$scope.importOrder = function() {
	
		// An elaborate, custom popup
		var importPopup = $ionicPopup.show({
			templateUrl : 'templates/import-order.html',
			title: 'Order Number',
			scope: $scope,
			buttons: [
			{ text: 'Cancel' },
			{ text: '<b>Save</b>',
				type: 'button-positive',
				onTap: function(e) {
					
				}
			},
			]
		});
		importPopup.then(function(res) {
			console.log('Tapped!', res);
		});
		$timeout(function() {
			importPopup.close(); //close the popup after 3 seconds for some reason
		}, 30000);
	};
	
	$scope.data = {
		showDelete: false
	};
	
	// Triggered to delte orders
	$scope.deleteOrder = function(index) {     
		
		var confirmPopup = $ionicPopup.confirm({
			title: 'Delete Order',
			template: 'Are you sure you want to delete this order ?'
		});
		confirmPopup.then(function(res) {
			if(res) {
				$scope.orders.splice(index, 1);					
			} else {
				
			}
		});
	};
	
	//trigered when user click on products row
	$scope.goDetail = function (id) {
		$state.go('app.single', {orderId: id});
    }
	$scope.orders = [
            { "number": 72102, "customer": "INBRANDS S/A" },
            { "number": 72116, "customer": "INBRANDS S/A" },
            { "number": 72001, "customer": "INBRANDS S.A" },
            { "number": 72137, "customer": "INBRANDS S.A" },
            { "number": 72075, "customer": "PORTAL DE DOCUMENTOS LTDA" },
            { "number": 72047, "customer": "AYROMEDIC COM. DE MAT. MEDICOS E HOSPITALARES  LTA" },
            { "number": 72203, "customer": "JN - MADEIRA E FERRAGENS LTDA" },
            { "number": 72286, "customer": "BWF COMERCIO DE TELAS E LONAS LTDA" },
            { "number": 72068, "customer": "INOVA COMERCIO DE MATERIAIS ELETRICOS LTDA" },
            { "number": 72207, "customer": "DISTSEG SERV. E COM. DE EQUIP. DE SEGURANÇA LTDA" },
            { "number": 72219, "customer": "CS AGRONEGOCIOS COM. IMP. EXPORTAÇÃO S/A" },
            { "number": 72081, "customer": "TECHNOPARK COM DE ARTIGOS OPTICOS S.A" },
            { "number": 72240, "customer": "NILTON SILVA" },
            { "number": 72019, "customer": "FABIO SILVEIRA BENETI" },
            { "number": 72292, "customer": "ADRIAN MARIO GERRA ALVAREZ" },
            { "number": 72082, "customer": "PEDRO DE NIEMEYER CESARINO" },
            { "number": 72132, "customer": "LUIS HENRIQUE MARCHENTI GOMES" },
            { "number": 72057, "customer": "AUTO POSTO BRUMAR LTDA" },
            { "number": 72086, "customer": "WATERS TECHNOLOGIES DO BRASIL LTDA" },
            { "number": 72032, "customer": "SAMSUNG ELETRONICA DA AMAZONIA LTDA" },
            { "number": 72150, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72060, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72069, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72084, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72094, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72162, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72164, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72165, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72215, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72274, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72285, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72231, "customer": "POLIMPORT COMERCIO E EXPORTACAO LTDA" },
            { "number": 72188, "customer": "VIBELPLAST EMBALAGENS PLASTICAS LTDA" },
            { "number": 72106, "customer": "MULTI MARCAS EDITORIAIS LTDA." },
            { "number": 72213, "customer": "INDUSTRIAS ROSSI ELETROMECANICA LTDA" },
            { "number": 72186, "customer": "HOT POWER COMERCIAL ELETRONICA EIRELE" },
            { "number": 72289, "customer": "ITW FEG DO BRASIL INDUSTRIA E COMERCIO LTDA" },
            { "number": 72267, "customer": "ATLANTA COMERCIO REPRES  IMP EXP LTDA" },
            { "number": 72002, "customer": "WHB DO BRASIL LTDA" },
            { "number": 72153, "customer": "ASK DO BRASIL LTDA" },
            { "number": 72117, "customer": "ICE CARTOES ESPECIAIS LTDA" },
            { "number": 72208, "customer": "ICE CARTOES ESPECIAIS LTDA" },
            { "number": 72139, "customer": "MICRO - PRECISA FERRAMENTAS E COMERCIO LTDA" },
            { "number": 72039, "customer": "MRS LOGISTICA S/A" },
            { "number": 72120, "customer": "ONESUBSEA DO BRASIL SERVIÇOS SUBMARINOS LTDA" },
            { "number": 72281, "customer": "ONESUBSEA DO BRASIL SERVIÇOS SUBMARINOS LTDA" },
            { "number": 72261, "customer": "MULT TEMPERA COAT TEC.TRAT. TER.E REV.SUPERF. LTDA" },
            { "number": 72018, "customer": "RHOSS PRINT ETIQUETAS GRAFICA E EDITORA LTDA" },
            { "number": 72105, "customer": "HORIBA INSTRUMENTS BRASIL LTDA" },
            { "number": 72257, "customer": "NATAM EXPRESS TRANSPORTES LTDA" },
            { "number": 72022, "customer": "DELLO INDUSTRIA E COMERCIO LTDA" },
            { "number": 72076, "customer": "MARINE PRODUCTION SYSTEMS DO BRASIL LTDA" },
            { "number": 72077, "customer": "MARINE PRODUCTION SYSTEMS DO BRASIL LTDA" },
            { "number": 72095, "customer": "MARINE PRODUCTION SYSTEMS DO BRASIL LTDA" },
            { "number": 72295, "customer": "MARINE PRODUCTION SYSTEMS DO BRASIL LTDA" },
            { "number": 72193, "customer": "FRASCOMAR - JULYPLASTIC IND. E COM. DE PLAST LTDA" },
            { "number": 72234, "customer": "FRASCOMAR - JULYPLASTIC IND. E COM. DE PLAST LTDA" },
            { "number": 72235, "customer": "FRASCOMAR - JULYPLASTIC IND. E COM. DE PLAST LTDA" },
            { "number": 72250, "customer": "FRASCOMAR - JULYPLASTIC IND. E COM. DE PLAST LTDA" },
            { "number": 72251, "customer": "FRASCOMAR - JULYPLASTIC IND. E COM. DE PLAST LTDA" },
            { "number": 72033, "customer": "EMB-PAPST MOTORES VENTILADORES LTDA" },
            { "number": 72058, "customer": "CONCESSIONARIA DE ROD. DO OESTE DE S. PAULO  VIAOE" },
            { "number": 72131, "customer": "MAQ VALLE EQUIP.COML. DE TAUBATE LTDA EPP" },
            { "number": 72052, "customer": "BLUM DO BRASIL IND. E COM. DE FERRAGENS LTDA" },
            { "number": 72166, "customer": "COLORTECH DA AMAZONIA LTDA" },
            { "number": 72110, "customer": "ANJO QUIMICA DO BRASIL LTDA" },
            { "number": 72111, "customer": "ANJO QUIMICA DO BRASIL LTDA" },
            { "number": 72192, "customer": "DIVERSEY BRASIL INDUSTRIA QUIMICA LTDA" },
            { "number": 72041, "customer": "MODINE DO BRASIL SISTEMAS TERMICOS LTDA" },
            { "number": 72212, "customer": "VOITH HYDRO LTDA" },
            { "number": 72167, "customer": "PIC QUIMICA E FARMACEUTICA LTDA" },
            { "number": 72168, "customer": "PIC QUIMICA E FARMACEUTICA LTDA" },
            { "number": 72059, "customer": "THOMAS GREG & SONS GRAF.SERV.IND.COM.IMP.EXP.EQ LT" },
            { "number": 72014, "customer": "RICOM INDUSTRIA DE COMPRESSORES LTDA" },
            { "number": 72216, "customer": "RICOM INDUSTRIA DE COMPRESSORES LTDA" },
            { "number": 72200, "customer": "ULTRALUB QUIMICA LTDA." },
            { "number": 72155, "customer": "BUREAU DE IMAGENS LTDA" },
            { "number": 72239, "customer": "BUREAU DE IMAGENS LTDA" },
            { "number": 72294, "customer": "SERVICO NACIONAL DE APRENDIZAGEM INDUSTRIAL" },
            { "number": 72276, "customer": "RAFAEL COSTA ESTUDIO FOTOGRÁFICO LTDA" },
            { "number": 72115, "customer": "VGER CIE COML. IMPORTAÇÃO E EXPORTAÇÃO LTDA" },
            { "number": 72279, "customer": "VGER CIE COML. IMPORTAÇÃO E EXPORTAÇÃO LTDA" },
            { "number": 72027, "customer": "AKL COMERCIAL ELETRICA LTDA" },
            { "number": 72065, "customer": "PALACIO DAS BATERIAS LTDA" },
            { "number": 72170, "customer": "BARRA FUNDA AQUARIO EIRELI - EPP" },
            { "number": 72140, "customer": "GARRAFERIA BRASIL BEBIDAS LTDA" },
            { "number": 72000, "customer": "B.T. MARTINS INFORMATICA" },
            { "number": 72283, "customer": "PLURALQUIMICA INDUSTRIA E COMERCIO LTDA" },
            { "number": 72143, "customer": "ARTFIX INDUSTRIA GRÁFICA LTDA" },
            { "number": 72217, "customer": "BALONE ACESSORIOS LTDA" },
            { "number": 72187, "customer": "MACPET EMBALAGENS LTDA." },
            { "number": 72205, "customer": "PAMA COMERCIO DE GENEROS ALIMENTICIOS LTDA" },
            { "number": 72100, "customer": "BAUKO EQUIP.DE MOVIMENTACAO E ARMAZENAGEM S/A" },
            { "number": 72268, "customer": "LUMARC MONTAGENS ELETRONICAS LTDA" },
            { "number": 72176, "customer": "ENDO IMPLANTES COM. DE PROD. PARA A SAUDE LTDA" },
            { "number": 72046, "customer": "INSITE RIO COM. VAREJISTA DE EQUIPAMENTOS LTDA" },
            { "number": 72003, "customer": "UD MIX COM. E IMP. DE UTILIDADES DOM. LTDA" },
            { "number": 72182, "customer": "UD MIX COM. E IMP. DE UTILIDADES DOM. LTDA" },
            { "number": 72136, "customer": "NOVA GIULEN INDUSTRIA TEXTIL DA MODA LTDA" },
            { "number": 72236, "customer": "CONSORCIO CONSTRUTOR BELO MONTE" },
            { "number": 72225, "customer": "DBX FOOD S. DIST. REP. BEBIDAS  PRO. ALIMENT. L" },
            { "number": 72126, "customer": "DISTRIBUIDORA DE EMBALAGENS S. HIPPLER LTDA" },
            { "number": 72128, "customer": "DISTRIBUIDORA DE EMBALAGENS S. HIPPLER LTDA" },
            { "number": 72113, "customer": "UNICHARM DO BRASIL IND COM DE PROD  HIGIENE LTDA" },
            { "number": 72063, "customer": "FARMA WORLD IMPORT E EXPORT DE MEDICAMENTOS LTDA" },
            { "number": 72244, "customer": "RITZ EQUIP. DE MANUT. DE SIST. ELETRICOS S/A" },
            { "number": 72007, "customer": "SO ACO COMERCIO DE MOVEIS LTDA" },
            { "number": 72091, "customer": "DAISO BRASIL COMERCIO E IMPORTAÇÃO LTDA" },
            { "number": 72157, "customer": "ROLAND DG BRASIL IMPORTAÇÃO E EXPORTAÇÃO LTDA" },
            { "number": 72035, "customer": "TRILHO SUISSO IND E COM LTDA" },
            { "number": 72254, "customer": "NBR COMERCIAL DE PLASTICOS LTDA" },
            { "number": 72109, "customer": "PACK FIX IND. COM. DE EMBALAGENS LTDA" },
            { "number": 72201, "customer": "UGF SERVICOS HOSPITALARES S.A." },
            { "number": 72079, "customer": "LUMITEX IMPORTADORA E DISTRIBUIDORA LTDA" },
            { "number": 72121, "customer": "MAURICIO DUARTE DE OLIVEIRA ALVES TOSTES" },
            { "number": 72093, "customer": "LABORATORIO TEUTO BRASILEIRO S/A" },
            { "number": 72154, "customer": "EMPA S/A SERVIÇOS DE ENGENHARIA" },
            { "number": 72197, "customer": "LIFE SAFETY COM . MENUT. E ALUGUEL DE EQUIP. LTDA" },
            { "number": 72071, "customer": "CARMEL PARTIC. E COM. DE PROD. HIG. E LIMPEZA LTDA" },
            { "number": 72010, "customer": "KATEL CASA SHOPPING LTDA - EPP" },
            { "number": 72253, "customer": "BEKAERT CIMAF CABOS LTDA" },
            { "number": 72025, "customer": "VIMAX PRODUTOS PARA MANUTENÇÃO DE PNEUS - EIRELLI" },
            { "number": 72163, "customer": "SWEET SIZE MODAS LTDA - ME" },
            { "number": 72097, "customer": "FUNDACAO SAO FRANCISCO XAVIER - HMC" },
            { "number": 72238, "customer": "FUNDACAO SAO FRANCISCO XAVIER - HMC" },
            { "number": 72293, "customer": "FUNDACAO SAO FRANCISCO XAVIER - HMC" },
            { "number": 72210, "customer": "NIF OFICINA DE COSTURA LTDA." },
            { "number": 72054, "customer": "SEALWAY COMERCIO E IMPORTAÇÃO DE VEDACAO LTDA" },
            { "number": 72288, "customer": "3LAP COMERCIO DE IMPORTAÇÃO E EXPORTAÇÃO LTDA" },
            { "number": 72256, "customer": "MULTIFARMA COMERCIAL LTDA" },
            { "number": 72178, "customer": "TRON CONTROLES ELETRICOS LTDA" },
            { "number": 72287, "customer": "DISBAMOC DISTRIBUIDORA DE BATERIAS MOC LTDA - EPP" },
            { "number": 72259, "customer": "POSTO DE GASOLINA LIMOEIRO LTDA" },
            { "number": 72123, "customer": "GLOBO COMUNICAÇÃO E PARTICIPAÇÕES  S/A" },
            { "number": 72127, "customer": "GLOBO COMUNICAÇÃO E PARTICIPAÇÕES  S/A" },
            { "number": 72160, "customer": "GLOBO COMUNICAÇÃO E PARTICIPAÇÕES  S/A" },
            { "number": 72195, "customer": "GLOBO COMUNICAÇÃO E PARTICIPAÇÕES  S/A" },
            { "number": 72190, "customer": "ITW DELFAST DO BRASIL LTDA." },
            { "number": 72185, "customer": "VIGODENT S/A INDUTRIA E COMERCIO" },
            { "number": 72013, "customer": "BARCAS S/A TRANSPORTES MARITIMOS" },
            { "number": 72096, "customer": "CARBOGRAFITE EQUIPAMENTOS INDUSTRIAIS LTDA" },
            { "number": 72233, "customer": "BRAWAL FERRAMENTARIA DE PRECISAO LTDA" },
            { "number": 72053, "customer": "J RUFINU S DIESEL LTDA" },
            { "number": 72175, "customer": "J RUFINU S DIESEL LTDA" },
            { "number": 72184, "customer": "J RUFINU S DIESEL LTDA" },
            { "number": 72078, "customer": "ANDALUZ INDUSTRIA METALURGICA LTDA." },
            { "number": 72227, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72183, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72129, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72179, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72194, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72273, "customer": "IRON MOUNTAIN DO BRASIL LTDA" },
            { "number": 72174, "customer": "SOFAPE FABRICANTES DE FILTROS LTDA" },
            { "number": 72177, "customer": "SOFAPE FABRICANTES DE FILTROS LTDA" },
            { "number": 72275, "customer": "SOFAPE FABRICANTES DE FILTROS LTDA" },
            { "number": 72050, "customer": "SOFAPE FABRICANTE DE FILTROS LTDA" },
            { "number": 72044, "customer": "MASTER PUMPS EMB. COM. IMP. EXP. LTDA." },
            { "number": 72073, "customer": "CONFECCOES ALTA MODA LTDA" },
            { "number": 72074, "customer": "PANASONIC DO BRASIL LIMITADA" },
            { "number": 72130, "customer": "BERCOSUL LTDA" },
            { "number": 72198, "customer": "FERDINANDO CASTELLI - EPP" },
            { "number": 72299, "customer": "GLOBALPACK INDUSTRIA E COMERCIO LTDA" },
            { "number": 72169, "customer": "NOVA ERA IND. E COM. DE EMBALAGENS PLASTICAS LTDA" },
            { "number": 72015, "customer": "AC & F SERVIÇOS TECNICOS LTDA" },
            { "number": 72108, "customer": "SISMETAL LTDA" },
            { "number": 72147, "customer": "BYCON IND. E COMERCIO DE ELETRO ELETRONICOS S/A" },
            { "number": 72067, "customer": "AMERICA VEICULOS LTDA" },
            { "number": 72066, "customer": "AMERICA VEICULOS LTDA" },
            { "number": 72038, "customer": "THAC CONTRUTORA PAVIMENTADORA IND. E COM. LTDA" },
            { "number": 72122, "customer": "BELENUS DO BRASIL LTDA" },
            { "number": 72099, "customer": "SOLDAS BRASIL COMERCIAL IMPORTADORA LTDA" },
            { "number": 72226, "customer": "CERTA INDUSTRIA E COMERCIO DE ALIMENTOS LTDA" },
            { "number": 72232, "customer": "CERTA INDUSTRIA E COMERCIO DE ALIMENTOS LTDA" },
            { "number": 72272, "customer": "H B FIDELIS MARQUES DESCARTAVEIS LTDA" },
            { "number": 72026, "customer": "INTERLUB ESPECIALIDADES LUBRIFICANTES LTDA" },
            { "number": 72262, "customer": "VILLARTA EQUIPAMENTOS DE ELEVACAO LTDA" },
            { "number": 72263, "customer": "VILLARTA EQUIPAMENTOS DE ELEVACAO LTDA" },
            { "number": 72149, "customer": "PIXEL COMERCIO DE MOVEIS LTDA" },
            { "number": 72080, "customer": "ROWA DO BRASIL COMERCIAL DE BOMBAS LTDA" },
            { "number": 72151, "customer": "ATIVA TECNOLOGIA E DESENVOLVIMENTO LTDA" },
            { "number": 72036, "customer": "NEWTEC MAQUINAS E FILTROS LTDA EPP" },
            { "number": 72004, "customer": "MG MEDICAMENTOS ATACADISTA LTDA" },
            { "number": 72245, "customer": "MG MEDICAMENTOS ATACADISTA LTDA" },
            { "number": 72042, "customer": "PRIVATE BRASIL IND.COM. E IMP.DE PECAS AUTOM. LTDA" },
            { "number": 72107, "customer": "TOYOLEX AUTOS LTDA" },
            { "number": 72012, "customer": "DANIEL GALHA DA SILVA" },
            { "number": 72124, "customer": "ANUAR COSMETICOS LTDA" },
            { "number": 72218, "customer": "ANUAR COSMETICOS LTDA" },
            { "number": 72298, "customer": "LUAN MED PRODUTOS HOSPITALARES LTDA" },
            { "number": 72031, "customer": "RS & J COM. DE FRUTAS, VERDURAS E CEREAIS LTDA" },
            { "number": 72101, "customer": "RAIA DROGASIL S/A" },
            { "number": 72048, "customer": "RAIA DROGASIL S/A" },
            { "number": 72223, "customer": "RAVEN IND E COM.DE FERRAMENTAS LTDA" },
            { "number": 72229, "customer": "DANFOSS DO BRASIL INDUSTRIA E COM. LTDA." },
            { "number": 72062, "customer": "TURY DO BRASIL IND. E COM. LTDA" },
            { "number": 72135, "customer": "TURY DO BRASIL IND. E COM. LTDA" },
            { "number": 72112, "customer": "CRAIL IND. E COM. DE ARTIGOS ESPORTIVOS LTDA" },
            { "number": 72114, "customer": "EMPRETEC INDUSTRIA E COMERCIO LTDA" },
            { "number": 72180, "customer": "ESTAMPO TEC INDUSTRIA E COMERCIO LTDA." },
            { "number": 72030, "customer": "SENSORMATIC DO BRASIL ELETRONICA LTDA" },
            { "number": 72061, "customer": "TRANSBOR COM DE PROD INDUSTRIAIS LTDA" },
            { "number": 72087, "customer": "TRANSBOR COM DE PROD INDUSTRIAIS LTDA" },
            { "number": 72246, "customer": "TRANSBOR COM DE PROD INDUSTRIAIS LTDA" },
            { "number": 72173, "customer": "ECCOS INDUSTRIA METALURGICA LTDA" },
            { "number": 72249, "customer": "CHECKPOINT DOS BRASIL LTDA" },
            { "number": 72206, "customer": "RESIL COMERCIAL INDUSTRIAL LTDA" },
            { "number": 72196, "customer": "DIMALOG - TRANSPORTES E LOGISTICA LTDA" },
            { "number": 72161, "customer": "ISOCOAT TINTAS E VERNIZES LTDA." },
            { "number": 72269, "customer": "ISOCOAT TINTAS E VERNIZES LTDA." },
            { "number": 72277, "customer": "ISOCOAT TINTAS E VERNIZES LTDA." },
            { "number": 72290, "customer": "WEISHAUPT DO BRASIL INDUSTRIA COMERCIO LTDA" },
            { "number": 72204, "customer": "JOMARCA INDL DE PARAFUSOS LTDA" },
            { "number": 72085, "customer": "VALDEQUIMICA PRODUTOS QUIMICOS  LTDA." },
            { "number": 72280, "customer": "AÇOTUBO INDUSTRIA E COMERCIO LTDA" },
            { "number": 72248, "customer": "CAZI QUIMICA FARMACEUTICA IND. COM. LTDA" },
            { "number": 72070, "customer": "SM EMPREENDIMENTOS FARMACEUTICOS LTDA" },
            { "number": 72045, "customer": "SM EMPREENDIMENTOS FARMACEUTICOS LTDA" },
            { "number": 72296, "customer": "INTERMEDICA SISTEMA DE SAUDE S/A" },
            { "number": 72278, "customer": "CAMPESTRE IND. E COM. DE OLEOS VEGETAIS LTDA" },
            { "number": 72016, "customer": "HONEYWELL INDUSTRIA AUTOMOTIVA LTDA" },
            { "number": 72006, "customer": "COMERCIAL ELMAR LTDA" },
            { "number": 72284, "customer": "COMERCIAL ELMAR LTDA" },
            { "number": 72220, "customer": "NORGREN LTDA" },
            { "number": 72291, "customer": "SOCIEDADE ASSISTENCIAL BANDEIRANTES" },
            { "number": 72191, "customer": "ZOPPAS INDUSTRIES DO BRASIL LTDA" },
            { "number": 72023, "customer": "IGREJA BATISTA MEMORIAL DE SÃO PAULO" },
            { "number": 72024, "customer": "IGREJA BATISTA MEMORIAL DE SÃO PAULO" },
            { "number": 72056, "customer": "CEPEL COM.DE PAPEIS E EMBALAGENS LTDA EPP" },
            { "number": 72083, "customer": "ECADIL INDUSTRIA QUIMICA S/A" },
            { "number": 72209, "customer": "VAROTTI COM.DE COMPENSADOS E FERRAGENS LTDA" },
            { "number": 72142, "customer": "FLEXCOAT PRODUTOS AUTO ADESIVOS S/A." },
            { "number": 72247, "customer": "FLEXCOAT PRODUTOS AUTO ADESIVOS S/A." },
            { "number": 72049, "customer": "BRASFOND FUNDACOES ESPECIAIS S/A" },
            { "number": 72258, "customer": "BRASFOND FUNDACOES ESPECIAIS S/A" },
            { "number": 72297, "customer": "AUTO PECAS SIBELI LTDA EPP" },
            { "number": 72090, "customer": "CONTINENTAL BRASIL INDUSTRIA AUTOMOTIVA LTDA" },
            { "number": 72055, "customer": "FUNDICAO BATATAIS LTDA" },
            { "number": 72043, "customer": "INDUSTRIA TEXTIL BETILHA LTDA" },
            { "number": 72145, "customer": "CINPAL CIA INDL. DE PECAS PARA AUTOMOVEIS" },
            { "number": 72181, "customer": "CINPAL CIA INDL. DE PECAS PARA AUTOMOVEIS" },
            { "number": 72265, "customer": "CINPAL CIA INDL. DE PECAS PARA AUTOMOVEIS" },
            { "number": 72072, "customer": "CORREIAS MERCURIO S/A INDUSTRIA E COMERCIO" },
            { "number": 72029, "customer": "DUTRA MAQUINAS COMERCIAL E TECNICA LTDA" },
            { "number": 72172, "customer": "DUTRA MAQUINAS COMERCIAL E TECNICA LTDA" },
            { "number": 72224, "customer": "MOFERTEC EQUIPAMENTOS INDUSTRIAIS LTDA" },
            { "number": 72144, "customer": "JACKFIL COMERCIO E INDUSTRIA TE TECIDOS LTDA" },
            { "number": 72230, "customer": "BIOMEDICAL EQUIP. PROD.MED.CIRURG.LTDA" },
            { "number": 72189, "customer": "SULPECAS COMERCIO E REPRESENTACOES LTDA" },
            { "number": 72028, "customer": "BMI ELETRONICA INDUSTRIA E COMERCIO LTDA" },
            { "number": 72202, "customer": "OPHTALMOS FORMULAS OFICINAIS LTDA" },
            { "number": 72199, "customer": "HEXIS CIENTIFICA S/A" },
            { "number": 72064, "customer": "CONTEMP INDUSTRIA COMERCIO E SERVICOS LTDA" },
            { "number": 72118, "customer": "SAG - GRAFICA E EDITORA LTDA - EPP" },
            { "number": 72089, "customer": "BRISKA IND. E COM. DE CONFECCOES LTDA" },
            { "number": 72037, "customer": "MAQMOVEIS INDUSTRIA E COMERCIO DE MOVEIS LTDA." },
            { "number": 72088, "customer": "DISPLOKI DISTR. COM. REPRESENTAÇÃO LTDA" },
            { "number": 72221, "customer": "GENILSON VENERI-ME" },
            { "number": 72138, "customer": "TEC TOR IND. E COM. DE EQUIPAMENTOS LTDA" },
            { "number": 72252, "customer": "INDUSTRIA E COMERCIO DE FRUTAS RICAELI LTDA" },
            { "number": 72005, "customer": "EMBALABOR INDUSTRIA E COMERCIO LTDA" },
            { "number": 72241, "customer": "TECNOLOGIA QUANTUM INDUSTRIA ELETRONICA LTDA" },
            { "number": 72134, "customer": "LSK ENGENHARIA LTDA" },
            { "number": 72103, "customer": "GB INDUSTRIA MECANICA LTDA" },
            { "number": 72017, "customer": "BOLLHOFF SERVICE CENTER LTDA" },
            { "number": 72255, "customer": "IMB TEXTIL S.A." },
            { "number": 72148, "customer": "SEAL TELECOM COM. E SERV. DE TELECOMUNICAÇÕES LTDA" },
            { "number": 72214, "customer": "CBL COMERCIO E RECICLAGEM DE BORRACHAS LTDA" },
            { "number": 72125, "customer": "ANTONIO L FERREIRA S/A COML. E IMPORT." },
            { "number": 72021, "customer": "AKZO NOBEL LTDA" },
            { "number": 72211, "customer": "MELINOX COMERCIAL E IMPORTADORA LTDA" },
            { "number": 72133, "customer": "OTTO BAUMGART INDUSTRIA E COMERCIO S/A" },
            { "number": 72282, "customer": "SCARLAT INDUSTRIAL LTDA" },
            { "number": 72008, "customer": "EMPRESA DE TRANSPORTES ATLAS LTDA" },
            { "number": 72228, "customer": "USIQUIMICA DO BRASIL LTDA" },
            { "number": 72040, "customer": "DAIICHI SANKYO BRASIL FARMACEUTICA LTDA" },
            { "number": 72092, "customer": "SOCIEDADE BENEF. SÃO CAMILO HOSPITAL MONS. HORTA" },
            { "number": 72243, "customer": "SAINT-GOBAIN DO BRASIL PROD IND E PARA CONST LTDA" },
            { "number": 72020, "customer": "SKF DO BRASIL LTDA" },
            { "number": 72152, "customer": "ILUMATIC S/A ILUMIN. E  ELETROMETALURGICA" },
            { "number": 72222, "customer": "HONEYWELL DO BRASIL LTDA" },
            { "number": 72260, "customer": "ELECTRO PLASTIC S/A" },
            { "number": 72051, "customer": "AUTO VIACAO URUBUPUNGA LTDA" },
            { "number": 72034, "customer": "NATURA COSMETICOS S/A" },
            { "number": 72171, "customer": "PNEUMATICA INSTRUMENTACAO INDUSTRIAL LTDA" },
            { "number": 72242, "customer": "VETNIL IND.E COM.PROD.VETERINARIOS LTDA." },
            { "number": 72237, "customer": "OBRAS SOCIAIS SANTA TEREZINHA" },
            { "number": 72098, "customer": "COMERCIAL 3 ALBE LTDA" },
            { "number": 72104, "customer": "BOTICA COMERCIAL FARMACEUTICA LTDA" },
            { "number": 72146, "customer": "BOTICA COMERCIAL FARMACEUTICA LTDA" },
            { "number": 72159, "customer": "BOTICA COMERCIAL FARMACEUTICA LTDA" },
            { "number": 72158, "customer": "ESMALGLASS DO BRASIL LTDA" },
            { "number": 72156, "customer": "INDUSTRIA GRAFICA SUL LTDA" },
            { "number": 72009, "customer": "NOVA CLEAN COM. IMP.E EXP. DE DESCARTAVEIS LTDA" },
            { "number": 72011, "customer": "NOVA CLEAN COM. IMP.E EXP. DE DESCARTAVEIS LTDA" },
            { "number": 72119, "customer": "NOVA CLEAN COM. IMP.E EXP. DE DESCARTAVEIS LTDA" },
            { "number": 72270, "customer": "MN ARMAZENS GERAIS LTDA" },
            { "number": 72141, "customer": "DURATEX S.A" },
            { "number": 72264, "customer": "DURATEX S.A" },
            { "number": 72266, "customer": "DURATEX S.A" },
            { "number": 72271, "customer": "DURATEX S.A" }
  ];
})

//orders detail controller
// orderApp.controller('CheckListDetailCtrl', function($scope, Restangular) {
	// $scope.orders = Restangular.one('72271').get();
	// console.log($scope.orders);
// });

orderApp.controller("CheckListDetailCtrl", ['$scope','$http', function($scope, $http){    
            $http.get('js/order_detail.json').success (function(data){
                $scope.orders = data;
				console.log( $scope.orders);
        });
    }]
);