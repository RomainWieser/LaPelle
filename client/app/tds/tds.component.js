import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './tds.routes';

import edit from './edit';

export class tdsComponent {
  tds = [];

  /*@ngInject*/
  constructor($http,$state, $scope, socket) {
    //this.message = 'test';
    this.$http = $http;
    this.$scope = $scope;
    this.$state = $state;

    this.socket = socket;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('tds');
    });

  }

  $onInit() {
    this.$http.get('/api/tds').then(response => {
      this.tds = response.data;
      this.socket.syncUpdates('tds', this.groupes);
    });
  }

  new() {
    var newTD = {
      presents:[]
    }
    newTD.date = new Date();
    newTD.date = newTD.date.toLocaleDateString("fr-FR");

    console.log(newTD);
    var alreadyExists = false;

    for (var i = 0; i < this.tds.length; i++) {
      if (this.tds[i].date === newTD.date) alreadyExists = true
    }

    console.log(alreadyExists);
    if(!alreadyExists){
      this.$http.post('/api/tds',newTD).then(response => {
        this.$state.go('edit', { "id": response.data._id});
      });
    }
  }
}

export default angular.module('laPelleApp.tds', [uiRouter,edit])
  .config(routing)
  .component('tds', {
    template: require('./tds.html'),
    controller: tdsComponent
  })
  .name;