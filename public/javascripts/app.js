/**
 * Author: kir
 * Created at: 09.12.15 16:29
 */
var APP_NAME = 'threeBoar';

(function(angular, window){
	var app = angular.module(window.APP_NAME, ['threeBoar.indicator']);

	app.run([function(){

		console.log('app:run::%s::Test application  "%s" running.', new Date(), window.APP_NAME);
	}]);

})(window.angular, window);


;(function(angular, window){
	var MODULE_NAME = window.APP_NAME + '.indicator';
	var module = angular.module(MODULE_NAME, []);

	/**
	 * @name indicatorController
	 */
	module.controller('indicatorController', IndicatorControllerFactory);

	IndicatorControllerFactory.$inject = ['$scope'];
	function IndicatorControllerFactory($scope){
		console.log(MODULE_NAME, 'indicatorController', 'run factory');

		$scope.message = 'Hello log collectors';
	}
})(window.angular, window);