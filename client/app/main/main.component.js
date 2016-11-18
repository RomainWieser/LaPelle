import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  groupes = [];
  newEleve = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('groupes');
    });
  }

  $onInit() {
    this.$http.get('/api/groupes')
      .then(response => {
        this.groupes = response.data;
        this.groupes.sort((a, b) =>
          a.name.localeCompare(b.name));
        this.socket.syncUpdates('groupes', this.groupes);
      });
  }

  // addEleve() {
  //   if(this.newEleve) {
  //     this.$http.post('/api/groupes', {
  //       name: this.newEleve
  //     });
  //     this.newEleve = '';
  //   }
  // }

  // addEleveToGroup1(eleve) {
  //   this.$http.get('/api/groupes').then(response => {
  //     this.$http.get('/api/groupes/' + response.data[0]._id + '/add/' + eleve._id);
  //   });
  // }

  // deleteThing(eleve) {
  //   this.$http.delete(`/api/groupes/${eleve._id}`);
  // }


}

export default angular.module('laPelleApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
