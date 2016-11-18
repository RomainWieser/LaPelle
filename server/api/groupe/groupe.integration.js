'use strict';

var app = require('../..');
import request from 'supertest';

var newGroupe;

describe('Groupe API:', function() {
  describe('GET /api/groupes', function() {
    var groupes;

    beforeEach(function(done) {
      request(app)
        .get('/api/groupes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          groupes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(groupes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/groupes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/groupes')
        .send({
          name: 'New Groupe',
          info: 'This is the brand new groupe!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGroupe = res.body;
          done();
        });
    });

    it('should respond with the newly created groupe', function() {
      expect(newGroupe.name).to.equal('New Groupe');
      expect(newGroupe.info).to.equal('This is the brand new groupe!!!');
    });
  });

  describe('GET /api/groupes/:id', function() {
    var groupe;

    beforeEach(function(done) {
      request(app)
        .get(`/api/groupes/${newGroupe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          groupe = res.body;
          done();
        });
    });

    afterEach(function() {
      groupe = {};
    });

    it('should respond with the requested groupe', function() {
      expect(groupe.name).to.equal('New Groupe');
      expect(groupe.info).to.equal('This is the brand new groupe!!!');
    });
  });

  describe('PUT /api/groupes/:id', function() {
    var updatedGroupe;

    beforeEach(function(done) {
      request(app)
        .put(`/api/groupes/${newGroupe._id}`)
        .send({
          name: 'Updated Groupe',
          info: 'This is the updated groupe!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGroupe = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGroupe = {};
    });

    it('should respond with the original groupe', function() {
      expect(updatedGroupe.name).to.equal('New Groupe');
      expect(updatedGroupe.info).to.equal('This is the brand new groupe!!!');
    });

    it('should respond with the updated groupe on a subsequent GET', function(done) {
      request(app)
        .get(`/api/groupes/${newGroupe._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let groupe = res.body;

          expect(groupe.name).to.equal('Updated Groupe');
          expect(groupe.info).to.equal('This is the updated groupe!!!');

          done();
        });
    });
  });

  describe('PATCH /api/groupes/:id', function() {
    var patchedGroupe;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/groupes/${newGroupe._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Groupe' },
          { op: 'replace', path: '/info', value: 'This is the patched groupe!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGroupe = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGroupe = {};
    });

    it('should respond with the patched groupe', function() {
      expect(patchedGroupe.name).to.equal('Patched Groupe');
      expect(patchedGroupe.info).to.equal('This is the patched groupe!!!');
    });
  });

  describe('DELETE /api/groupes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/groupes/${newGroupe._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when groupe does not exist', function(done) {
      request(app)
        .delete(`/api/groupes/${newGroupe._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
