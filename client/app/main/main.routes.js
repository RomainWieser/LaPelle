'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('main', {
    url: '/liste',
    template: '<main></main>',
    authenticate: true
  });
}
