/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/groupes              ->  index
 * POST    /api/groupes              ->  create
 * GET     /api/groupes/:id          ->  show
 * PUT     /api/groupes/:id          ->  upsert
 * PATCH   /api/groupes/:id          ->  patch
 * DELETE  /api/groupes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Groupe from './groupe.model';
import Eleve from './eleve.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function addEleve(eleve_id) {
  return function(entity) {
    try {
      entity.eleves.push(eleve_id);
      console.log("add eleve " + eleve_id);
    } catch(err) {
      return Promise.reject(err);
    }
    return entity.save();
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Groupes
export function index(req, res) {
  return Groupe.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Groupe from the DB
export function show(req, res) {
  return Groupe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Groupe in the DB
export function create(req, res) {
  return Groupe.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Creates a new Eleve in Groupe
export function createEleve(req, res) {
  return Groupe.find(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(Eleve.create(req.body))
    .then(addEleve(req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Groupe in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Groupe.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Groupe in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Groupe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Groupe from the DB
export function destroy(req, res) {
  return Groupe.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Add an eleve into Groupe
export function add(req, res) {
  return Groupe.findById(req.params.id).exec()
    .then(addEleve(req.params.id_eleve))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}