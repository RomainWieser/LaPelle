'use strict';

export default function routes($stateProvider) {
	'ngInject';

	$stateProvider.state('tds', {
		url: '/',
		template: '<tds></tds>',
     	authenticate: true
	}).state('edit', {
		url: '/:id',
		template: require('./edit/edit.html'),
		controller: 'EditController',
      	controllerAs: 'edit',
      	authenticate: true
	});
}