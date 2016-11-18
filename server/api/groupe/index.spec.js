'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var groupeCtrlStub = {
  index: 'groupeCtrl.index',
  show: 'groupeCtrl.show',
  create: 'groupeCtrl.create',
  upsert: 'groupeCtrl.upsert',
  patch: 'groupeCtrl.patch',
  destroy: 'groupeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var groupeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './groupe.controller': groupeCtrlStub
});

describe('Groupe API Router:', function() {
  it('should return an express router instance', function() {
    expect(groupeIndex).to.equal(routerStub);
  });

  describe('GET /api/groupes', function() {
    it('should route to groupe.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'groupeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/groupes/:id', function() {
    it('should route to groupe.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'groupeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/groupes', function() {
    it('should route to groupe.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'groupeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/groupes/:id', function() {
    it('should route to groupe.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'groupeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/groupes/:id', function() {
    it('should route to groupe.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'groupeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/groupes/:id', function() {
    it('should route to groupe.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'groupeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
