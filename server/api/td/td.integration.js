'use strict';

var app = require('../..');
import request from 'supertest';

var newTd;

describe('Td API:', function() {
  describe('GET /api/tds', function() {
    var tds;

    beforeEach(function(done) {
      request(app)
        .get('/api/tds')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          tds = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(tds).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/tds', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tds')
        .send({
          name: 'New Td',
          info: 'This is the brand new td!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTd = res.body;
          done();
        });
    });

    it('should respond with the newly created td', function() {
      expect(newTd.name).to.equal('New Td');
      expect(newTd.info).to.equal('This is the brand new td!!!');
    });
  });

  describe('GET /api/tds/:id', function() {
    var td;

    beforeEach(function(done) {
      request(app)
        .get(`/api/tds/${newTd._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          td = res.body;
          done();
        });
    });

    afterEach(function() {
      td = {};
    });

    it('should respond with the requested td', function() {
      expect(td.name).to.equal('New Td');
      expect(td.info).to.equal('This is the brand new td!!!');
    });
  });

  describe('PUT /api/tds/:id', function() {
    var updatedTd;

    beforeEach(function(done) {
      request(app)
        .put(`/api/tds/${newTd._id}`)
        .send({
          name: 'Updated Td',
          info: 'This is the updated td!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTd = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTd = {};
    });

    it('should respond with the original td', function() {
      expect(updatedTd.name).to.equal('New Td');
      expect(updatedTd.info).to.equal('This is the brand new td!!!');
    });

    it('should respond with the updated td on a subsequent GET', function(done) {
      request(app)
        .get(`/api/tds/${newTd._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let td = res.body;

          expect(td.name).to.equal('Updated Td');
          expect(td.info).to.equal('This is the updated td!!!');

          done();
        });
    });
  });

  describe('PATCH /api/tds/:id', function() {
    var patchedTd;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/tds/${newTd._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Td' },
          { op: 'replace', path: '/info', value: 'This is the patched td!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTd = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTd = {};
    });

    it('should respond with the patched td', function() {
      expect(patchedTd.name).to.equal('Patched Td');
      expect(patchedTd.info).to.equal('This is the patched td!!!');
    });
  });

  describe('DELETE /api/tds/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/tds/${newTd._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when td does not exist', function(done) {
      request(app)
        .delete(`/api/tds/${newTd._id}`)
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
