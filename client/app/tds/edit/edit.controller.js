'use strict';

export default class EditController {
  groupes = [];
  td = {};
  id = '';

  /*@ngInject*/
  constructor($state, $http, $scope, socket) {
    //this.message = 'test';
    this.$http = $http;
    this.$scope = $scope;

    this.id = $state.params.id;
  }

  $onInit() {
    this.$http.get('/api/groupes/').then(response => {
	  	this.groupes = response.data;
    });
	this.$http.get('/api/tds/' + this.id).then(response => {
		this.td = response.data;
	});
  }

  toggle(id) {
  	var presents = this.td.presents;
  	var index = presents.indexOf(id);
  	if ( index === -1) {
  		presents.push(id);
  	}else{
		presents.splice(index, 1);
  	}
  	this.$http.put('/api/tds/' + this.id,this.td);
  }

  isPresent(id)
  {
  	return (this.td.presents.indexOf(id) !== -1)
  }
}
