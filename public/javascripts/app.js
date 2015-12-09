/**
 * Author: kir
 * Created at: 09.12.15 16:29
 */
var APP_NAME = 'threeBoar';

(function (angular, window) {
	var app = angular.module(window.APP_NAME, ['threeBoar.indicator']);

	app.constant('airBrakeConfig', {
		projectId: 118406,
		projectKey: '0b5344a3a7679f2981ed4c73b44c99f6'
	});

	//var airbrake = new airbrakeJs.Client({projectId: 118406, projectKey: '0b5344a3a7679f2981ed4c73b44c99f6'});
	//if (window.jQuery) {
	//	airbrakeJs.instrumentation.jquery(airbrake, jQuery);
	//}

	app.factory('$exceptionHandler', addAirBrakeHandler);
	app.factory('airBrake', airbrakeServiceFactory);


	app.run([function () {

		console.log('app:run::%s::Test application  "%s" running.', new Date(), window.APP_NAME);

		//try {
		//	 This will throw if the document has no head tag
		//	document.head.insertBefore(document.createElement("style"));
		//} catch(err) {
		//	airbrake.push(err);
		//	throw err;
		//}

	}]);


	addAirBrakeHandler.$inject = ['$log', 'airBrakeConfig'];

	function addAirBrakeHandler($log, config) {
		var airbrake = new airbrakeJs.Client({
			projectId: config.projectId,
			projectKey: config.projectKey
		});

		airbrake.addFilter(function (notice) {
			notice.context.environment = 'testing';
			return notice;
		});

		return function (exception, cause) {
			$log.error(exception);
			airbrake.notify({error: exception, params: {angular_cause: cause}});
		};
	}

	airbrakeServiceFactory.$inject = ['airBrakeConfig'];

	function airbrakeServiceFactory(config) {
		var airbrake = new airbrakeJs.Client({
			projectId: config.projectId,
			projectKey: config.projectKey
		});

		return airbrake;
	}

})(window.angular, window);


;(function (angular, window) {
	var MODULE_NAME = window.APP_NAME + '.indicator';
	var module = angular.module(MODULE_NAME, []);

	/**
	 * @name indicatorController
	 */
	module.controller('indicatorController', IndicatorControllerFactory);

	IndicatorControllerFactory.$inject = ['$scope', 'airBrake', '$http'];

	function IndicatorControllerFactory($scope, airBrake, $http) {
		console.log(MODULE_NAME, 'indicatorController', 'run factory');

		$scope.message = 'Hello log collectors';

		$scope.throwException = throwException;
		$scope.useInvalidDate = useInvalidDate;
		$scope.makeReferenceError = makeReferenceError;
		$scope.requestToNothing = requestToNothing;
		$scope.doUnAuthRequest = unAuthRequest;

		airBrake.notify('Just try to send notify via ngService');

		function throwException() {
			throw new Error('Testing airbrake:: It\'s throw thrown ng.$exceptionHandler');
		}

		function useInvalidDate() {
			$scope.message = 'Now try set invalid date' + new Date('сегодня');
		}

		function makeReferenceError() {
			$scope.message = hello;

		}

		function requestToNothing() {
			$http.post('//example.com', {nothing: null}).then(
				function (response) {
					console.warn('Невозможный запрос выполнен успешно');
				});
		//,
		//		function (error) {
		//			console.error('Error on request to nothing, as expected');
		//		}
		//	)
		}

		function unAuthRequest(){
			$http.get('https://dev.quickestate.ca/dev-back/step').then(
				function(response){
					console.warn('Unauth request passed');
				},
				function(error){
					console.error(error);
				}
			)
		}
	}


})(window.angular, window);